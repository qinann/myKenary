#!/usr/bin/env bash
set -euo pipefail

echo "[1/6] Validasi tool dasar (Node, npm, PM2, Nginx)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
fi
npm i -g pm2 >/dev/null 2>&1 || true
apt-get update -y >/dev/null 2>&1
apt-get install -y nginx >/dev/null 2>&1

echo "[2/6] Masuk ke folder proyek: /var/www/html/mykenary-backend"
cd /var/www/html/mykenary-backend

echo "[3/6] Install deps, generate prisma, migrate, build"
npm ci || npm install
npx prisma generate || true
npx prisma migrate deploy || true
npm run build || true

echo "[4/6] Jalankan backend via PM2 pada port 3006"
pm2 delete mykenary-backend || true
pm2 start npm --name mykenary-backend -- start:prod
pm2 save

echo "[5/6] Tulis konfigurasi Nginx untuk /mykenary-backend/api"
cat <<'EOF' >/etc/nginx/sites-available/mykenary-backend
server {
  listen 80;
  server_name _; # ganti ke IP/domain: 72.60.78.22
  client_max_body_size 20m;

  location ^~ /mykenary-backend/api/ {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://127.0.0.1:3006/; # trailing slash penting

    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
    if ($request_method = OPTIONS) { return 204; }
  }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/mykenary-backend /etc/nginx/sites-enabled/mykenary-backend
nginx -t
systemctl reload nginx

echo "[6/6] Verifikasi"
ss -tulpn | grep ':80' || true
curl -i http://127.0.0.1:3006/ || true
curl -i http://72.60.78.22/mykenary-backend/api/tour-leaders || true

echo "Selesai. Nginx aktif dan mem-proxy ke PM2 di 127.0.0.1:3006."
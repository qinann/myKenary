# QuickStart: Setup Dari Awal (Nginx + PM2)

Ikuti langkah berikut untuk server baru (Debian/Ubuntu). Backend akan berjalan di `127.0.0.1:3006` via PM2 dan diproksi Nginx di `/mykenary-backend/api`.

## 1) Persiapan Sistem
```bash
# Login sebagai root
ssh root@<IP>

# Update paket dan install dasar
apt update && apt install -y git curl build-essential

# Node.js 18+ dan PM2
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt install -y nodejs
fi
npm i -g pm2

# Nginx
apt install -y nginx
```

## 2) Siapkan Folder Proyek
```bash
mkdir -p /var/www/html/mykenary-backend
chown -R $USER:$USER /var/www/html/mykenary-backend || true
cd /var/www/html/mykenary-backend
# Salin isi proyek backend ke folder ini (rsync/scp/git clone)
```

## 3) Buat `.env`
Gunakan contoh `travel-backend/.env.example`:
```bash
tee .env > /dev/null <<'EOF'
PORT=3006
NODE_ENV=production
DATABASE_URL=postgresql://myuser:mypassword@127.0.0.1:5432/mykenary?schema=public
EOF
```

## 4) Install Dependensi & Build
```bash
npm ci || npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

## 5) Jalankan via PM2
```bash
# Pakai ecosystem di root proyek (dist/main.js)
pm2 start ecosystem.config.js
pm2 save
pm2 status
# Tes langsung tanpa Nginx
curl -i http://127.0.0.1:3006/
```

## 6) Konfigurasi Nginx (subpath `/mykenary-backend/api`)
```bash
tee /etc/nginx/sites-available/mykenary-backend > /dev/null <<'EOF'
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
    proxy_pass http://127.0.0.1:3006/; # penting: trailing slash
    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
    if ($request_method = OPTIONS) { return 204; }
  }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/mykenary-backend /etc/nginx/sites-enabled/mykenary-backend
nginx -t && systemctl reload nginx
```

## 7) Verifikasi
```bash
ss -tulpn | grep ':80' || true
curl -i http://127.0.0.1:3006/
curl -i http://72.60.78.22/mykenary-backend/api/tour-leaders
```

## 8) Catatan
- Pastikan PostgreSQL aktif dan kredensial di `DATABASE_URL` benar.
- Folder kode tetap di `/var/www/html/mykenary-backend`; Nginx hanya reverse proxy.
- Untuk rollback ke Apache, lihat `deploy-steps.md` bagian migrasi.
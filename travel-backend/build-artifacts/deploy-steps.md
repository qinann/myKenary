# Deploy Backend ke Debian (Apache) di `/var/www/html/mykenary-backend`

Langkah-langkah berikut menyiapkan backend NestJS untuk berjalan sebagai proses Node (PM2) di port internal, lalu diproksi oleh Apache pada path publik `/mykenary-backend/api`.

## 0) Prasyarat
- OS: Debian/Ubuntu dengan `sudo` akses.
- Node.js 18+ dan npm terpasang.
- PostgreSQL aktif dan dapat diakses (localhost:5432).
- Modul Apache `proxy`, `proxy_http`, `headers` aktif.

## 1) Siapkan kode di server
```bash
sudo mkdir -p /var/www/html/mykenary-backend
sudo chown -R $USER:$USER /var/www/html/mykenary-backend
cd /var/www/html/mykenary-backend
# Salin isi proyek backend ke folder ini (rsync/scp/git clone)
```

## 2) Konfigurasi environment
Buat file `.env` (lihat contoh `travel-backend/.env.example`):
```env
PORT=3006
NODE_ENV=production
DATABASE_URL=postgresql://myuser:mypassword@127.0.0.1:5432/mykenary?schema=public
```

## 3) Install dependency dan build
```bash
cd /var/www/html/mykenary-backend
npm ci || npm install
npx prisma generate
npx prisma migrate deploy
# (opsional) seed data
# npx prisma db seed
npm run build
```

## 4) Jalankan sebagai service dengan PM2
```bash
sudo npm i -g pm2
pm2 start build-artifacts/ecosystem.config.js
pm2 save
pm2 status
# Tes langsung backend (tanpa Apache)
curl -v http://127.0.0.1:3006/tour-leaders
```

## 5) Konfigurasi Apache (proxy subpath)
File contoh tersedia di `build-artifacts/apache-mykenary-backend.conf`.
```bash
sudo a2enmod proxy proxy_http headers
sudo cp build-artifacts/apache-mykenary-backend.conf /etc/apache2/sites-available/mykenary-backend.conf
sudo a2ensite mykenary-backend
sudo apachectl -t
sudo systemctl reload apache2
```

Verifikasi:
```bash
curl -v http://72.60.78.22/mykenary-backend/api/tour-leaders
```

## 6) Alternatif yang direkomendasikan (root `/api`)
Jika frontend dikonfigurasi memakai `NEXT_PUBLIC_API_BASE_URL='/api'`, gunakan ini untuk vhost:
```
ProxyPass        "/api/" "http://127.0.0.1:3006/"
ProxyPassReverse "/api/" "http://127.0.0.1:3006/"
```

## 7) Troubleshooting cepat
- `404 Not Found` dari Apache: pastikan situs aktif (`apachectl -S`), modul proxy aktif, dan ada trailing `/` pada `ProxyPass`.
- `502/timeout`: cek proses `pm2 logs mykenary-backend`, pastikan port 3006 listen (`ss -ltnp | grep 3006`).
- DB error: validasi `DATABASE_URL` dan akses user/DB di PostgreSQL.
- CORS: aktifkan header di vhost jika klien beda origin.

## 8) Update & restart
```bash
cd /var/www/html/mykenary-backend
git pull # atau salin versi terbaru
npm ci
npm run build
pm2 restart mykenary-backend
sudo systemctl reload apache2
```

## 9) Migrasi dari Apache ke Nginx

Jika ingin beralih ke Nginx, ikuti langkah berikut:

### Hentikan Apache dan pasang Nginx
```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
sudo apt update && sudo apt install -y nginx
```

### Buat server block Nginx untuk subpath `/mykenary-backend/api`
```bash
sudo tee /etc/nginx/sites-available/mykenary-backend > /dev/null <<'EOF'
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
```

### Aktifkan dan reload Nginx
```bash
sudo ln -sf /etc/nginx/sites-available/mykenary-backend /etc/nginx/sites-enabled/mykenary-backend
sudo nginx -t
sudo systemctl reload nginx
```

### Verifikasi
```bash
# Pastikan backend hidup
pm2 status
curl -i http://127.0.0.1:3006/

# Uji lewat publik
curl -i http://72.60.78.22/mykenary-backend/api/
```

### Catatan
- Lokasi kode `/var/www/html/mykenary-backend` tidak berubah; Nginx hanya reverse proxy ke proses PM2 di port 3006.
- Jika ingin kembali ke Apache:
```bash
sudo systemctl stop nginx && sudo systemctl disable nginx
sudo systemctl enable apache2 && sudo systemctl start apache2
```
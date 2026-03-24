#!/bin/bash

# Tüm projeleri tek komutla çalıştırma scripti
echo "🚀 Projeler başlatılıyor..."

# GitHub ana klasörüne git
cd ~/Documents/GitHub

echo "1. Galataportos (Port: 3000)"
cd galataportos && npm run dev -- -p 3000 &

echo "2. TurkishWatchGuys (Port: 3001)"
cd ../turkishwatchguys && npm run dev -- -p 3001 &

echo "3. WatchOS (Port: 3002)"
cd ../watchos && npm run dev -- -p 3002 &

echo "4. Shopmy-TR (Port: 3003)"
# Not: Eğer ileride klasör ismini room001 yaparsan burayı güncellemeyi unutma!
cd ../shopmy-tr && npm run dev -- -p 3003 &

echo "✅ Tüm projeler arka planda başlatıldı."
echo "Terminal loglarını görebilirsin. Hepsini aynı anda kapatmak için CTRL + C kombinasyonunu kullanabilirsin."

# Komut satırının sonlanmaması için bekleme yapar
wait

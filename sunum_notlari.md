# Kankam İçin Sunum Notları (Teknik Özellikler)

Bu belge, projemizin geliştirme aşamasında kullanılan teknolojileri ve teknik altyapıyı özetlemektedir. Sunumlarda veya proje tanıtımlarında kullanabilirsin.

## 1. Kodlama Dili ve Temel Çatı
- **Programlama Dili:** **TypeScript** ve **JavaScript**. Projemizin tamamı sıkı tip kontrolü sağlayan (hataları önceden yakalayan) TypeScript (`.ts`, `.tsx`) dili kullanılarak yazılmıştır.
- **Ana Framework:** **Next.js** (App Router mimarisi ile). Frontend ve backend işlemlerini aynı çatı altında, hızlı ve modern bir şekilde yapmamızı sağlayan en güncel React framework'ü.
- **Kullanıcı Arayüzü (UI) Kütüphanesi:** **React 19** (En güncel sürüm).

## 2. Veritabanı ve Sunucu Yönetimi
- **Veritabanı Yönetim Sistemi:** **Prisma ORM**. Veritabanındaki verileri güvenli, hızlı ve kolay yönetmek için kullanılan modern bir araçtır.
- **Kullanılan Veritabanı:** **SQLite** (Geliştirme aşamasında hafifliği ve kolay kurulumu sebebiyle şu an bu kullanılıyor. Ancak Prisma sayesinde MySQL veya PostgreSQL gibi büyük veritabanlarına tek bir satır kod değiştirerek anında geçiş yapılabilir).
- **Backend (API):** Ayrı bir sunucu kurmak yerine, Next.js'in "Server Actions" ve "Route Handlers" özelliklerini kullanarak API işlemlerini doğrudan modüller içinde güvenle gerçekleştiriyoruz.

## 3. Tasarım (Styling) ve Görsel Yapı
- **Stil Yönetimi:** Ağırlıklı olarak **Vanilla CSS**, **CSS Modules** ve React içi dinamik **Inline Stiller**. Küresel kurallar `globals.css` içinde saklanır (Örneğin DM Sans fontu zorunluluğu ve sayfa padding'leri).
- **Tipografi (Font):** Yüksek kaliteli ve modern bir görünüm sunan **DM Sans** ailesi.

## 4. Kullanılan Önemli Kütüphaneler (Ekstra Güçlendiriciler)
- **lucide-react:** Tüm projelerdeki ikonları (çöp kutusu, artı, bağlantı, ayarlar vb.) sağlayan, temiz ve geniş ikon seti.
- **@dnd-kit:** Koleksiyonlardaki düzenleme ekranında menülerin veya ürünlerin **"Sürükle-Bırak" (Drag & Drop)** yöntemi ile sıralanabilmesini sağlayan gelişmiş kütüphane.
- **framer-motion:** Sitedeki pürüzsüz animasyonlar ve geçiş efektleri için.
- **sonner & react-hot-toast:** Ekranda beliren uyarı mesajlarını ("Ürün eklendi", "Koleksiyon silindi" minik bildirimleri) modern bir şekilde göstermek için kullanılıyor.
- **recharts:** Dashboard kısımlarındaki grafiklerin ve veri görselleştirmelerinin şık bir şekilde çizilmesi için.

## Neden Bu Teknolojileri Seçtik? (Sunumda Söyleyebileceğin Hap Bilgiler)
* *"Projemiz Next.js kullanarak Server-Side Rendering (SSR) destekli çalışıyor, yani SEO'su (Arama motoru görünürlüğü) çok yüksek ve sayfalar anında yükleniyor."*
* *"TypeScript kullandığımız için sistemde veri tiplerinden kaynaklı çökmeler minimum seviyede, çok sağlam bir altyapı oluşturduk."*
* *"Prisma ORM kullandığımız için sistem ileride büyüyüp milyonlarca kullanıcıya çıkarsa bile çok kolay bir şekilde veritabanı altyapımızı büyütebiliriz (Scalability)."*

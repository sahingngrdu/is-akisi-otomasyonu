# Akış

Küçük ve orta ölçekli işletmelerin tekrar eden işlerini azaltmaya ve mevcut araçlarını birbirine bağlamaya odaklanan iş akışı otomasyonu hizmetinin tanıtım sitesi.

> Bu repo değerlendirme amaçlı bir demodur. Lütfen formda yalnızca örnek bilgiler kullanın; gerçek müşteri veya kişisel veri göndermeyin.

## Kapsam

- Türkçe, mobil uyumlu, erişilebilir bir hizmet landing page'i
- İsim, e-posta, hizmet seçimi ve ihtiyaç açıklaması alanlarından oluşan başvuru formu
- Aynı Zod şemasıyla istemci ve sunucu doğrulaması
- Başvuru başarılı sayılmadan önce Supabase PostgreSQL'e kalıcı kayıt
- Gönderiliyor, başarı, doğrulama hatası ve kayıt hatası durumları
- Sunucu anahtarlarının tarayıcı koduna taşınmaması

Gerçek iş akışı entegrasyonları, yönetim paneli, kullanıcı hesabı ve e-posta gönderimi kapsam dışıdır.

## Teknoloji

- Next.js App Router ve TypeScript
- Supabase PostgreSQL
- Vercel üzerinde yayınlama

## Yerelde çalıştırma

Gerekenler: Node.js 20.9 veya üzeri ve npm.

1. Bağımlılıkları kurun:

~~~powershell
npm install
~~~

2. Örnek ortam dosyasını kopyalayın ve değerleri girin:

~~~powershell
Copy-Item .env.example .env.local
~~~

`.env.local` içine Supabase proje URL'sini ve yalnızca sunucuda kullanılacak `service_role` anahtarını yazın. Bu dosyayı GitHub'a göndermeyin.

3. Supabase SQL Editor'de [migration dosyasındaki](supabase/migrations/0001_create_applications.sql) SQL'i çalıştırın.

4. Geliştirme sunucusunu açın:

~~~powershell
npm run dev
~~~

Site `http://localhost:3000` adresinde açılır.

## Başvurunun veri akışı

Tarayıcı formu `/api/applications` adresine JSON gönderir. İstemci şeması hızlı geri bildirim sağlar; API aynı alanları yeniden doğrular. Sunucu `applications` tablosuna kayıt ekleyip yeni satırın kimliğini aldığında `201` döndürür. Form yalnızca bu yanıtı aldığında başarı mesajı gösterir. Supabase yapılandırması yoksa veya kayıt başarısızsa form başarı göstermeden hata mesajı verir.

Tabloda RLS açıktır; `anon` ve `authenticated` rollerinin doğrudan tablo erişimi yoktur. Supabase `service_role` anahtarı yalnızca API route'unda kullanılır. Bu anahtar `NEXT_PUBLIC_` öneki almamalı ve istemciye gönderilmemelidir.

## Supabase kurulumu

1. Yeni bir Supabase projesi açın.
2. SQL Editor'de `supabase/migrations/0001_create_applications.sql` dosyasını çalıştırın.
3. Project URL ve `service_role` anahtarını Vercel proje ayarlarında ve yerel `.env.local` dosyasında şu adlarla tanımlayın:

~~~text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
~~~

> Supabase Free projeleri düşük etkinlikte yedi gün sonra otomatik duraklatılabilir. Uzun süreli değerlendirme öncesinde proje durumunu kontrol edin.

## Vercel'de yayınlama

GitHub deposunu Vercel'e bağlayın. Vercel Next.js yapılandırmasını otomatik tanır. `SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` değerlerini Project Settings → Environment Variables bölümünde tanımlayıp yeniden dağıtın. Canlı adres, ilk başarılı Production Deployment sonrasında Vercel'in verdiği `.vercel.app` adresidir.

Vercel Hobby planı kişisel ve ticari olmayan projeler içindir; bu demo ticari amaçla kullanılmamalıdır. Değerlendirme bağlantısı ve teslim commit kimliği yayınlama sonrasında bu README'ye eklenebilir.

## Doğrulama

~~~powershell
npm run typecheck
npm run build
~~~

Form doğrulaması için geçerli bir örnek kayıt ve eksik/geçersiz alanlarla bir kayıt deneyin. Başarı mesajından sonra Supabase Table Editor'de yeni satırın oluştuğunu; veritabanı ayarları olmadığında ise başarı mesajı yerine hata durumunun gösterildiğini kontrol edin.

## Depo

[GitHub'da Akış](https://github.com/sahingngrdu/-Ak-Otomasyonu)

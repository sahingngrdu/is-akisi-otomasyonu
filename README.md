# Akış

Küçük ve orta ölçekli işletmelerin tekrar eden işlerini azaltmaya ve mevcut araçlarını birbirine bağlamaya odaklanan iş akışı otomasyonu hizmetinin tanıtım sitesi.

> Bu repo değerlendirme amaçlı bir demodur. Lütfen formda yalnızca örnek bilgiler kullanın; gerçek müşteri veya kişisel veri göndermeyin.

## Kapsam

- Türkçe, mobil uyumlu, erişilebilir bir hizmet landing page'i
- İsim, e-posta, hizmet seçimi ve ihtiyaç açıklaması alanlarından oluşan başvuru formu
- Aynı Zod şemasıyla istemci ve sunucu doğrulaması
- Başvuru başarılı sayılmadan önce Supabase PostgreSQL'e kalıcı kayıt
- Gönderiliyor, başarı, doğrulama hatası ve kayıt hatası durumları
- Supabase Auth magic link ve e-posta allowlist'i ile korunan yönetim paneli
- Yeni, inceleniyor, iletişime geçildi, teklif aşaması, kazanıldı ve kapatıldı durumları
- Öncelik, takip tarihi, yönetici iç notu, arama ve durum filtresi
- Başvuru ve iş akışı değişiklikleri için aktivite geçmişi
- Sunucu anahtarlarının tarayıcı koduna taşınmaması

Gerçek iş akışı entegrasyonları, müşteri e-postası gönderimi ve birden fazla yönetici rolü kapsam dışıdır. Magic link e-postası yalnızca giriş formunda yetkili adres istenince gönderilir.

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

`.env.local` içine aşağıdaki değerleri yazın. `SUPABASE_SECRET_KEY` yalnızca sunucuda kullanılmalı; `.env.local` dosyasını GitHub'a göndermeyin.

3. Supabase SQL Editor'de önce `0001_create_applications.sql`, sonra `0002_admin_workflow.sql` migration'larını sırayla çalıştırın. Var olan projede ilk migration zaten uygulandıysa yalnızca ikinciyi çalıştırın.

4. Supabase → Authentication → URL Configuration bölümünde Site URL'yi `http://localhost:3000` yapın ve Redirect URLs listesine `http://localhost:3000/auth/callback` ekleyin. Canlıya çıkarken aynı listeye Vercel adresinin `/auth/callback` adresini ekleyin.

5. Geliştirme sunucusunu açın:

~~~powershell
npm run dev
~~~

Site `http://localhost:3000` adresinde açılır.

## Başvuru ve yönetim akışı

Tarayıcı formu `/api/applications` adresine JSON gönderir. İstemci şeması hızlı geri bildirim sağlar; API aynı alanları yeniden doğrular. Sunucu `applications` tablosuna kayıt ekleyip yeni satırın kimliğini aldığında `201` döndürür. Form yalnızca bu yanıtı aldığında başarı mesajı gösterir. Başvuru ilk aşamada `new` durumuna alınır ve veritabanı trigger'ı bir aktivite kaydı oluşturur.

`/admin/login` adresinden allowlist'teki yönetici e-postasına magic link istenir. Callback doğrulama kodunu sunucu oturumuna çevirir. Yönetim sayfası ve her yönetim API isteği Supabase kullanıcısını ve allowlist'i yeniden kontrol eder. Durum, öncelik, takip tarihi ve iç not tek bir Postgres fonksiyonuyla güncellenir; aynı işlemde audit kaydı da yazılır. Liste en yeni 100 başvuruyla sınırlıdır.

İki tabloda da RLS açıktır; `anon` ve `authenticated` rollerinin doğrudan erişimi yoktur. Supabase secret key yalnızca sunucu route'larında kullanılır ve `service_role` rolüyle çalışır. Yönetim endpoint'leri secret key kullanmadan önce oturum ve allowlist kontrolünü yapar. Secret key `NEXT_PUBLIC_` öneki almamalı, istemciye veya kaynak koda konmamalıdır.

## Supabase kurulumu

1. Yeni bir Supabase projesi açın.
2. SQL Editor'de `supabase/migrations/0001_create_applications.sql` ve `supabase/migrations/0002_admin_workflow.sql` dosyalarını sırayla çalıştırın.
3. Project URL değerini Connect penceresinden; `sb_secret_...` biçimindeki secret key'i Project Settings → API Keys bölümünden alın. Secret key yoksa bu sayfadan oluşturun. İki değeri Vercel proje ayarlarında ve yerel `.env.local` dosyasında şu adlarla tanımlayın:

~~~text
SUPABASE_URL
SUPABASE_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_ADMIN_EMAILS
~~~

`SUPABASE_ADMIN_EMAILS` virgülle veya satır sonuyla ayrılmış e-posta allowlist'idir. Yalnızca yönetici olarak giriş yapması gereken adresleri ekleyin. Publishable key tarayıcıda kullanılabilir; secret key kullanılamaz.

> Supabase secret key, `service_role` rolüyle çalışır ve RLS'yi atlar; yalnızca sunucu tarafında kullanın. Eski JWT tabanlı `service_role` anahtarları Supabase tarafından 2026 sonuna kadar kullanımdan kaldırılmak üzere planlanmıştır. Free plan projeleri düşük etkinlikte 7 gün sonra duraklatılabilir; uzun süreli değerlendirme öncesinde proje durumunu kontrol edin.

## Vercel'de yayınlama

GitHub deposunu Vercel'e bağlayın. Vercel Next.js yapılandırmasını otomatik tanır. `SUPABASE_URL` ve `SUPABASE_SECRET_KEY` değerlerini Project Settings → Environment Variables bölümünde tanımlayıp yeniden dağıtın. Canlı adres, ilk başarılı Production Deployment sonrasında Vercel'in verdiği `.vercel.app` adresidir.

Vercel Hobby planı kişisel ve ticari olmayan projeler içindir; bu demo ticari amaçla kullanılmamalıdır. Değerlendirme bağlantısı ve teslim commit kimliği yayınlama sonrasında bu README'ye eklenebilir.

## Doğrulama

~~~powershell
npm run typecheck
npm run build
~~~

Form doğrulaması için geçerli bir örnek kayıt ve eksik/geçersiz alanlarla bir kayıt deneyin. Başarı mesajından sonra Supabase Table Editor'de yeni satırın oluştuğunu; yönetici girişi sonrası aynı başvurunun listelendiğini ve iş akışı değişikliğinin geçmişte göründüğünü kontrol edin. Gerçek kişi veya müşteri bilgisi kullanmayın.

## Depo

[GitHub'da Akış](https://github.com/sahingngrdu/is-akisi-otomasyonu)

# AI_LOG

## AI desteğinin kullanıldığı alanlar

- Ürün fikrini landing page kapsamına indirme ve sayfa akışını kurgulama
- Türkçe başlık, hizmet açıklaması ve form metinleri için ilk taslakları oluşturma
- Next.js sayfa yapısı, özel CSS illüstrasyonu ve form bileşeni için kod üretme
- Ortak Zod şemasıyla istemci/sunucu doğrulaması ve Supabase insert route'u hazırlama
- Supabase Auth magic link, e-posta allowlist'i ve SSR oturum yönetimiyle korunan başvuru paneli hazırlama
- Başvuru durumları, öncelik, takip tarihi, iç notlar ve transaction içinde audit history oluşturma
- README, veritabanı migration'ı ve teslim kontrol adımlarını taslaklama
- Bağımlılık denetimindeki PostCSS uyarısını, Next.js ana sürümünü zorla yükseltmeden uyumlu bir sürüm geçersiz kılmasıyla giderme

## Kullanıcı kararları

- Hizmet: küçük ve orta ölçekli işletmeler için iş akışı otomasyonu
- Kapsam: landing page, Supabase form kaydı ve allowlist ile korunan mini CRM yönetim paneli
- Yayınlama yönü: Vercel; kaynak kod deposu: kullanıcının GitHub hesabı
- Proje yalnızca değerlendirme için; formda gerçek müşteri verisi kullanılmamalı
- E-posta girişi magic link ile yapılacak; yönetici adresi özel ortam değişkeninde tutuluyor, repoya yazılmıyor
- Gerçek otomasyon sağlayıcılarına bağlanma ve müşteri e-postası gönderimi kapsam dışında

## İnsan incelemesi ve doğrulama

- Fikir, hedef kitle ve kapsam kullanıcı tarafından seçildi.
- Başarı mesajı, veritabanından dönen kayıt kimliği kontrol edildikten sonra gösterilecek şekilde tasarlandı.
- Supabase `0002_admin_workflow.sql` migration'ı çalıştırıldı; şema kontrolü `application_events` tablosunu ve beş workflow alanını doğruladı.
- `npm run typecheck` başarılı.
- `npm run build` başarılı; derleme sonrası önizleme sunucusu yeniden başlatıldı.
- Kurgu form kaydı API'den `201` aldı; Supabase'te başlangıç olayı oluştu ve workflow fonksiyonu durumu `reviewing` olarak güncelledi.
- Geçersiz form `422`, 8 KB üzerindeki istek `413`, oturumsuz yönetim API isteği `401` döndürdü.
- Magic link'in e-postaya teslimi ve bağlantı sonrası browser oturumu kullanıcı tarafından henüz denenmedi.
- Yayınlama URL'si ve teslim commit kimliği dağıtım/son commit tamamlandığında eklenecek.

## Bilinen sınırlar

- Vercel ortam değişkenleri ve canlı domain yönlendirmesi henüz yapılandırılmadı.
- Supabase Auth magic link testi için e-posta gönderilmesi, kullanıcı tarafından panelden başlatılmalı.
- Bu demo için rate limit/spam koruması, gerçek otomasyon entegrasyonları ve müşteri bildirimi e-postası eklenmedi.
- Form yalnızca kurgu/test girdileri içindir; gerçek kişisel veya müşteri verisi göndermeyin.

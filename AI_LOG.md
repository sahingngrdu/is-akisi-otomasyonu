# AI_LOG

## AI desteğinin kullanıldığı alanlar

- Ürün fikrini landing page kapsamına indirme ve sayfa akışını kurgulama
- Türkçe başlık, hizmet açıklaması ve form metinleri için ilk taslakları oluşturma
- Next.js sayfa yapısı, özel CSS illüstrasyonu ve form bileşeni için kod üretme
- Ortak Zod şemasıyla istemci/sunucu doğrulaması ve Supabase insert route'u hazırlama
- README, veritabanı migration'ı ve teslim kontrol adımlarını taslaklama
- Bağımlılık denetimindeki PostCSS uyarısını, Next.js ana sürümünü zorla yükseltmeden uyumlu bir sürüm geçersiz kılmasıyla giderme

## Kullanıcı kararları

- Hizmet: küçük ve orta ölçekli işletmeler için iş akışı otomasyonu
- Kapsam: landing page ve Supabase'e kalıcı kayıt oluşturan başvuru formu
- Yayınlama yönü: Vercel; kaynak kod deposu: kullanıcının GitHub hesabı
- Proje yalnızca değerlendirme için; formda gerçek müşteri verisi kullanılmamalı
- Gerçek otomasyon sağlayıcılarına bağlanma, yönetim paneli ve e-posta gönderimi kapsam dışında

## İnsan incelemesi ve doğrulama

- Fikir, hedef kitle ve kapsam kullanıcı tarafından seçildi.
- Başarı mesajı, veritabanından dönen kayıt kimliği kontrol edildikten sonra gösterilecek şekilde tasarlandı.
- Kod doğrulama sonuçları çalıştırıldıktan sonra bu bölüme gerçek komut çıktıları eklenecek.
- Yayınlama URL'si ve teslim commit kimliği dağıtım/son commit tamamlandığında eklenecek.

## Bilinen sınırlar

- Supabase projesi ve Vercel ortam değişkenleri henüz yapılandırılmadıysa form kaydı çalışmaz; sayfa bunu hata durumu olarak gösterir.
- Bu demo için spam koruması ve yönetim paneli eklenmedi.
- Form yalnızca kurgu/test girdileri içindir; gerçek kişisel veya müşteri verisi göndermeyin.

import ApplicationForm from "@/components/application-form";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="arrow-icon">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="check-icon">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function FlowIllustration() {
  return (
    <div className="flow-illustration" aria-label="Bir iş akışının temsili gösterimi">
      <div className="flow-topline">
        <span><i className="pulse-dot" /> ÖRNEK OTOMASYON</span>
        <span className="flow-window-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="flow-canvas">
        <div className="flow-line flow-line-one" />
        <div className="flow-line flow-line-two" />
        <article className="flow-node flow-node-one">
          <span className="node-icon node-form" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h4" /></svg>
          </span>
          <span className="node-copy"><small>TETİKLEYİCİ</small><strong>Yeni talep geldi</strong></span>
          <span className="node-check" aria-label="Hazır"><CheckIcon /></span>
        </article>
        <div className="flow-connector connector-one" aria-hidden="true"><span>↓</span></div>
        <article className="flow-node flow-node-two">
          <span className="node-icon node-process" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7M17 10l3 2-3 2" /></svg>
          </span>
          <span className="node-copy"><small>OTOMATİK ADIM</small><strong>Bilgiler düzenlendi</strong></span>
          <span className="node-check" aria-label="Hazır"><CheckIcon /></span>
        </article>
        <div className="flow-connector connector-two" aria-hidden="true"><span>↓</span></div>
        <article className="flow-node flow-node-three">
          <span className="node-icon node-notify" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
          </span>
          <span className="node-copy"><small>SONRAKİ ADIM</small><strong>Doğru ekibe iletildi</strong></span>
          <span className="node-check" aria-label="Hazır"><CheckIcon /></span>
        </article>
      </div>
      <div className="flow-footnote">
        <span className="footnote-icon" aria-hidden="true">↗</span>
        <span>Temsili senaryo <b>·</b> Her işletmenin süreci farklıdır</span>
      </div>
    </div>
  );
}

const serviceCards = [
  {
    number: "01",
    title: "Tekrarlayan işleri otomatikleştirin",
    text: "Form, e-posta ve tablo arasında kopyaladığınız işleri net bir akışa dönüştürün.",
    icon: "↻",
  },
  {
    number: "02",
    title: "Mevcut araçlarınızı bağlayın",
    text: "Ekibinizin kullandığı sistemler arasında gerekli bilgilerin düzenli aktarılmasını sağlayın.",
    icon: "⌘",
  },
  {
    number: "03",
    title: "Sürecin durumunu görün",
    text: "Bildirimleri ve onay adımlarını doğru kişiye, doğru zamanda ulaştırın.",
    icon: "◷",
  },
];

const processSteps = [
  { number: "01", title: "Süreci birlikte çıkarıyoruz", text: "Tetikleyiciyi, kullanılan araçları, sorumluları ve sık karşılaşılan istisnaları belirliyoruz." },
  { number: "02", title: "İlk kapsamı netleştiriyoruz", text: "Tek bir akış, beklenen sonuç ve insan onayı gereken adımlar üzerinde anlaşıyoruz." },
  { number: "03", title: "Örnek verilerle doğruluyoruz", text: "Normal ve hatalı senaryoları deneyip kayıt, bildirim ve hata davranışlarını kontrol ediyoruz." },
  { number: "04", title: "Dokümante edip devrediyoruz", text: "Akış şemasını, ayarları ve ekibin kullanabileceği kısa notları teslim ediyoruz." },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" aria-label="Akış ana sayfa">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>akış<span className="brand-period">.</span></span>
          </a>
          <nav className="main-nav" aria-label="Ana menü">
            <a href="#hizmetler">Hizmetler</a>
            <a href="#ornekler">Örnek akışlar</a>
            <a href="#surec">Çalışma şeklimiz</a>
            <a href="#hakkimizda">Proje</a>
            <a href="#sss">SSS</a>
          </nav>
          <a className="button button-dark nav-cta" href="#iletisim">İhtiyacı paylaş <ArrowIcon /></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-mark" /> KÜÇÜK EKİPLER İÇİN AKILLI AKIŞLAR</p>
              <h1>Manuel işleri azaltın.<br /><span>İşinize odaklanın.</span></h1>
              <p className="hero-description">
                Tekrar eden operasyonları sadeleştiriyor, kullandığınız araçları birbirine bağlıyoruz. Ekibiniz işi kopyalamaya değil, ilerletmeye zaman ayırsın.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#iletisim">İhtiyacı paylaşın <ArrowIcon /></a>
                <a className="text-link" href="#surec">Nasıl çalışıyoruz? <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-notes" aria-label="Hizmet özellikleri">
                <span><CheckIcon /> Mevcut araçlarınızla</span>
                <span><CheckIcon /> Küçük adımlarla</span>
                <span><CheckIcon /> Ekibinizle birlikte</span>
              </div>
            </div>
            <div className="hero-art-wrap">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <FlowIllustration />
              <div className="floating-note"><span className="floating-note-icon">✳</span><span><strong>Önce doğru süreç</strong><small>Sonra doğru otomasyon</small></span></div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span className="hero-bottom-label">İYİ BİR OTOMASYON</span>
            <p>İnsanların işini devralmaz. <strong>Gereksiz adımları aradan çıkarır.</strong></p>
            <a href="#hizmetler" aria-label="Hizmetleri gör">↓</a>
          </div>
        </section>

        <section className="section services-section" id="hizmetler">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> NEYİ KOLAYLAŞTIRIYORUZ</p>
                <h2>İş akışınız, işletmenize<br />uyum sağlasın.</h2>
              </div>
              <p className="section-intro">Hazır bir yazılım dayatmak yerine, işin nasıl yürüdüğünü anlayıp doğru araçları bir araya getiriyoruz.</p>
            </div>
            <div className="service-grid">
              {serviceCards.map((card) => (
                <article className="service-card" key={card.number}>
                  <div className="service-card-top"><span className="service-number">{card.number}</span><span className="service-icon" aria-hidden="true">{card.icon}</span></div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <a href="#iletisim" aria-label={`${card.title} hakkında konuşun`}><ArrowIcon /></a>
                </article>
              ))}
            </div>
            <p className="illustrative-note">Örnek akışlar anlatım içindir; kurulacak çözüm, işletmenizin kullandığı sistemlere ve ihtiyacına göre belirlenir.</p>
          </div>
        </section>

        <section className="section examples-section" id="ornekler">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> GÜNLÜK İŞLERDEN ÖRNEKLER</p>
                <h2>Küçük akışlar,<br />gözle görülür rahatlık.</h2>
              </div>
              <p className="section-intro">Aşağıdaki senaryolar temsilidir. Gerçek akış; ekibinizin kullandığı araçlar, kurallar ve istisnalara göre tasarlanır.</p>
            </div>
            <div className="example-grid">
              <article className="example-card">
                <span className="example-tag">TALEP YÖNETİMİ</span>
                <h3>Dağınık talepleri tek yerde toplayın</h3>
                <p>Web formu veya ortak e-posta kutusuna gelen talep kayda dönüşür; konuya göre sınıflanır ve sorumlu kişiye bildirilir.</p>
                <div className="example-flow"><span>Talep</span><i>→</i><span>Kayıt</span><i>→</i><span>Sorumluya bildirim</span></div>
              </article>
              <article className="example-card">
                <span className="example-tag">İÇ OPERASYON</span>
                <h3>Tekrarlanan veri girişini azaltın</h3>
                <p>Bir formdaki onaylı bilgiler, ekip tablosuna aktarılır; eksik alanlar kontrol edilip tamamlanması gerekenler görünür olur.</p>
                <div className="example-flow"><span>Form</span><i>→</i><span>Kontrol</span><i>→</i><span>Tablo</span></div>
              </article>
              <article className="example-card">
                <span className="example-tag">ONAY SÜRECİ</span>
                <h3>Bekleyen işleri görünür kılın</h3>
                <p>Onay bekleyen kayıt ilgili kişiye yönlenir; yanıt gelmediğinde takip listesine düşer ve ekip durumunu izleyebilir.</p>
                <div className="example-flow"><span>Kayıt</span><i>→</i><span>Onay</span><i>→</i><span>Takip</span></div>
              </article>
            </div>
            <p className="illustrative-note">Bu örnekler sitede çalışan entegrasyonlar değildir; olası çözüm taslaklarını anlatır.</p>
          </div>
        </section>

        <section className="section process-section" id="surec">
          <div className="container process-layout">
            <div className="process-intro">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> KARMAŞIK DEĞİL, ADIM ADIM</p>
              <h2>Önce dinleriz.<br /><span>Sonra akışı kurarız.</span></h2>
              <p>Önce işin nasıl başladığını, hangi araçlardan geçtiğini ve nerede beklediğini anlarız. Sonra tek bir süreç için kapsamı ve başarı ölçütünü netleştiririz.</p>
              <a className="button button-lime" href="#iletisim">İhtiyacı paylaş <ArrowIcon /></a>
            </div>
            <div className="step-list">
              {processSteps.map((step) => (
                <article className="step-item" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  <span className="step-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="hakkimizda">
          <div className="container about-layout">
            <div className="about-stamp" aria-hidden="true"><span>AKIŞ</span><i>✳</i><small>İŞİNİZE GÖRE<br />TASARLANIR</small></div>
            <div className="about-copy">
              <p className="eyebrow"><span className="eyebrow-mark" /> AÇIK VE GERÇEKÇİ KAPSAM</p>
              <h2>Önce doğru problem.<br />Sonra doğru araç.</h2>
              <p>Akış, küçük ve orta ölçekli ekipler için iş akışı otomasyonu hizmeti konseptidir. Bu portföy demosu; başvuru formu, sunucu doğrulaması, kalıcı kayıt ve korumalı yönetim paneliyle fikrin uçtan uca nasıl çalışabileceğini gösterir.</p>
              <div className="about-points">
                <span><CheckIcon /> Form verisi hem istemcide hem sunucuda doğrulanır</span>
                <span><CheckIcon /> Başvurular Supabase'te kalıcı saklanır</span>
                <span><CheckIcon /> Yönetim paneli giriş ve değişiklik geçmişiyle korunur</span>
              </div>
              <p className="project-transparency">Bu çalışma değerlendirme demosudur: örnek kayıtlar ve senaryolar kullanır; gerçek müşteri, referans veya sonuç iddiası içermez.</p>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="sss">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> SIK SORULAN SORULAR</p>
              <h2>Başlamadan önce<br />bilmeniz gerekenler.</h2>
              <p>Her öneri, mevcut işleyiş ve araçlar incelendikten sonra netleşir.</p>
            </div>
            <div className="faq-list">
              <details>
                <summary>Hangi araçlarla çalışabilir?</summary>
                <p>Önce kullandığınız araçların entegrasyon seçeneklerini ve erişim izinlerini inceleriz. Uygun bağlantı yoksa güvenilir bir alternatif ve manuel kontrol adımı birlikte değerlendirilir.</p>
              </details>
              <details>
                <summary>Her işi otomatikleştirmek gerekir mi?</summary>
                <p>Hayır. Sık tekrarlanan ve kuralları belirgin adımlar iyi adaylardır. İstisna veya karar gerektiren noktalarda insan onayı akışta kalmalıdır.</p>
              </details>
              <details>
                <summary>Mevcut araçlarımızı değiştirmemiz gerekir mi?</summary>
                <p>İlk tercih, mevcut araçlarla uygulanabilir bir çözüm kurmaktır. Değişiklik ancak mevcut araçlar ihtiyacı karşılamıyorsa gündeme gelir.</p>
              </details>
              <details>
                <summary>Süre ve maliyet nasıl belirlenir?</summary>
                <p>Bağlanacak araç sayısı, akışın adımları ve istisnalar netleşmeden süre veya fiyat sözü vermek doğru olmaz. Bu demo teklif üretmez; önce kapsamı anlamaya yönelik bir başvuru kaydı alır.</p>
              </details>
              <details>
                <summary>Formu gönderince ne olur?</summary>
                <p>Bu değerlendirme demosunda kayıt Supabase veritabanına yazılır ve yönetim panelinde görünür. Otomatik e-posta gönderimi veya takvim randevusu şu an yapılandırılmış değildir.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="contact-section" id="iletisim">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> İLK ADIM</p>
              <h2>İş akışınız nerede<br /><span>takılıyor?</span></h2>
              <p>İhtiyacınızı örnek bilgilerle anlatın. Bu demo kaydı başvuru panelinde saklar; gerçek bir görüşme veya otomatik geri dönüş planlamaz.</p>
              <div className="contact-aside">
                <span className="contact-aside-icon" aria-hidden="true">↳</span>
                <span><strong>Önce ihtiyaç, sonra kapsam.</strong><small>Canlı hizmette görüşme ve teslim takvimi kapsam netleşince belirlenir.</small></span>
              </div>
            </div>
            <div className="form-card">
              <div className="form-card-heading"><span>DEMO BAŞVURU KAYDI</span><span className="form-card-index">01 / 01</span></div>
              <ApplicationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand brand-footer" href="#top" aria-label="Akış ana sayfa">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>akış<span className="brand-period">.</span></span>
          </a>
          <p>Küçük ve orta ölçekli işletmeler için iş akışı otomasyonu.</p>
          <a href="#top" className="back-top">Başa dön ↑</a>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Akış. Bu çalışma değerlendirme amaçlı bir demodur.</span>
          <span>Örnek veriler kullanın · Gerçek müşteri verisi girmeyin · <a href="/admin/login">Yönetici girişi</a></span>
        </div>
      </footer>
    </>
  );
}

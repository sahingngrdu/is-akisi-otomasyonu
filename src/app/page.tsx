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

const steps = [
  { number: "01", title: "İşi birlikte anlayalım", text: "Ekibin zamanını alan adımları ve kullanılan araçları haritalayalım." },
  { number: "02", title: "Küçük bir akış tasarlayalım", text: "Önce tek bir sürece odaklanıp açık bir çözüm planı çıkaralım." },
  { number: "03", title: "Kurup birlikte doğrulayalım", text: "Akışı devreye almadan önce örnek verilerle adım adım kontrol edelim." },
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
            <a href="#surec">Çalışma şeklimiz</a>
            <a href="#hakkimizda">Hakkımızda</a>
          </nav>
          <a className="button button-dark nav-cta" href="#iletisim">Birlikte düşünelim <ArrowIcon /></a>
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
                <a className="button button-primary" href="#iletisim">Sürecinizi konuşalım <ArrowIcon /></a>
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

        <section className="section process-section" id="surec">
          <div className="container process-layout">
            <div className="process-intro">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> KARMAŞIK DEĞİL, ADIM ADIM</p>
              <h2>Önce dinleriz.<br /><span>Sonra akışı kurarız.</span></h2>
              <p>Otomasyona en çok ihtiyaç duyulan yer, genellikle en çok tekrar edilen iştir. Onu bulmak için önce ekibinizi dinleriz.</p>
              <a className="button button-lime" href="#iletisim">İlk görüşmeyi planla <ArrowIcon /></a>
            </div>
            <div className="step-list">
              {steps.map((step) => (
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
              <p className="eyebrow"><span className="eyebrow-mark" /> YAKLAŞIMIMIZ</p>
              <h2>Teknoloji, işinize<br />uyduğunda işe yarar.</h2>
              <p>Küçük ve orta ölçekli ekiplerin süreçlerini daha anlaşılır ve tutarlı hale getirmesine yardımcı oluyoruz. Önce ihtiyacı tanımlar, sonra mevcut araçlarla uygulanabilir bir akış kurarız.</p>
              <div className="about-points">
                <span><CheckIcon /> İhtiyaca göre tasarım</span>
                <span><CheckIcon /> Açık ve izlenebilir adımlar</span>
                <span><CheckIcon /> Ekibe devredilebilir kurulum</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="iletisim">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" /> İLK ADIM</p>
              <h2>İş akışınız nerede<br /><span>takılıyor?</span></h2>
              <p>İhtiyacınızı birkaç cümleyle anlatın. Ön görüşmede mevcut süreci ve ilk küçük adımı birlikte değerlendirelim.</p>
              <div className="contact-aside">
                <span className="contact-aside-icon" aria-hidden="true">↳</span>
                <span><strong>Hazır çözüm satışı değil.</strong><small>Önce sizin işleyişinizi anlamak için kısa bir görüşme.</small></span>
              </div>
            </div>
            <div className="form-card">
              <div className="form-card-heading"><span>ÖN GÖRÜŞME TALEBİ</span><span className="form-card-index">01 / 01</span></div>
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

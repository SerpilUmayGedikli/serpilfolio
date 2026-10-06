import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Circle,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

type ProjectCategory = "AI / RAG" | "Computer Vision" | "Data Engineering";

type Project = {
  index: string;
  title: string;
  category: ProjectCategory;
  label: string;
  description: string;
  tags: string[];
  accent: "lime" | "teal" | "orange" | "violet";
};

const projects: Project[] = [
  {
    index: "01",
    title: "Risk-Aware Biopsy Planning",
    category: "Computer Vision",
    label: "TEKNOFEST 2026 · Oncology Finalist",
    description:
      "3T MRI verisi üzerinden aday stereotaktik beyin biyopsisi yörüngelerini geometri, maske kesişimleri ve belirsizlik ölçümleriyle değerlendiren araştırma prototipi.",
    tags: ["PyTorch", "Medical Imaging", "Geometric Analysis"],
    accent: "lime",
  },
  {
    index: "02",
    title: "AgroMind AI",
    category: "Computer Vision",
    label: "Decision-support assistant",
    description:
      "PlantVillage verisiyle domates ve patates yaprak hastalıklarını analiz eden, Türkçe kullanıcı arayüzüne sahip bilgisayarlı görü pipeline'ı.",
    tags: ["EfficientNetB0", "PyTorch", "PlantVillage"],
    accent: "teal",
  },
  {
    index: "03",
    title: "RAG-Based Document Intelligence",
    category: "AI / RAG",
    label: "Dockerized PDF Q&A",
    description:
      "PDF yükleme, chunking, embedding, Qdrant benzerlik araması ve LLM yanıt üretimini tek bir Docker Compose akışında birleştiren sistem.",
    tags: ["Qdrant", "Docker Compose", "Gradio"],
    accent: "orange",
  },
  {
    index: "04",
    title: "Dadadam",
    category: "AI / RAG",
    label: "Multimodal / visual-context RAG",
    description:
      "Üretilen görsel içerik ile kaynak görüntü arasındaki sapmaları inceleyen; görsel grounding ve ölçülebilir tutarlılık üzerine odaklanan çalışma.",
    tags: ["Multimodal AI", "Visual Grounding", "LLMs"],
    accent: "violet",
  },
  {
    index: "05",
    title: "Kafka / Flink Pipelines",
    category: "Data Engineering",
    label: "Event-driven experiments",
    description:
      "Event-driven ingestion ve stream-processing akışlarını Apache Kafka ve Apache Flink ile keşfeden veri mühendisliği çalışmaları.",
    tags: ["Apache Kafka", "Apache Flink", "Streaming"],
    accent: "teal",
  },
];

const skillGroups = [
  {
    title: "LLM & RAG",
    icon: BrainCircuit,
    items: ["LLM applications", "RAG", "LangChain", "LangGraph", "Vector search", "Multi-agent systems"],
  },
  {
    title: "Computer Vision",
    icon: ScanLine,
    items: ["PyTorch", "OpenCV", "CNNs", "Vision Transformers", "EfficientNet", "ResNet", "Swin Transformer"],
  },
  {
    title: "Evaluation & Observability",
    icon: Activity,
    items: ["RAG evaluation", "No-hit analysis", "Failure analysis", "Langfuse", "Latency analysis", "Application logging"],
  },
  {
    title: "Data & Backend",
    icon: Database,
    items: ["Python", "SQL", "Qdrant", "ClickHouse", "PostgreSQL", "REST APIs", "JSON"],
  },
];

const navItems = [
  { href: "#about", label: "Profil" },
  { href: "#experience", label: "Deneyim" },
  { href: "#work", label: "Çalışmalar" },
  { href: "#skills", label: "Yetkinlikler" },
  { href: "#contact", label: "İletişim" },
];

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-kicker">
      <span className="kicker-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-card-top">
        <span className="project-index">{project.index}</span>
        <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>
      <div className="project-card-body">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-label">{project.label}</p>
        <p className="project-description">{project.description}</p>
      </div>
      <div className="tag-row" aria-label="Kullanılan teknolojiler">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<"Tümü" | ProjectCategory>("Tümü");
  const [copied, setCopied] = useState(false);

  const filteredProjects = useMemo(
    () => projectFilter === "Tümü" ? projects : projects.filter((project) => project.category === projectFilter),
    [projectFilter],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("srplgdkl@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = "mailto:srplgdkl@gmail.com";
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Serpil Umay Gedikli ana sayfa">
          <span className="brand-mark">SG</span>
          <span className="brand-name"><strong>SERPİL</strong><span>UMAY GEDİKLİ</span></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Ana navigasyon">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Birlikte üretelim <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="status-line"><span className="status-dot" /> 2026 / Ankara, Türkiye <span className="status-slash">//</span> available for meaningful problems</div>
            <h1 id="hero-title">Güvenilir AI sistemleri, <em>ölçülebilir</em> sonuçlara dönüşsün.</h1>
            <p className="hero-summary">Ben Serpil Umay Gedikli. LLM &amp; RAG, bilgisayarlı görü ve veri mühendisliği odağında; prototipten dağıtıma uzanan AI sistemleri tasarlıyorum.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Çalışmaları keşfet <ArrowRight size={17} /></a>
              <a className="text-link" href="#contact">İletişime geç <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Uzmanlık alanları özeti">
            <div className="hero-visual-grid" aria-hidden="true" />
            <div className="hero-orbit orbit-one" aria-hidden="true" />
            <div className="hero-orbit orbit-two" aria-hidden="true" />
            <div className="hero-panel">
              <div className="panel-topline"><span>FOCUS / 04</span><span className="panel-live"><span className="status-dot" /> live</span></div>
              <div className="panel-symbol"><span>∑</span><span className="symbol-line" /></div>
              <p className="panel-label">Systems over demos</p>
              <div className="focus-list">
                <span><BrainCircuit size={15} /> LLM + RAG</span>
                <span><ScanLine size={15} /> Computer Vision</span>
                <span><Network size={15} /> Data Engineering</span>
                <span><ShieldCheck size={15} /> Evaluation-first</span>
              </div>
              <div className="panel-footer"><Terminal size={13} /> build / measure / improve</div>
            </div>
          </div>
        </section>

        <section className="metric-strip" aria-label="Öne çıkan metrikler">
          <div className="metric"><span className="metric-value">98.63<span>%</span></span><span className="metric-label">AgroMind validation accuracy</span></div>
          <div className="metric"><span className="metric-value">02</span><span className="metric-label">Digital Brain staj dönemi</span></div>
          <div className="metric"><span className="metric-value">01</span><span className="metric-label">TEKNOFEST 2026 finalistliği</span></div>
          <div className="metric"><span className="metric-value">3.27<span>/4</span></span><span className="metric-label">B.Sc. GPA · Ankara University</span></div>
        </section>

        <section className="about-section page-section" id="about" aria-labelledby="about-title">
          <div className="section-intro">
            <SectionKicker number="01">Profil</SectionKicker>
            <h2 id="about-title">Model prototipinden önce <span>ölçüm.</span></h2>
          </div>
          <div className="about-content">
            <p className="lead-copy">AI &amp; Data Engineering mezunu bir mühendis olarak, üretimde güven veren sistemler kurmaya odaklanıyorum. Sorunu yalnızca model doğruluğuyla değil; retrieval kalitesi, latency, hata davranışı ve yeniden üretilebilirlik üzerinden ele alıyorum.</p>
            <div className="about-notes">
              <div className="note-row"><span className="note-index">A</span><p>RAG akışlarında no-hit ve routing hatalarını izler, kök nedeni görünür kılarım.</p></div>
              <div className="note-row"><span className="note-index">B</span><p>Bilgisayarlı görü projelerinde model çıktısını güvenlik sınırları ve karar desteği çerçevesinde konumlandırırım.</p></div>
              <div className="note-row"><span className="note-index">C</span><p>Sistemin ne zaman cevap vermemesi gerektiğini de tasarımın bir parçası sayarım.</p></div>
            </div>
          </div>
        </section>

        <section className="experience-section page-section" id="experience" aria-labelledby="experience-title">
          <div className="section-intro split-intro">
            <SectionKicker number="02">Deneyim</SectionKicker>
            <span className="section-meta">hands-on / AI &amp; backend</span>
          </div>
          <div className="experience-card">
            <div className="experience-timeline"><span className="timeline-line" /><span className="timeline-dot" /></div>
            <div className="experience-main">
              <div className="experience-heading">
                <div><p className="eyebrow">Digital Brain Technology</p><h2 id="experience-title">AI Engineering Intern</h2><p className="role-note">AI &amp; Backend Teams</p></div>
                <span className="date-badge">Jun 2025 – Sep 2025<br />Mar 2026 – Present</span>
              </div>
              <div className="experience-grid">
                <ul className="bullet-list">
                  <li>Qdrant tabanlı enterprise assistant'larda RAG retrieval ve routing hatalarını Langfuse trace'leri ve application log'larıyla inceledim.</li>
                  <li>Routing, rule-based response, follow-up handling ve typo-correction bileşenlerindeki latency darboğazlarını analiz ettim.</li>
                  <li>General, Data Analyst, HR ve IT assistant'larda manuel functional testing ve kalite doğrulaması yürüttüm.</li>
                </ul>
                <ul className="bullet-list">
                  <li>Backend entegrasyonlarına destek verdim; API ve login akışlarını test ederek bulguları geliştirme ekibine aktardım.</li>
                  <li>İç web uygulamalarında güvenlik odaklı testlerle potansiyel zafiyetleri görünür kıldım.</li>
                </ul>
              </div>
              <div className="tech-line"><span>TECHNOLOGIES</span><div className="tag-row"><span className="tag tag-lime">Python</span><span className="tag">Qdrant</span><span className="tag">Langfuse</span><span className="tag">REST APIs</span><span className="tag">Git</span><span className="tag">Docker</span></div></div>
            </div>
          </div>
        </section>

        <section className="work-section page-section" id="work" aria-labelledby="work-title">
          <div className="section-intro split-intro work-heading">
            <div><SectionKicker number="03">Seçilmiş çalışmalar</SectionKicker><h2 id="work-title">İşe yarayan <span>araştırma.</span></h2></div>
            <p className="section-description">Her proje, daha güvenilir bir sistem kurmak için farklı bir soruyu araştırıyor.</p>
          </div>
          <article className="featured-project">
            <div className="featured-project-visual">
              <div className="scan-map" aria-hidden="true"><span className="scan-ring ring-a" /><span className="scan-ring ring-b" /><span className="scan-ring ring-c" /><span className="scan-path path-a" /><span className="scan-path path-b" /><span className="scan-target" /></div>
              <span className="visual-label label-top">FC2.8 / CANDIDATE GENERATION</span><span className="visual-label label-bottom">3T MRI · patient-space · QC</span>
            </div>
            <div className="featured-project-copy">
              <div className="featured-kicker"><span className="signal-chip"><Sparkles size={13} /> FEATURED</span><span>Mar 2026 – Present</span></div>
              <h3>Risk-Aware<br /><em>Biopsy Planning</em></h3>
              <p>TEKNOFEST 2026 Oncology finalistliği ve senior graduation project. Pial surface mask ve tumor segmentation üzerinden patient-space surface ve target adayları üreterek stereotaktik beyin biyopsisi yörüngelerini değerlendiriyor.</p>
              <div className="featured-points"><span><Check size={15} /> Geometric measurements</span><span><Check size={15} /> Vessel / ventricle intersections</span><span><Check size={15} /> QC + abstention states</span><span><Check size={15} /> Checksum-verified masks</span></div>
              <div className="scope-note"><ShieldCheck size={17} /><span>Scope: research candidates only — klinik validasyon, cerrahi güvenlik veya diagnostik yield iddiası yoktur.</span></div>
              <div className="tag-row"><span className="tag tag-lime">Python</span><span className="tag tag-lime">PyTorch</span><span className="tag tag-lime">OpenCV</span><span className="tag tag-lime">Reproducible Pipelines</span></div>
            </div>
          </article>
          <div className="project-toolbar"><div className="filter-label"><span className="status-dot" /> filtrele</div><div className="filter-tabs" role="tablist" aria-label="Proje kategorileri">{["Tümü", "AI / RAG", "Computer Vision", "Data Engineering"].map((filter) => <button key={filter} type="button" role="tab" aria-selected={projectFilter === filter} className={projectFilter === filter ? "is-active" : ""} onClick={() => setProjectFilter(filter as "Tümü" | ProjectCategory)}>{filter}</button>)}</div></div>
          <div className="projects-grid">{filteredProjects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        </section>

        <section className="skills-section page-section" id="skills" aria-labelledby="skills-title">
          <div className="section-intro split-intro"><div><SectionKicker number="04">Araç seti</SectionKicker><h2 id="skills-title">Sistemin her <span>katmanı.</span></h2></div><p className="section-description">Araştırma, gözlemleme ve teslim arasında bağ kuran teknik bir çalışma seti.</p></div>
          <div className="skills-layout"><div className="skills-grid">{skillGroups.map((group) => { const Icon = group.icon; return <article className="skill-group" key={group.title}><div className="skill-heading"><Icon size={19} /><h3>{group.title}</h3></div><div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div><aside className="skills-aside"><div className="aside-code"><span>01</span><code>if (system.is_uncertain)&#10;  return abstain();</code></div><p>İyi bir sistem yalnızca doğru cevap vermez; belirsizliği de anlaşılır biçimde taşır.</p><span className="aside-signature">— SG / engineering notes</span></aside></div>
        </section>

        <section className="education-section page-section" aria-labelledby="education-title">
          <div className="education-card"><div className="education-symbol"><Layers3 size={24} /></div><div><SectionKicker number="05">Eğitim</SectionKicker><h2 id="education-title">B.Sc. Artificial Intelligence<br /><span>&amp; Data Engineering</span></h2><p>Ankara University · Faculty of Engineering</p></div><div className="education-meta"><span>Aug 2022 – Jun 2026</span><strong>GPA <b>3.27</b> / 4.00</strong></div></div>
          <div className="achievement-card"><div className="achievement-mark">★</div><div><p className="eyebrow">Achievement / 2026</p><h3>TEKNOFEST Oncology</h3><p>Risk-Aware Biopsy Planning projesiyle finalist.</p></div><ArrowUpRight size={20} /></div>
        </section>

        <section className="contact-section page-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy"><SectionKicker number="06">İletişim</SectionKicker><h2 id="contact-title">Bir sonraki anlamlı problemi <em>birlikte</em> inceleyelim.</h2><p>AI sistemleri, evaluation süreçleri veya araştırma fikirleri üzerine konuşmak için bana ulaşın.</p></div>
          <div className="contact-actions"><a className="contact-email" href="mailto:srplgdkl@gmail.com"><Mail size={19} /> srplgdkl@gmail.com <ArrowUpRight size={17} /></a><button className="copy-button" type="button" onClick={copyEmail}>{copied ? <><Check size={16} /> kopyalandı</> : <><Copy size={16} /> e-postayı kopyala</>}</button><div className="social-links"><a href="https://github.com/SerpilUmayGedikli" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ExternalLink size={13} /></a><a href="https://www.linkedin.com/in/serpil-umaygedikli-442b31207" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ExternalLink size={13} /></a></div></div>
          <div className="contact-footer-note"><MapPin size={15} /> Ankara, Türkiye <span>//</span> Turkish native · English B1</div>
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 Serpil Umay Gedikli</span><span>designed for reliable systems <Circle size={7} fill="currentColor" /></span><a href="#top">başa dön <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}

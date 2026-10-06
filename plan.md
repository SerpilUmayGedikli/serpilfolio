# Serpil Umay Gedikli — AI Engineer Portfolio

## Ürün kapsamı

CV'deki bilgileri tek sayfalık, Türkçe arayüzlü ve mobil uyumlu bir kişisel portfolyoya dönüştürüyoruz. Sayfa; AI Engineer kimliğini, uzmanlık alanlarını, Digital Brain Technology deneyimini, TEKNOFEST 2026 finalistliğini ve seçilmiş projeleri hızlı taranabilir bir anlatımla sunacak. İletişim bağlantıları görünür olacak.

## Tasarım yönü

- **Design Movement:** Editorial dark mode + observability / terminal estetiği. Güvenilir AI sistemlerini; laboratuvar notları, ölçüm panelleri ve teknik vaka çalışmaları hissiyle anlatır.
- **Core Principles:** (1) Önce sinyal: gereksiz dekor yerine net bilgi hiyerarşisi. (2) Kanıt görünür: metrikler ve kapsam sınırları öne çıkar. (3) Kontrollü kontrast: koyu zemin üzerinde limon-sinyal vurguları. (4) İnsan dokunuşu: teknik içerik sıcak, doğrudan ve abartısız bir sesle yazılır.
- **Color Philosophy:** Kömür siyahı ve kırık beyaz temel güven ve okunabilirlik sağlar; imza rengi asidik limon (#D7F45B) ölçülebilir başarıları ve “sinyal” fikrini taşır; teal destek rengi canlı sistem / veri akışını temsil eder.
- **Layout Paradigm:** Merkezi kart ızgarası yerine sol kenar navigasyonu ve bölümlerin üst üste akan bir editoryal kolon düzeni. Bazı bölümler tam genişlikte metrik şeritleri, bazıları asimetrik vaka panelleri kullanır.
- **Signature Elements:** İnce teknik grid dokusu; “signal / status” etiketleri ve canlı nokta; monospace ölçüm satırları ve kısa koordinat/numara işaretleri.
- **Interaction Philosophy:** Kullanıcı tek tıklamayla bölümlere atlar; proje filtreleri keşfi kolaylaştırır; hover durumları statik kartı “vaka notu” gibi açar; e-posta kopyalama güvenli ve düşük sürtünmelidir.
- **Animation:** Bölümler yüklenirken hafif fade-up; kartlarda 180–240 ms translate/outline geçişi; hero gridinde çok yavaş parallax hissi. İşlevi olmayan sürekli hareket yok.
- **Typography System:** Başlıklarda Space Grotesk; gövde metninde Inter; ölçüm, teknoloji ve metadata satırlarında JetBrains Mono. Başlıklar kısa ve büyük, gövde 16px/1.6, teknik etiketler 11–12px uppercase tracking.
- **Brand Essence:** “Güvenilir, ölçülebilir ve dağıtıma hazır AI sistemleri kuran genç mühendis.” Kişilik: meraklı, titiz, kanıt odaklı.
- **Brand Voice:** Net, teknik ama iddiasını sınırlarıyla birlikte söyleyen bir dil. Örnekler: “Model prototipinden önce ölçüm.” / “Sistemin ne zaman susması gerektiğini de tasarlarım.”
- **Wordmark & Logo:** “SG” monogramı, iki kesik köşeli parantez arasında; veri akışının kontrol altına alınmasını temsil eder. Metin wordmark olarak “SERPİL / UMAY” iki satırda kullanılır.
- **Signature Brand Color:** Acid signal lime (#D7F45B).

## Uygulama planı

- React tek sayfa akışı; mevcut starter'ın `Home` rotası kullanılacak.
- `client/src/pages/Home.tsx`: portfolyo içeriği, proje filtreleme, mobil menü ve e-posta kopyalama etkileşimi.
- `client/src/index.css`: özel tasarım token'ları, grid dokusu, responsive yerleşim, hareket ve erişilebilir focus durumları.
- `client/index.html`: Türkçe dil, başlık, description, keywords ve sosyal paylaşım metadata.
- `client/public/manus-routes.json`: yalnızca `/` ve `/404` public route manifesti.
- `app.config.ts`: proje wordmark/favicon asset'i için literal logo URL'si checkpoint öncesi eklenecek.
- Backend/database gerekmiyor; site statik olarak çalışacak (`pnpm dev:static`, `pnpm build:static`).

## İçerik kaynakları

CV'deki gerçek bilgiler korunacak: Ankara University (B.Sc. AI & Data Engineering, GPA 3.27/4.00), Digital Brain Technology (AI & Backend Intern), TEKNOFEST 2026 Oncology finalistliği, Risk-Aware Biopsy Planning, AgroMind AI, RAG-Based Document Intelligence System, Dadadam, Kafka/Flink çalışmaları, Python/SQL ve CV'de listelenen AI/Data/DevOps araçları.

## Proje yapısı

```text
serpilfolio/
├── client/
│   ├── index.html                 # ilk HTML metadata
│   ├── public/manus-routes.json   # route manifest
│   └── src/
│       ├── App.tsx                # route kabuğu ve hata sınırı
│       ├── pages/Home.tsx         # portfolyo sayfası ve etkileşimler
│       └── index.css              # portfolyo görsel sistemi
├── app.config.ts                  # proje logo metadata
├── plan.md                        # bu plan
└── TODO.md                        # teslim kriterleri
```

# Yayın öncesi güvenlik incelemesi

## Sonuç

Bu incelemenin sonunda production bağımlılık audit’i temiz durumdadır:

```text
0 critical · 0 high · 0 moderate · 0 low
```

Ayrıca TypeScript kontrolü, mevcut testler ve GitHub Pages statik build başarılıdır. Site yalnızca statik frontend olarak yayınlandığı için public ortamda uygulama sunucusu, veritabanı veya kullanıcı girdisi alan bir API çalıştırılmayacaktır.

## İncelenen kritik bulgular

`fast-xml-parser` için GHSA-m7jm-9gc2-mpf2, DOCTYPE entity adlarında regex wildcard kullanımı üzerinden XML entity encoding bypass ve güvenilmeyen çıktı HTML/SQL bağlamına taşınırsa XSS veya injection riski tanımlıyor. Bağımlılık `5.11.2` sürümüne kilitlendi. [1]

`proxy-addr` için GHSA-jqcg-44mw-7w3h, hatalı IPv4-mapped IPv6 trust subnet tanımlarının `X-Forwarded-For` değerlerini güvenilir göstermesine yol açabildiğini belirtiyor. Paket `2.0.8` sürümüne kilitlendi. Express ekibinin önerdiği `path-to-regexp` düzeltmeleri de uygulandı; legacy Express route bağımlılığı `0.1.13` sürümüne override edildi. [2] [3]

`drizzle-orm` için GHSA-gpj5-g38j-94v9, güvenilmeyen girdinin SQL identifier veya alias olarak kullanıldığı dinamik sorgularda identifier escaping açığını açıklıyor. Paket `0.45.4` sürümüne güncellendi. Bu portfolyo statik olduğundan Drizzle runtime’ı public deployment’a girmez, ancak kaynak dependency ağacı da temizlenmiştir. [4]

`axios` tarafında CISA, 2026-03-31 tarihinde `axios@1.14.1` ve `axios@0.30.4` sürümlerine kötü amaçlı `plain-crypto-js` bağımlılığı enjekte edildiğini bildirdi. Proje `axios@1.20.0` sürümüne yükseltildi; lockfile yalnızca bilinen güvenli sürümlerle yeniden üretildi. [5]

`mysql2` için GHSA-3f6p-5ww8-9rcr, TLS doğrulaması olmadan `mysql_clear_password` auth switch ile parolanın plaintext gönderilebilmesini ele alıyor. Paket `3.24.6` sürümüne yükseltildi. Bu statik yayın MySQL bağlantısı açmaz. [6]

`nanoid`, `lodash`, `qs`, `dompurify`, `mermaid`, `uuid`, `form-data`, `follow-redirects`, `body-parser`, `mdast-util-to-hast` ve AWS XML parser zinciri için de patched sürümler workspace override’larıyla sabitlendi.

## Uygulanan savunmalar

CSP meta politikası yalnızca aynı-origin script ve bağlantılara izin verir; Google Fonts CSS/font alanlarını ve proje logosunun CDN kaynağını açıkça sınırlar. `object-src`, `frame-src`, `base-uri` ve `form-action` kısıtları eklenmiştir.

`client/public/_headers` içinde response header destekleyen hostlar için `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-Frame-Options` ve HSTS hazırdır. GitHub Pages bu dosyayı response header olarak işlemediği için gerçek header uygulaması ancak Cloudflare Pages/proxy veya `_headers` destekleyen bir host üzerinden yapılabilir.

`.well-known/security.txt` dosyası güvenlik bildirim kanalını tanımlar. GitHub Actions workflow’ları sınırlı permissions ile çalışır; ayrıca production dependency audit’i pull request ve haftalık zamanlamayla izlenir.

## Doğrulama

Aşağıdaki kontroller başarıyla tamamlandı:

```text
pnpm install --frozen-lockfile
pnpm check
pnpm test -- --run       # 2 dosya, 6 test başarılı
pnpm build:static
pnpm audit --prod --audit-level low
```

Build çıktısı `dist/public` altında oluşuyor ve GitHub Pages workflow’u `.nojekyll` ile bu klasörü deploy ediyor.

## Yayın kararı

Teknik güvenlik kontrolleri bakımından statik portfolyo public yayına hazırdır. GitHub repository oluşturma ve Pages yayını için GitHub hesabı bağlantısı hâlâ gereklidir. Özel domain kullanılacaksa HSTS, gerçek response CSP başlıkları ve WAF kuralları Cloudflare proxy katmanında ayrıca etkinleştirilmelidir.

## References

[1]: https://github.com/advisories/GHSA-m7jm-9gc2-mpf2 "Entity encoding bypass via regex injection in DOCTYPE entity names"
[2]: https://github.com/jshttp/proxy-addr/security/advisories/GHSA-jqcg-44mw-7w3h "proxy-addr IPv4-mapped IPv6 trust subnet advisory"
[3]: https://expressjs.com/en/blog/2026-03-30-security-releases/ "Express security releases for path-to-regexp"
[4]: https://github.com/advisories/GHSA-gpj5-g38j-94v9 "Drizzle ORM SQL injection through identifier escaping"
[5]: https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager "CISA alert on Axios npm supply-chain compromise"
[6]: https://github.com/advisories/GHSA-3f6p-5ww8-9rcr "MySQL2 auth plugin downgrade advisory"

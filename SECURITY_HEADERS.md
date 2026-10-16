# Web güvenlik katmanı

## Aktif CSP

`client/index.html` içinde CSP meta politikası bulunur. GitHub Pages özel response header ayarlamaya izin vermediği için bu politika tarayıcı tarafında meta etiketiyle uygulanır.

İzin verilen kaynaklar sınırlıdır:

- Script: yalnızca aynı origin
- Stil: aynı origin ve Google Fonts CSS
- Font: aynı origin ve `fonts.gstatic.com`
- Görseller: aynı origin, `data:` ve proje logosunun CDN alanı
- Bağlantılar: yalnızca aynı origin
- Object/embed, frame ve form hedefleri kısıtlıdır

## Response security headers

`client/public/_headers` dosyası; Cloudflare Pages, Netlify veya `_headers` destekleyen başka bir statik host arkasında yayınlandığında aşağıdaki başlıkları hazır olarak uygular:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`

**Önemli:** GitHub Pages `_headers` dosyasını response header olarak işlemez. Bu nedenle dosya kaynakta hazır tutulur; gerçek response başlıkları için Cloudflare proxy/Pages veya başka bir reverse proxy gerekir. GitHub Pages'in kendi HTTPS, CDN ve DDoS koruması devam eder.

## Güvenlik bildirimi

`/.well-known/security.txt` güvenlik araştırmacılarının `srplgdkl@gmail.com` adresine bildirim göndermesi için eklenmiştir.

## GitHub Actions

Pages workflow'u yalnızca `contents: read`, `pages: write` ve `id-token: write` izinleriyle çalışır. Repository oluşturulduktan sonra GitHub tarafında branch protection ve Dependabot alerts ayrıca etkinleştirilebilir.

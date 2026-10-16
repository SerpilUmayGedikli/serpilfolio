# GitHub Pages custom domain yapılandırması

Bu proje GitHub Actions ile yayınlandığı için GitHub Pages üzerindeki **Settings → Pages → Custom domain** alanı esas yapılandırmadır. Actions yayınlarında repository köküne elle `CNAME` koymak gerekli değildir; GitHub Pages arayüzü custom domain bilgisini yayın ayarına kaydeder.

## Kök alan adı ve www

Örnek alan adı `example.com`, GitHub kullanıcı adı `SerpilUmayGedikli` ise DNS sağlayıcında şu kayıtları oluştur:

```text
A     @      185.199.108.153
A     @      185.199.109.153
A     @      185.199.110.153
A     @      185.199.111.153
CNAME www    SerpilUmayGedikli.github.io
```

İsteğe bağlı IPv6 kayıtları:

```text
AAAA  @      2606:50c0:8000::153
AAAA  @      2606:50c0:8001::153
AAAA  @      2606:50c0:8002::153
AAAA  @      2606:50c0:8003::153
```

`www` CNAME değeri repository adı içermez. `SerpilUmayGedikli.github.io/serpilfolio` yanlıştır; doğrudan `SerpilUmayGedikli.github.io` kullanılmalıdır.

## GitHub ayarı

Repository’de **Settings → Pages → Build and deployment → Source** olarak **GitHub Actions** seçilir. **Custom domain** alanına tercih edilen ana adres, örneğin `example.com`, girilir ve kaydedilir. DNS yayıldıktan sonra **Enforce HTTPS** etkinleştirilir.

Kök alan adı kullanılıyorsa `www` kaydını da yapılandırmak önerilir. DNS sağlayıcındaki eski A/CNAME çakışmalarını ve wildcard `*.example.com` kayıtlarını kaldır. DNS değişiklikleri 24 saate kadar sürebilir.

## CNAME dosyası ne zaman kullanılır?

Branch tabanlı Pages yayınında repository kökünde aşağıdaki içerikte bir `CNAME` dosyası kullanılabilir:

```text
example.com
```

Bu Actions workflow’unda ise `actions/upload-pages-artifact` ve `actions/deploy-pages` kullanıldığı için GitHub Pages ayarındaki Custom domain alanı yeterlidir. Gerçek domain bilinmeden projeye placeholder `CNAME` eklenmemelidir; aksi hâlde yanlış domain yayınlanabilir.

## DNS kontrolü

```bash
dig example.com A +short
dig www.example.com CNAME +short
curl -I https://example.com
```

A kayıtlarında GitHub IP’leri, CNAME kaydında `SerpilUmayGedikli.github.io.` görülmelidir. Özel domain tanımlandığında bu dokümandaki örnek URL’ler ile `index.html` içindeki canonical/OG/sitemap URL’leri gerçek domain ile güncellenmelidir.

# GitHub Pages ile ücretsiz yayınlama

Bu proje GitHub Pages'ın **GitHub Actions** yöntemiyle yayınlanmaya hazırdır.

## 1. GitHub repository oluşturun

GitHub'da yeni bir repository oluşturun. Örneğin:

```text
serpilumaygedikli/serpilfolio
```

Repository'yi public seçmeniz önerilir. GitHub Pages ücretsiz hesaplarda public repository ile kullanılabilir.

## 2. Projeyi GitHub'a gönderin

Bu klasörde:

```bash
git remote add github https://github.com/KULLANICI_ADINIZ/REPOSITORY_ADI.git
git push -u github main
```

`KULLANICI_ADINIZ` ve `REPOSITORY_ADI` bölümlerini kendi bilgilerinizle değiştirin.

## 3. Pages kaynağını Actions yapın

GitHub repository içinde:

1. **Settings → Pages** bölümünü açın.
2. **Build and deployment → Source** alanında **GitHub Actions** seçin.
3. `main` branch'e yapılan her push sonrasında workflow otomatik çalışır.

Yayın adresi genellikle şu formatta olur:

```text
https://KULLANICI_ADINIZ.github.io/REPOSITORY_ADI/
```

## 4. Manuel çalıştırma

GitHub'da **Actions → Deploy portfolio to GitHub Pages → Run workflow** yoluyla deploy'u elle başlatabilirsiniz.

## Notlar

- `vite.config.ts` içindeki `base: "./"` ayarı sayesinde repository adı ne olursa olsun asset yolları çalışır.
- Bu site statik frontend'dir; backend, veritabanı veya gizli environment variable gerektirmez.
- Özel alan adı kullanmak isterseniz GitHub Pages → Settings → Pages → Custom domain bölümünden domain bağlayabilirsiniz. Domain'in kendisi genellikle ücretsiz değildir.

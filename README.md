# AIRLOAD

Jednostronicowa strona wizytówkowa dla domowego projektu drukowanych w 3D ładowarek (speedloaderów) do magazynków ASG. Styl inspirowany apple.com — dużo przestrzeni, mocna typografia, subtelne animacje scrollowe — z klimatem wojskowym/ASG (khaki/olive/tan na czerni).

## Struktura

- `index.html` — treść strony
- `css/style.css` — cały design system (tokeny, layout, animacje, responsywność)
- `js/main.js` — scroll reveal, licznik statystyk, menu mobilne, formularz kontaktowy

Statyczna strona, bez build stepu i zależności — wystarczy otworzyć `index.html` lub wdrożyć na GitHub Pages / dowolny hosting statyczny.

## Do podmiany przez właściciela

- Dane kontaktowe w sekcji „Kontakt” i w stopce (e-mail, Instagram) to placeholdery.
- Cennik, nazwy modeli i opinie klientów w `index.html` to przykładowe treści do edycji.
- Grafiki w galerii to autorskie ilustracje SVG — do podmiany na prawdziwe zdjęcia produktów (wystarczy podmienić `.gallery-plate` w `index.html`/`css/style.css` na `<img>`).

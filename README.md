# Portfolio di Martina

Sito statico, pensato prima di tutto per smartphone. La schermata iniziale e le sezioni Food e Beauty sono contenute nello stesso `index.html`: il passaggio tra sezioni non ricarica la pagina.

Sito pubblicato: [looksbymarti.github.io](https://looksbymarti.github.io/).

## Contenuti attuali

- Food: cinque video. Un tocco sull'anteprima apre il player a tutto schermo nella stessa pagina.
- Beauty: cinque video con lo stesso player.
- Una freccia animata in basso, visibile finché non si scorre, porta alla galleria dei video.
- I pulsanti TikTok e Instagram aprono i profili `@looksbymarti`.
- Il banner con `looksbymarti@gmail.com` copia l'indirizzo negli appunti.

L'animazione delle frecce è un SVG leggero derivato da [Scroll down di Kuldeep Singh](https://lottiefiles.com/free-animation/scroll-down-yE65OadloN), distribuito secondo la [Lottie Simple License](https://lottiefiles.com/page/license). Se l'utente preferisce ridurre il movimento, le frecce restano ferme.

I video sono definiti all'inizio di `script.js`. Quando arriveranno nuovi link, si possono aggiungere elementi alle liste `raccolte.food` e `raccolte.beauty` e le relative immagini di anteprima in `img/`. I player sono incorporati dalle piattaforme originali: la riproduzione dipende dalla disponibilità pubblica dei post e dalle impostazioni del browser.

## Pubblicazione su GitHub Pages

I file sono nella radice del progetto e non richiedono compilazione. GitHub Pages pubblica il ramo `main` dalla cartella `/`. Il file `.nojekyll` evita l'elaborazione Jekyll. Il dominio `martyr19.com` non è ancora collegato: quando sarà registrato, andrà configurato nelle impostazioni Pages e poi nei DNS del gestore del dominio.

Documentazione ufficiale: [pubblicare da un ramo](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) e [collegare un dominio](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

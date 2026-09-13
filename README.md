# Portfolio di Martina Rendittis

Sito statico, pensato prima di tutto per smartphone. La schermata iniziale e le sezioni Food e Beauty sono contenute nello stesso `index.html`: il passaggio tra sezioni non ricarica la pagina.

Sito pubblicato: [emyleaf.github.io/martina-rendittis-portfolio](https://emyleaf.github.io/martina-rendittis-portfolio/).

## Contenuti attuali

- Food: cinque riquadri con i due video forniti, ripetuti come esempi per provare lo scorrimento.
- Beauty: cinque riquadri provvisori, pronti per i video futuri.
- I pulsanti TikTok e Instagram aprono i profili `@looksbymarti`.

I video e gli spazi Beauty sono definiti all'inizio di `script.js`. Quando arriveranno nuovi link, si possono sostituire gli elementi delle liste `raccolte.food` e `raccolte.beauty`. I player sono incorporati dalle piattaforme originali: la riproduzione dipende dalla disponibilità pubblica dei post e dalle impostazioni del browser.

## Pubblicazione su GitHub Pages

I file sono nella radice del progetto e non richiedono compilazione. GitHub Pages pubblica il ramo `main` dalla cartella `/`. Il file `.nojekyll` evita l'elaborazione Jekyll. Il dominio `martyr19.com` non è ancora collegato: quando sarà registrato, andrà configurato nelle impostazioni Pages e poi nei DNS del gestore del dominio.

Documentazione ufficiale: [pubblicare da un ramo](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) e [collegare un dominio](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

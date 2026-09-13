// Per aggiornare il portfolio, sostituisci gli elementi di queste liste con i nuovi video.
// Il player TikTok usa l'ID numerico del post; Instagram usa il codice del Reel.
const videoDiEsempio = {
  tiktok: {
    piattaforma: "TikTok",
    titolo: "Un aperitivo in Toscana",
    url: "https://www.tiktok.com/@looksbymarti/video/7656032266816195873",
    embed: "https://www.tiktok.com/player/v1/7656032266816195873",
  },
  instagram: {
    piattaforma: "Instagram",
    titolo: "Diva Bites, episodio 7",
    url: "https://www.instagram.com/reel/Dca1XLMsdaM/",
    embed: "https://www.instagram.com/reel/Dca1XLMsdaM/embed/",
  },
};

const raccolte = {
  food: [
    videoDiEsempio.tiktok,
    videoDiEsempio.instagram,
    videoDiEsempio.tiktok,
    videoDiEsempio.instagram,
    videoDiEsempio.tiktok,
  ],
  beauty: [],
};

const numeroSpaziBeauty = 5;
const views = {
  home: document.getElementById("home-view"),
  food: document.getElementById("food-view"),
  beauty: document.getElementById("beauty-view"),
};
const galleries = {
  food: document.getElementById("food-gallery"),
  beauty: document.getElementById("beauty-gallery"),
};
const baseUrl = `${window.location.pathname}${window.location.search}`;
let activeView = null;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function videoCard(video, index) {
  const card = element("article", "video-card");
  const heading = element("div", "video-card__heading");
  const headingCopy = element("div");
  headingCopy.append(
    element("p", "", `${video.piattaforma} · Video ${String(index + 1).padStart(2, "0")}`),
    element("h4", "", video.titolo),
  );
  heading.append(headingCopy, element("span", "video-card__number", String(index + 1).padStart(2, "0")));

  const player = element("div", "video-card__player");
  const frame = element("iframe");
  frame.src = video.embed;
  frame.title = `${video.titolo} su ${video.piattaforma}`;
  frame.loading = "lazy";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  player.append(frame);

  const footer = element("div", "video-card__footer");
  const link = element("a", "", "Apri il video ↗");
  link.href = video.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Apri ${video.titolo} su ${video.piattaforma} in una nuova scheda`);
  footer.append(element("span", "", `Su ${video.piattaforma}`), link);

  card.append(heading, player, footer);
  return card;
}

function placeholderCard(index) {
  const card = element("article", "placeholder-card");
  const top = element("div", "placeholder-card__top");
  top.append(
    element("span", "", `Beauty · ${String(index + 1).padStart(2, "0")}`),
    element("span", "placeholder-card__ornament", "✦"),
  );
  const bottom = element("div", "placeholder-card__bottom");
  bottom.append(
    element("h4", "", "Il prossimo video è qui."),
    element("p", "", "Spazio pronto per un contenuto beauty."),
  );
  card.append(top, bottom);
  return card;
}

function populateGallery(view) {
  const gallery = galleries[view];
  if (!gallery) return;

  const videos = raccolte[view];
  const cards = videos.length
    ? videos.map(videoCard)
    : Array.from({ length: numeroSpaziBeauty }, (_, index) => placeholderCard(index));
  gallery.replaceChildren(...cards);
  document.getElementById(`${view}-count`).textContent = String(cards.length).padStart(2, "0");
}

function viewFromHash() {
  const requested = window.location.hash.slice(1).toLowerCase();
  return requested === "food" || requested === "beauty" ? requested : "home";
}

function showView(view, focusHeading = false) {
  if (activeView === view) return;

  for (const [name, section] of Object.entries(views)) {
    section.hidden = name !== view;
  }
  for (const [name, gallery] of Object.entries(galleries)) {
    if (name !== view) gallery.replaceChildren(); // Ferma il video quando si esce dalla sezione.
  }
  if (view !== "home") populateGallery(view);

  activeView = view;
  document.title = view === "home"
    ? "Martina Rendittis — Food & Beauty"
    : `${view === "food" ? "Food" : "Beauty"} — Martina Rendittis`;
  window.scrollTo(0, 0);

  if (focusHeading) {
    const heading = views[view].querySelector("h1, h2");
    heading?.focus({ preventScroll: true });
  }
}

function openView(view) {
  if (!views[view] || view === "home") return;
  window.history.pushState({ view, fromHome: true }, "", `${baseUrl}#${view}`);
  showView(view, true);
}

function returnHome() {
  if (window.history.state?.fromHome) {
    window.history.back();
  } else {
    window.history.replaceState({ view: "home", fromHome: false }, "", baseUrl);
    showView("home", true);
  }
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openView(button.dataset.open));
});
document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", returnHome);
});
window.addEventListener("popstate", () => showView(viewFromHash(), true));
window.addEventListener("hashchange", () => showView(viewFromHash(), true));

const initialView = viewFromHash();
window.history.replaceState({ view: initialView, fromHome: false }, "", window.location.href);
showView(initialView);

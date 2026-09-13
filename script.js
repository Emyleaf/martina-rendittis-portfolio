// Sostituisci qui titoli, anteprime e link quando arrivano nuovi video.
const videoDiEsempio = {
  tiktok: {
    titolo: "Questo posto mi ha rubato il cuore",
    piattaforma: "TikTok",
    anteprima: "./img/food-tiktok-preview.jpg",
    url: "https://www.tiktok.com/@looksbymarti/video/7656032266816195873",
    embed: "https://www.tiktok.com/player/v1/7656032266816195873",
  },
  instagram: {
    titolo: "DIVA BITES ep. 7",
    piattaforma: "Instagram",
    anteprima: "./img/food-instagram-preview.jpg",
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

const email = "looksbymarti@gmail.com";
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
const dialog = document.getElementById("video-dialog");
const dialogTitle = document.getElementById("video-dialog-title");
const dialogPlayer = document.getElementById("video-dialog-player");
const dialogOriginal = document.getElementById("video-dialog-original");
const copyFeedback = document.querySelector("[data-copy-feedback]");
const baseUrl = window.location.pathname + window.location.search;
let activeView = null;
let feedbackTimer;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function openVideo(video) {
  dialogTitle.textContent = video.titolo;
  dialogOriginal.href = video.url;
  dialogOriginal.textContent = "Apri su " + video.piattaforma + " →";

  dialog.showModal();
  document.body.classList.add("dialog-open");

  const frame = element("iframe");
  frame.title = video.titolo + " su " + video.piattaforma;
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  dialogPlayer.replaceChildren(frame);
  frame.src = video.embed;
  dialog.querySelector("[data-close-video]").focus();
}

function closeVideo() {
  if (dialog.open) dialog.close();
}

function videoCard(video) {
  const card = element("button", "video-banner");
  card.type = "button";
  card.setAttribute("aria-label", "Guarda " + video.titolo + " a schermo intero");

  const image = element("img", "video-banner__image");
  image.src = video.anteprima;
  image.alt = "";
  image.loading = "lazy";

  card.append(
    image,
    element("span", "video-banner__label", video.titolo),
    element("span", "video-banner__play"),
  );
  card.addEventListener("click", () => openVideo(video));
  return card;
}

function placeholderCard() {
  const card = element("article", "video-banner video-banner--placeholder");
  card.append(
    element("span", "video-banner__label", "Beauty"),
    element("span", "video-banner__placeholder-text", "Video in arrivo"),
  );
  return card;
}

function populateGallery(view) {
  const gallery = galleries[view];
  if (!gallery) return;
  const videos = raccolte[view];
  const cards = videos.length
    ? videos.map(videoCard)
    : Array.from({ length: numeroSpaziBeauty }, placeholderCard);
  gallery.replaceChildren(...cards);
}

function viewFromHash() {
  const requested = window.location.hash.slice(1).toLowerCase();
  return requested === "food" || requested === "beauty" ? requested : "home";
}

function showView(view, focusHeading = false) {
  if (activeView === view) return;
  closeVideo();

  for (const [name, section] of Object.entries(views)) {
    section.hidden = name !== view;
  }
  for (const [name, gallery] of Object.entries(galleries)) {
    if (name !== view) gallery.replaceChildren();
  }
  if (view !== "home") populateGallery(view);

  activeView = view;
  document.title = view === "home"
    ? "Martina Rendittis — Food & Beauty"
    : (view === "food" ? "Food" : "Beauty") + " — Martina Rendittis";
  window.scrollTo(0, 0);

  if (focusHeading) {
    const heading = views[view].querySelector("h1, h2");
    heading?.focus({ preventScroll: true });
  }
}

function openView(view) {
  if (!views[view] || view === "home") return;
  window.history.pushState({ view, fromHome: true }, "", baseUrl + "#" + view);
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

async function copyEmail() {
  let copied = false;
  try {
    await navigator.clipboard.writeText(email);
    copied = true;
  } catch {
    const helper = element("textarea");
    helper.value = email;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    try {
      helper.select();
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      helper.remove();
    }
  }

  copyFeedback.textContent = copied ? "Copiata!" : "Riprova";
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    copyFeedback.textContent = "Copia";
  }, 2500);
}

document.querySelector("[data-copy-email]").addEventListener("click", copyEmail);
document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openView(button.dataset.open));
});
document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", returnHome);
});
document.querySelector("[data-close-video]").addEventListener("click", closeVideo);
dialog.addEventListener("close", () => {
  dialogPlayer.replaceChildren();
  document.body.classList.remove("dialog-open");
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeVideo();
});
window.addEventListener("popstate", () => showView(viewFromHash(), true));
window.addEventListener("hashchange", () => showView(viewFromHash(), true));

const initialView = viewFromHash();
window.history.replaceState({ view: initialView, fromHome: false }, "", window.location.href);
showView(initialView);

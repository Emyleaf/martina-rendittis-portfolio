const raccolte = {
  food: [
    {
      titolo: "Questo posto mi ha rubato il cuore",
      piattaforma: "TikTok",
      anteprima: "./img/food-tiktok-preview.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7656032266816195873",
      embed: "https://www.tiktok.com/player/v1/7656032266816195873",
    },
    {
      titolo: "DIVA BITES ep. 7",
      piattaforma: "Instagram",
      anteprima: "./img/food-instagram-preview.jpg",
      url: "https://www.instagram.com/reel/Dca1XLMsdaM/",
      embed: "https://www.instagram.com/reel/Dca1XLMsdaM/embed/",
    },
    {
      titolo: "DIVA BITES ep. 10",
      piattaforma: "TikTok",
      anteprima: "./img/food-morelli.jpg",
      url: "https://vm.tiktok.com/ZGdQSXYrd/",
      embed: "https://www.tiktok.com/player/v1/7683946331974487328",
    },
    {
      titolo: "Breakfast in my city",
      piattaforma: "TikTok",
      anteprima: "./img/food-latte-co.jpg",
      url: "https://vm.tiktok.com/ZGdQSshfH/",
      embed: "https://www.tiktok.com/player/v1/7682725197207588129",
    },
    {
      titolo: "DIVA BITES ep. 9",
      piattaforma: "TikTok",
      anteprima: "./img/food-bottega-dani.jpg",
      url: "https://vm.tiktok.com/ZGdQSwXcU/",
      embed: "https://www.tiktok.com/player/v1/7681623617414679840",
    },
  ],
  beauty: [
    {
      titolo: "Colorgram da OVS",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-colorgram.jpg",
      url: "https://vm.tiktok.com/ZGdQSEhxB/",
      embed: "https://www.tiktok.com/player/v1/7684198669683264801",
    },
    {
      titolo: "Spume doccia Biovène",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-biovene.jpg",
      url: "https://vm.tiktok.com/ZGdQSEpWL/",
      embed: "https://www.tiktok.com/player/v1/7682459883504962849",
    },
    {
      titolo: "Acqua & Sapone",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-acqua-sapone.jpg",
      url: "https://vm.tiktok.com/ZGdQS3YKc/",
      embed: "https://www.tiktok.com/player/v1/7679754148098690336",
    },
    {
      titolo: "Routine Medicube",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-medicube.jpg",
      url: "https://vm.tiktok.com/ZGdQS4h88/",
      embed: "https://www.tiktok.com/player/v1/7671225744617491745",
    },
    {
      titolo: "Giretto da dm",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-dm.jpg",
      url: "https://vm.tiktok.com/ZGdQSEjws/",
      embed: "https://www.tiktok.com/player/v1/7678767993505074465",
    },
  ],
};

const email = "looksbymarti@gmail.com";
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
const contactChip = document.querySelector("[data-copy-email]");
const scrollCues = document.querySelectorAll(".scroll-cue");
const heroPhoto = document.querySelector(".hero-photo");
const portfolio = document.getElementById("portfolio");
const viewContainer = document.querySelector(".view-container");
const desktopGallery = window.matchMedia("(min-width: 1100px)");
const tabletLayout = window.matchMedia("(min-width: 700px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const baseUrl = window.location.pathname + window.location.search;
const cardObserver = "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ? new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 })
  : null;
if (cardObserver) document.documentElement.classList.add("motion-ready");
let activeView = null;

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

function populateGallery(view) {
  const gallery = galleries[view];
  if (!gallery) return;
  const videos = raccolte[view];
  gallery.replaceChildren(...videos.map(videoCard));
  if (cardObserver) {
    gallery.querySelectorAll(".video-banner").forEach((card) => cardObserver.observe(card));
  }
}

function viewFromHash() {
  const requested = window.location.hash.slice(1).toLowerCase();
  return requested === "food" || requested === "beauty" ? requested : "home";
}

function updateScrollCues() {
  scrollCues.forEach((cue) => {
    if (cue.closest(".view").hidden) return;

    if (desktopGallery.matches) {
      const gallery = document.getElementById(cue.dataset.scrollTo);
      cue.hidden = gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 4;
    } else if (tabletLayout.matches) {
      cue.hidden = viewContainer.scrollTop + viewContainer.clientHeight >= viewContainer.scrollHeight - 4;
    } else {
      const lastCard = galleries[activeView]?.lastElementChild;
      cue.hidden = !lastCard || lastCard.getBoundingClientRect().bottom <= window.innerHeight + 4;
    }
  });
}

function fitCollectionSummary() {
  const section = views[activeView];
  const intro = section?.querySelector(".food-intro, .beauty-intro");
  if (!intro) return;

  intro.style.removeProperty("font-size");

}

function showView(view, focusHeading = false) {
  if (activeView === view) return;
  closeVideo();
  cardObserver?.disconnect();

  for (const [name, section] of Object.entries(views)) {
    section.hidden = name !== view;
  }
  for (const [name, gallery] of Object.entries(galleries)) {
    if (name !== view) gallery.replaceChildren();
  }
  if (view !== "home") populateGallery(view);

  activeView = view;
  portfolio.classList.toggle("is-collection", view !== "home");
  document.title = view === "home"
    ? "Martina"
    : (view === "food" ? "Food" : "Beauty") + " - Martina";
  window.scrollTo(0, 0);
  viewContainer.scrollTop = 0;
  requestAnimationFrame(() => {
    fitCollectionSummary();
    updateScrollCues();
  });

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

function showCopyFeedback(text, trigger) {
  const feedback = element("span", "copy-float", text);
  const heroRect = heroPhoto.getBoundingClientRect();
  const triggerRect = trigger.getBoundingClientRect();

  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  feedback.style.left = `${triggerRect.left - heroRect.left + triggerRect.width / 2}px`;
  feedback.style.top = `${triggerRect.top - heroRect.top - 8}px`;
  heroPhoto.append(feedback);

  const removeFeedback = () => feedback.remove();
  feedback.addEventListener("animationend", removeFeedback, { once: true });
  window.setTimeout(removeFeedback, 2200);
}

async function copyEmail(event) {
  const trigger = event.currentTarget;
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

  showCopyFeedback(copied ? "Copiato!" : "Impossibile copiare", trigger);
}

contactChip.addEventListener("click", copyEmail);
document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openView(button.dataset.open));
});
document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", returnHome);
});
document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    const gallery = document.getElementById(button.dataset.scrollTo);
    const behavior = reducedMotion.matches ? "auto" : "smooth";
    if (desktopGallery.matches) {
      gallery?.scrollBy({ top: gallery.clientHeight * 0.75, behavior });
    } else if (tabletLayout.matches) {
      viewContainer.scrollBy({ top: viewContainer.clientHeight * 0.75, behavior });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior });
    }
  });
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
window.addEventListener("scroll", updateScrollCues, { passive: true });
viewContainer.addEventListener("scroll", updateScrollCues, { passive: true });
Object.values(galleries).forEach((gallery) => gallery.addEventListener("scroll", updateScrollCues, { passive: true }));
window.addEventListener("resize", () => {
  fitCollectionSummary();
  updateScrollCues();
});

const initialView = viewFromHash();
window.history.replaceState({ view: initialView, fromHome: false }, "", window.location.href);
showView(initialView);

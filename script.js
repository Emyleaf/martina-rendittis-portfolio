const raccolte = {
  food: [
    {
      titolo: "Azienda Agricola Castelvecchio, Terricciola (PI)",
      piattaforma: "TikTok",
      anteprima: "./img/food-castelvecchio.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7677539700160204064",
      embed: "https://www.tiktok.com/player/v1/7677539700160204064",
    },
    {
      titolo: "L’Antica Pizzeria Da Michele, Livorno (LI)",
      piattaforma: "TikTok",
      anteprima: "./img/food-da-michele.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7676810637590154528",
      embed: "https://www.tiktok.com/player/v1/7676810637590154528",
    },
    {
      titolo: "Fermento, Agriturismo Fonte Belvedere (LI)",
      piattaforma: "TikTok",
      anteprima: "./img/food-fermento.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7656032266816195873",
      embed: "https://www.tiktok.com/player/v1/7656032266816195873",
    },
    {
      titolo: "Royal Sushi, Livorno (LI)",
      piattaforma: "TikTok",
      anteprima: "./img/food-royal-sushi.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7659087679056825633",
      embed: "https://www.tiktok.com/player/v1/7659087679056825633",
    },
    {
      titolo: "May’s Pasticceria, Pisa (PI)",
      piattaforma: "TikTok",
      anteprima: "./img/food-mays.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7669375082606742817",
      embed: "https://www.tiktok.com/player/v1/7669375082606742817",
    },
  ],
  beauty: [
    {
      titolo: "OVS",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-colorgram-ovs.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7684198669683264801",
      embed: "https://www.tiktok.com/player/v1/7684198669683264801",
    },
    {
      titolo: "Medicube Zero Pore",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-medicube-zero-pore.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7671225744617491745",
      embed: "https://www.tiktok.com/player/v1/7671225744617491745",
    },
    {
      titolo: "Stylevana",
      piattaforma: "Instagram",
      anteprima: "./img/beauty-stylevana-spf.jpg",
      url: "https://www.instagram.com/reel/DcgH5r2MMHb/",
      embed: "https://www.instagram.com/reel/DcgH5r2MMHb/embed/",
    },
    {
      titolo: "Tigotà",
      piattaforma: "Instagram",
      anteprima: "./img/beauty-biovene-tigota.jpg",
      url: "https://www.instagram.com/reel/Dc8-QrZsAUs/",
      embed: "https://www.instagram.com/reel/Dc8-QrZsAUs/embed/",
    },
    {
      titolo: "dm Italia",
      piattaforma: "TikTok",
      anteprima: "./img/beauty-dm-summer.jpg",
      url: "https://www.tiktok.com/@looksbymarti/video/7654541025402162465",
      embed: "https://www.tiktok.com/player/v1/7654541025402162465",
    },
  ],
};

raccolte.contact = raccolte.beauty.filter((video) =>
  ["Medicube Zero Pore", "Stylevana"].includes(video.titolo),
);

const email = "looksbymarti@gmail.com";
const views = {
  home: document.getElementById("home-view"),
  food: document.getElementById("food-view"),
  beauty: document.getElementById("beauty-view"),
  about: document.getElementById("about-view"),
  contact: document.getElementById("contact-view"),
};
const galleries = {
  food: document.getElementById("food-gallery"),
  beauty: document.getElementById("beauty-gallery"),
  contact: document.getElementById("contact-gallery"),
};
const dialog = document.getElementById("video-dialog");
const dialogTitle = document.getElementById("video-dialog-title");
const dialogPlayer = document.getElementById("video-dialog-player");
const dialogOriginal = document.getElementById("video-dialog-original");
const dialogOriginalLabel = dialogOriginal.querySelector("span");
const contactChip = document.querySelector("[data-copy-email]");
const scrollCues = document.querySelectorAll(".scroll-cue");
const heroPhoto = document.querySelector(".hero-photo");
const portfolio = document.getElementById("portfolio");
const viewContainer = document.querySelector(".view-container");
const desktopGallery = window.matchMedia("(min-width: 1100px)");
const tabletGallery = window.matchMedia("(min-width: 700px) and (max-width: 1099px)");
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
let pendingView = null;
let currentVideo = null;
let lastVideoTrigger = null;
let restoreVideoFocus = true;
let videoTransitionId = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function nextPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function animateVideoFlight(fromRect, toRect, imageSource, duration, closing = false) {
  if (!Element.prototype.animate || !fromRect?.width || !toRect?.width) {
    return Promise.resolve();
  }

  const flight = element("div", "video-flight");
  const image = element("img");
  image.src = imageSource;
  image.alt = "";
  flight.append(image);
  dialog.append(flight);

  const frame = (rect, opacity, borderRadius) => ({
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    opacity,
    borderRadius,
  });
  const keyframes = closing
    ? [frame(fromRect, 1, "20px"), frame(toRect, 0.35, "14px")]
    : [
        frame(fromRect, 0.96, "14px"),
        { ...frame(toRect, 1, "20px"), offset: 0.86 },
        frame(toRect, 0, "20px"),
      ];
  const animation = flight.animate(keyframes, {
    duration,
    easing: closing
      ? "cubic-bezier(0.4, 0, 0.7, 0.2)"
      : "cubic-bezier(0.2, 0.78, 0.2, 1)",
    fill: "forwards",
  });

  return animation.finished.catch(() => {}).finally(() => flight.remove());
}

async function openVideo(video, trigger, manageFocus = false) {
  if (dialog.open) return;
  const transitionId = ++videoTransitionId;
  currentVideo = video;
  lastVideoTrigger = trigger;
  restoreVideoFocus = manageFocus;
  dialogTitle.textContent = video.titolo;
  dialogOriginal.href = video.url;
  dialogOriginalLabel.textContent = "Apri su " + video.piattaforma;

  dialog.showModal();
  if (!manageFocus) dialog.querySelector("[data-close-video]").blur();
  document.body.classList.add("dialog-open");
  if (!reducedMotion.matches) dialog.classList.add("is-morphing");

  const frame = element("iframe");
  frame.title = video.titolo + " su " + video.piattaforma;
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  dialogPlayer.replaceChildren(frame);
  frame.src = video.embed;

  if (!reducedMotion.matches) {
    const fromRect = trigger.getBoundingClientRect();
    await nextPaint();
    const toRect = dialogPlayer.getBoundingClientRect();
    await animateVideoFlight(fromRect, toRect, video.anteprima, 520);
  }

  if (transitionId !== videoTransitionId || !dialog.open) return;
  dialog.classList.remove("is-morphing");
  if (manageFocus) {
    dialog.querySelector("[data-close-video]").focus();
  } else {
    dialog.querySelector("[data-close-video]").blur();
  }
}

async function closeVideo({ immediate = false, restoreFocus = restoreVideoFocus } = {}) {
  if (!dialog.open) return;
  if (dialog.classList.contains("is-closing") && !immediate) return;

  const transitionId = ++videoTransitionId;
  restoreVideoFocus = restoreFocus;
  if (immediate || reducedMotion.matches || !currentVideo) {
    dialog.close();
    return;
  }

  dialog.classList.add("is-closing", "is-morphing");
  const fromRect = dialogPlayer.getBoundingClientRect();
  const toRect = lastVideoTrigger?.isConnected
    ? lastVideoTrigger.getBoundingClientRect()
    : fromRect;
  await animateVideoFlight(fromRect, toRect, currentVideo.anteprima, 300, true);

  if (transitionId === videoTransitionId && dialog.open) dialog.close();
}

function videoCard(video) {
  const card = element("button", "video-banner");
  card.type = "button";
  card.setAttribute("aria-label", "Guarda " + video.titolo + " a schermo intero");

  const image = element("img", "video-banner__image");
  image.src = video.anteprima;
  image.alt = "";
  image.loading = "lazy";
  // Reapply the crop whenever the gallery recreates this thumbnail.
  if (video.anteprima === "./img/food-castelvecchio.jpg") {
    image.setAttribute("style", "scale: 110%;");
  }

  card.append(
    image,
    element("span", "video-banner__label", video.titolo),
    element("span", "video-banner__play"),
  );
  card.addEventListener("click", (event) => openVideo(video, card, event.detail === 0));
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
  return ["food", "beauty", "about", "contact"].includes(requested) ? requested : "home";
}

function updateScrollCues() {
  scrollCues.forEach((cue) => {
    if (cue.closest(".view").hidden) return;

    const gallery = document.getElementById(cue.dataset.scrollTo);

    if (tabletGallery.matches) {
      cue.hidden = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 4;
    } else if (desktopGallery.matches) {
      cue.hidden = gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 4;
    } else {
      const lastCard = galleries[activeView]?.lastElementChild;
      cue.hidden = !lastCard || lastCard.getBoundingClientRect().bottom <= window.innerHeight + 4;
    }
  });
}

function fitCollectionSummary() {
  const section = views[activeView];
  const intro = section?.querySelector(".food-intro, .beauty-intro, .about-intro, .contact-intro");
  if (!intro) return;

  intro.style.removeProperty("font-size");

}

function startViewEntry(section) {
  if (reducedMotion.matches) return;
  section.classList.add("is-entering");
  const finish = () => section.classList.remove("is-entering");
  section.addEventListener("animationend", finish, { once: true });
  window.setTimeout(finish, 420);
}

async function showView(view, focusHeading = false) {
  if (activeView === view || pendingView === view) return;
  pendingView = view;
  const previousSection = views[activeView];
  closeVideo({ immediate: true, restoreFocus: false });
  cardObserver?.disconnect();

  if (previousSection && !reducedMotion.matches) {
    previousSection.classList.add("is-leaving");
    await new Promise((resolve) => window.setTimeout(resolve, 150));
    previousSection.classList.remove("is-leaving");
    if (pendingView !== view) return;
  }

  for (const [name, section] of Object.entries(views)) {
    section.classList.remove("is-entering", "is-leaving");
    section.hidden = name !== view;
  }
  for (const [name, gallery] of Object.entries(galleries)) {
    if (name !== view) gallery.replaceChildren();
  }
  if (galleries[view]) populateGallery(view);

  activeView = view;
  pendingView = null;
  portfolio.classList.toggle("is-collection", view !== "home");
  const viewTitles = {
    home: "Portfolio - Martina",
    food: "Food - Martina",
    beauty: "Beauty - Martina",
    about: "About me - Martina",
    contact: "Lavoriamo insieme - Martina",
  };
  document.title = viewTitles[view];
  window.scrollTo(0, 0);
  viewContainer.scrollTop = 0;
  startViewEntry(views[view]);
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
  if (tabletGallery.matches) {
    galleries[activeView]?.scrollTo({ left: 0, behavior: "auto" });
  } else if (desktopGallery.matches) {
    galleries[activeView]?.scrollTo({ top: 0, behavior: "auto" });
  }

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
    if (tabletGallery.matches) {
      gallery?.scrollBy({ left: gallery.clientWidth * 0.85, behavior });
    } else if (desktopGallery.matches) {
      gallery?.scrollBy({ top: gallery.clientHeight * 0.75, behavior });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior });
    }
  });
});
document.querySelector("[data-close-video]").addEventListener("click", (event) => {
  closeVideo({ restoreFocus: restoreVideoFocus && event.detail === 0 });
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeVideo();
});
dialog.addEventListener("close", () => {
  dialogPlayer.replaceChildren();
  document.body.classList.remove("dialog-open");
  dialog.classList.remove("is-closing", "is-morphing");
  dialog.querySelectorAll(".video-flight").forEach((flight) => flight.remove());
  currentVideo = null;
  if (restoreVideoFocus && lastVideoTrigger?.isConnected) {
    lastVideoTrigger.focus({ preventScroll: true });
  } else {
    lastVideoTrigger?.blur();
    dialog.querySelector("[data-close-video]").blur();
  }
  lastVideoTrigger = null;
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeVideo({ restoreFocus: false });
});
window.addEventListener("popstate", () => showView(viewFromHash(), true));
window.addEventListener("hashchange", () => showView(viewFromHash(), true));
window.addEventListener("scroll", () => {
  if (!tabletGallery.matches) updateScrollCues();
}, { passive: true });
viewContainer.addEventListener("scroll", updateScrollCues, { passive: true });
Object.values(galleries).forEach((gallery) => gallery.addEventListener("scroll", updateScrollCues, { passive: true }));
window.addEventListener("resize", () => {
  fitCollectionSummary();
  updateScrollCues();
});

const initialView = viewFromHash();
window.history.replaceState({ view: initialView, fromHome: false }, "", window.location.href);
showView(initialView);

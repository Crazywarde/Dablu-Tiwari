const header = document.querySelector(".site-header");
const cursorGlow = document.querySelector(".cursor-glow");
const cursorRing = document.querySelector(".cursor-ring");
const cursorDot = document.querySelector(".cursor-dot");
const cursorPulse = document.querySelector(".cursor-pulse");
const scrollProgress = document.querySelector(".scroll-progress");
const hero = document.querySelector(".hero");
const timelineItems = document.querySelectorAll(".timeline-item");
const momentCards = document.querySelectorAll(".moment-card");
const galleryCards = document.querySelectorAll(".gallery-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxCaption = document.querySelector(".lightbox p");
const lightboxClose = document.querySelector(".lightbox-close");
const temporaryPhotos = document.querySelectorAll('img[src$=".jpg"]');
const interactiveItems = document.querySelectorAll("a, button, .timeline-item, .moment-card, .hero-photo-card, .gallery-card");
const tiltItems = document.querySelectorAll(".moment-card, .hero-photo-card, .portrait-card, .gallery-card");
const shineItems = document.querySelectorAll(".hero-layout, .hero-photo-card, .portrait-card, .timeline-item, .gallery-card");
const magneticItems = document.querySelectorAll(".button, .hero-photo-card, .moment-card, .timeline-item, .gallery-card");

let cursorX = 0;
let cursorY = 0;
let ringX = 0;
let ringY = 0;

function moveCursorRing() {
  ringX += (cursorX - ringX) * 0.22;
  ringY += (cursorY - ringY) * 0.22;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(moveCursorRing);
}

moveCursorRing();

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }

  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
});

window.addEventListener("pointermove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;

  cursorGlow.classList.add("is-visible");
  cursorRing.classList.add("is-visible");
  cursorDot.classList.add("is-visible");
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorPulse.style.left = `${event.clientX}px`;
  cursorPulse.style.top = `${event.clientY}px`;
});

hero.addEventListener("pointermove", (event) => {
  const rect = hero.getBoundingClientRect();
  hero.style.setProperty("--hero-x", `${event.clientX - rect.left}px`);
  hero.style.setProperty("--hero-y", `${event.clientY - rect.top}px`);
});

window.addEventListener("pointerleave", () => {
  cursorGlow.classList.remove("is-visible");
  cursorRing.classList.remove("is-visible");
  cursorDot.classList.remove("is-visible");
});

window.addEventListener("pointerdown", () => {
  cursorRing.classList.add("is-pressing");
  cursorPulse.classList.remove("is-clicking");
  void cursorPulse.offsetWidth;
  cursorPulse.classList.add("is-clicking");
});

window.addEventListener("pointerup", () => {
  cursorRing.classList.remove("is-pressing");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document
  .querySelectorAll(".intro-band, .portrait-card, .stats-grid article, .gallery-card, .timeline-item, .moment-card, .legacy-copy, blockquote")
  .forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    timelineItems.forEach((timelineItem) => timelineItem.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});

momentCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

interactiveItems.forEach((item) => {
  item.addEventListener("pointerenter", () => {
    cursorRing.classList.add("is-hovering");
    cursorDot.classList.add("is-hovering");
  });

  item.addEventListener("pointerleave", () => {
    cursorRing.classList.remove("is-hovering");
    cursorDot.classList.remove("is-hovering");
  });
});

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - y / rect.height) * 8;

    item.style.setProperty("--cursor-tilt-x", `${rotateX}deg`);
    item.style.setProperty("--cursor-tilt-y", `${rotateY}deg`);
  });

  item.addEventListener("pointerleave", () => {
    item.style.setProperty("--cursor-tilt-x", "0deg");
    item.style.setProperty("--cursor-tilt-y", "0deg");
  });
});

shineItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--cursor-local-x", `${event.clientX - rect.left}px`);
    item.style.setProperty("--cursor-local-y", `${event.clientY - rect.top}px`);
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const strength = item.classList.contains("button") ? 0.22 : 0.08;

    item.style.translate = `${x * strength}px ${y * strength}px`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.translate = "0 0";
  });
});

temporaryPhotos.forEach((photo) => {
  photo.addEventListener("error", () => {
    photo.classList.add("photo-not-found");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    const caption = card.querySelector("figcaption");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const header = document.querySelector("[data-blur]");
const revealItems = document.querySelectorAll(".reveal");

const syncHeader = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

const resumeTabs = document.querySelectorAll("[data-resume-tab]");
const resumePanels = document.querySelectorAll("[data-resume-panel]");

resumeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.resumeTab;
    resumeTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    resumePanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.resumePanel === target);
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
};

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = trigger.dataset.lightbox;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

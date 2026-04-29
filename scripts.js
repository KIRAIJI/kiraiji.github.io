const toggleButton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const yearEl = document.querySelector("#currentYear");
const currentPage = document.body.dataset.page;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (nav && currentPage) {
  const pageMap = {
    "project-overview": "index.html",
    "architecture-design": "architecture-design.html",
    "api-integration": "api-integration.html",
    database: "database.html",
    "testing-demo": "testing-demo.html",
    resources: "resources.html",
  };

  const activeHref = pageMap[currentPage];
  const links = nav.querySelectorAll("a");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === activeHref) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", () => {
      nav.classList.remove("open");
      if (toggleButton) {
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  });
}

if (toggleButton && nav) {
  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
      nav.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });
}

const diagramImages = document.querySelectorAll(".diagram-image");

if (diagramImages.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("hidden", "");
  lightbox.innerHTML = `
    <button class="image-lightbox__close" aria-label="Close image preview">Close</button>
    <div class="image-lightbox__inner">
      <img class="image-lightbox__img" alt="" />
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".image-lightbox__img");
  const closeButton = lightbox.querySelector(".image-lightbox__close");

  const closeLightbox = () => {
    lightbox.setAttribute("hidden", "");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  };

  diagramImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.removeAttribute("hidden");
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hasAttribute("hidden")) {
      closeLightbox();
    }
  });
}

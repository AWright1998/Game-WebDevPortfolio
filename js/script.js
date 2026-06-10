const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const projects = Array.from(document.querySelectorAll(".project-card"));
const revealItems = document.querySelectorAll(".reveal");
const sections = Array.from(document.querySelectorAll("main section"));

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const match = filter === "all" || categories.includes(filter);
      project.style.display = match ? "flex" : "none";
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

function updateActiveLink() {
  let currentId = "";

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function hasGallery() {
  return lightbox && lightboxImg && galleryImages.length > 0;
}

function animateLightboxImage(newSrc, newAlt) {
  lightboxImg.classList.remove("is-visible");

  setTimeout(() => {
    lightboxImg.src = newSrc;
    lightboxImg.alt = newAlt;

    // ensure fade-in happens after src swap
    requestAnimationFrame(() => {
      lightboxImg.classList.add("is-visible");
    });
  }, 150);
}

function showGalleryImage(index) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  animateLightboxImage(img.src, img.alt);
}

function openLightbox(index) {
  if (!hasGallery()) return;
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  if (!hasGallery()) return;
  lightbox.classList.remove("show");
  lightboxImg.classList.remove("is-visible");
  document.body.style.overflow = "";
}

if (hasGallery()) {
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  nextBtn.addEventListener("click", () => {
    showGalleryImage(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    showGalleryImage(currentIndex - 1);
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showGalleryImage(currentIndex + 1);
    if (event.key === "ArrowLeft") showGalleryImage(currentIndex - 1);
  });
}
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();
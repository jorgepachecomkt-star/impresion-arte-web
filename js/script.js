(() => {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("main section[id]");
  const upTop = document.getElementById("upTop");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const setHeaderShadow = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  const showUpTop = () => {
    if (!upTop) return;
    upTop.classList.toggle("show", window.scrollY > 500);
  };

  const onScroll = () => {
    setHeaderShadow();
    showUpTop();
    setActiveLink();
  };

  const closeMobileMenu = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", closeMobileMenu)
  );

  const setActiveLink = () => {
    const pos = window.scrollY + 120;
    let currentId = "";
    sections.forEach((section) => {
      if (pos >= section.offsetTop) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);

  upTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const galleryItems = Array.from(document.querySelectorAll(".gallery__item img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
    lightboxCaption.textContent = galleryItems[currentIndex].alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  const navigateLightbox = (dir) => {
    const next = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[next].src;
    lightboxImg.alt = galleryItems[next].alt;
    lightboxCaption.textContent = galleryItems[next].alt;
    currentIndex = next;
  };

  document.querySelectorAll(".gallery__item").forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });
  lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
      const text = encodeURIComponent(
        "Hola, Impresion-Arte\n\nQuiero solicitar una cotizacion.\n\nNombre: " + nombre +
        "\n\nCorreo: " + correo +
        "\n\nMi solicitud:\n" + mensaje +
        "\n\nEnviado desde la pagina web de Impresion-Arte."
      );
      window.open(`https://wa.me/525655454320?text=${text}`, "_blank");
    });
  }
})();
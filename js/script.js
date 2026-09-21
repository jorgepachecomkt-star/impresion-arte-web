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

  const designsGrid = document.getElementById("designsGrid");
  const designModal = document.getElementById("designModal");
  const designModalClose = document.getElementById("designModalClose");
  const designModalName = document.getElementById("designModalName");
  const designLinks = document.querySelectorAll(".design-modal__link");
  const DESIGN_PATH = "images/diseños/diseño-";
  const DESIGN_EXT = ".jpeg";
  let activeDesign = "";

  const openDesignModal = (designName) => {
    activeDesign = designName;
    designModalName.textContent = activeDesign;
    designLinks.forEach((link) => {
      const prenda = link.dataset.prenda;
      link.href =
        "https://wa.me/525655454320?text=" +
        encodeURIComponent(
          "Hola Impresion-Arte, me interesa el diseño " +
            activeDesign +
            " en prenda " +
            prenda +
            "."
        );
    });
    designModal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDesignModal = () => {
    designModal.classList.remove("open");
    document.body.style.overflow = "";
  };

  const createDesignCard = (pad) => {
    const card = document.createElement("article");
    card.className = "card reveal design-card";

    const img = document.createElement("img");
    img.src = DESIGN_PATH + pad + DESIGN_EXT;
    img.alt = "Diseño " + pad;
    img.className = "card__img";
    img.loading = "lazy";

    const body = document.createElement("div");
    body.className = "card__body";

    const title = document.createElement("h3");
    title.className = "card__title";
    title.textContent = "Diseño " + pad;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn--outline btn--sm design-card__select";
    btn.textContent = "Elegir diseño";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDesignModal("Diseño " + pad);
    });

    body.appendChild(title);
    body.appendChild(btn);
    card.appendChild(img);
    card.appendChild(body);
    return card;
  };

  const loadDesigns = () => {
    const check = (pad) => {
      const probe = new Image();
      probe.onload = () => {
        const card = createDesignCard(pad);
        designsGrid.appendChild(card);
        revealObserver.observe(card);
        check(String(Number(pad) + 1).padStart(2, "0"));
      };
      probe.src = DESIGN_PATH + pad + DESIGN_EXT;
    };
    check("01");
  };

  if (designsGrid) loadDesigns();

  if (designModal && designModalClose) {
    designModalClose.addEventListener("click", closeDesignModal);
    designModal.addEventListener("click", (e) => {
      if (e.target === designModal) closeDesignModal();
    });
  }

  designLinks.forEach((link) =>
    link.addEventListener("click", closeDesignModal)
  );

  document.addEventListener("keydown", (e) => {
    if (!designModal.classList.contains("open")) return;
    if (e.key === "Escape") closeDesignModal();
  });
})();
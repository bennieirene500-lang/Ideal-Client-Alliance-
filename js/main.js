document.addEventListener("DOMContentLoaded", () => {
  /* Existing shared mobile navigation used by the internal pages. */
  const menuButton = document.querySelector(".mobile-menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  /* Homepage knowledge-hub mobile sidebar. */
  const hubMenuButton = document.querySelector(".hub-menu-button");
  const hubSidebar = document.querySelector(".hub-sidebar");
  const hubBackdrop = document.querySelector(".hub-menu-backdrop");

  const closeHubMenu = () => {
    document.body.classList.remove("menu-open");

    if (hubMenuButton) {
      hubMenuButton.setAttribute("aria-expanded", "false");
      hubMenuButton.innerHTML = '<span aria-hidden="true">☰</span>';
    }

    if (hubBackdrop) {
      hubBackdrop.hidden = true;
    }
  };

  if (hubMenuButton && hubSidebar && hubBackdrop) {
    hubMenuButton.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      hubMenuButton.setAttribute("aria-expanded", String(isOpen));
      hubMenuButton.innerHTML = isOpen
        ? '<span aria-hidden="true">✕</span>'
        : '<span aria-hidden="true">☰</span>';
      hubBackdrop.hidden = !isOpen;
    });

    hubBackdrop.addEventListener("click", closeHubMenu);

    hubSidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeHubMenu);
    });
  }

  /*
   * YouTube embeds can show Error 153 when an HTML file is opened directly
   * from a computer because file:// pages do not send a normal web referrer.
   * On GitHub Pages the iframe is used. During local file testing we show a
   * clean clickable video poster that opens the same video on YouTube.
   */
  document.querySelectorAll(".ica-video").forEach((video) => {
    if (window.location.protocol === "file:") {
      video.classList.add("is-fallback");
    }
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});

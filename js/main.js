// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const hamburgerButton = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("active");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", "false");
      hamburgerButton.setAttribute("aria-label", "Open menu");
    }
  };

  const toggleMobileMenu = () => {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle("active");
    if (hamburgerButton) {
      hamburgerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      hamburgerButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }
  };

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", toggleMobileMenu);

    // Close on outside click
    document.addEventListener("click", (e) => {
      const clickedInside =
        mobileMenu.contains(e.target) || hamburgerButton.contains(e.target);
      if (!clickedInside) closeMobileMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });

    // Close after clicking a link
    mobileMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeMobileMenu();
    });
  }

  // FAQ accordion
  const faqContainer = document.querySelector(".faq-content");
  if (faqContainer) {
    const closeAllFaq = (exceptGroup) => {
      const groups = faqContainer.querySelectorAll(".faq-group");
      groups.forEach((group) => {
        if (group === exceptGroup) return;
        const body = group.querySelector(".faq-group-body");
        const icon = group.querySelector(".faq-group-header i");
        if (body) body.classList.remove("open");
        if (icon) {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      });
    };

    faqContainer.addEventListener("click", (e) => {
      const header = e.target.closest(".faq-group-header");
      if (!header) return;

      const group = header.closest(".faq-group");
      if (!group) return;

      const body = group.querySelector(".faq-group-body");
      const icon = header.querySelector("i");
      if (!body) return;

      const isOpen = body.classList.toggle("open");

      if (icon) {
        icon.classList.toggle("fa-plus", !isOpen);
        icon.classList.toggle("fa-minus", isOpen);
      }

      closeAllFaq(group);
    });
  }
});

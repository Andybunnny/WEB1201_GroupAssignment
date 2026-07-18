/* =========================================
   SHARED NAV BEHAVIOUR
   Include on every page: dropdown menu,
   mobile nav toggle, and theme toggle (1 of the 4 required JS features)
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Products dropdown ---------- */
  const dropdown = document.querySelector(".dropdown");
  const dropdownBtn = dropdown?.querySelector(".nav-link-btn");

  const closeDropdown = () => dropdown?.setAttribute("data-open", "false");
  const openDropdown = () => dropdown?.setAttribute("data-open", "true");

  dropdownBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.getAttribute("data-open") === "true";
    isOpen ? closeDropdown() : openDropdown();
    dropdownBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (e) => {
    if (dropdown && !dropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle?.addEventListener("click", () => {
    const isOpen = navLinks.getAttribute("data-mobile-open") === "true";
    navLinks.setAttribute("data-mobile-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  /* ---------- Theme toggle (persists via localStorage) ---------- */
  const themeToggleBtns = document.querySelectorAll(".theme-toggle");
  const root = document.documentElement;

  const SUN_ICON = `<svg viewBox="0 0 24 24" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>`;
  const MOON_ICON = `<svg viewBox="0 0 24 24" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>`;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    themeToggleBtns.forEach((btn) => {
      btn.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  };

  const savedTheme = localStorage.getItem("bakery-theme") || "light";
  applyTheme(savedTheme);

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("bakery-theme", next);
      applyTheme(next);
    });
  });

  // ===== STICKY HEADER LOGIC =====
    const headerWrapper = document.getElementById('mainHeader');
    
    if (headerWrapper) {
        // 1. Create an invisible placeholder block
        const placeholder = document.createElement('div');
        // 2. Insert it right before the header in the DOM
        headerWrapper.parentNode.insertBefore(placeholder, headerWrapper);
        
        window.addEventListener('scroll', () => {
            // Get the current height of the header
            const headerHeight = headerWrapper.offsetHeight;
            
            // 3. Trigger sticky state only after scrolling well past the header
            if (window.scrollY > headerHeight + 30) {
                // Lock the placeholder to the exact height to prevent the page from collapsing
                placeholder.style.height = `${headerHeight}px`;
                headerWrapper.classList.add('is-sticky');
                
            // 4. Reset ONLY when the user scrolls all the way back to the top
            } else if (window.scrollY <= 10) { 
                // Remove the placeholder height and the sticky class
                placeholder.style.height = '0px';
                headerWrapper.classList.remove('is-sticky');
            }
        });
    }
});
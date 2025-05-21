document.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch('/assets/components/header.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('header').innerHTML = data;
      initializeMenuToggle();
    });

  // Load footer
  fetch('/assets/components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('footer').innerHTML = data;
    });

  function initializeMenuToggle() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav-menu');
    if (menuToggle && nav) {
      menuToggle.addEventListener('change', () => {
        nav.classList.toggle('show', menuToggle.checked);
      });
    }
  }

  // Smooth scroll for anchor links
  const scrollToSection = (hash) => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  };

  // Handle anchor link clicks
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      const [path, hash] = href.split('#');
      const isHome = path === '/' || path === '' || path === '/index.html';

      if (isHome && hash) {
        scrollToSection(`#${hash}`);
        history.pushState(null, null, `/#${hash}`);
      } else {
        window.location.href = href;
      }

      const nav = document.getElementById('nav-menu');
      const menuToggle = document.getElementById('mobile-menu-toggle');
      if (nav && nav.classList.contains('show')) {
        nav.classList.remove('show');
        menuToggle.checked = false;
      }
    });
  });

  // Handle hash on page load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToSection(window.location.hash);
    }, 100);
  }

  // Scroll-to-top button
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

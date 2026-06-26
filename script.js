// The Seyi Tinubu Colloquium — interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky header state ---- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  const backdrop = document.getElementById('navBackdrop');
  const setNav = (open) => {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (backdrop) backdrop.classList.toggle('show', open);
    document.body.classList.toggle('nav-lock', open);
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  if (backdrop) backdrop.addEventListener('click', () => setNav(false));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });

  /* ---- Dropdown submenu (accordion on mobile) ---- */
  nav.querySelectorAll('.nav-dd-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dd = trigger.closest('.nav-dd');
      const expanded = dd.classList.toggle('expanded');
      trigger.setAttribute('aria-expanded', String(expanded));
    });
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Newsletter form ---- */
  const form = document.getElementById('subscribeForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      if (note) note.hidden = false;
    });
  }
});

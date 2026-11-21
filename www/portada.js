(() => {
  'use strict';

  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('menu');
  if (toggle && nav) {
    const label = toggle.querySelector('.sr-only');
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  }

  // El botón de WhatsApp de la propuesta lleva escrito el seguro elegido.
  const waButton = document.getElementById('quote-wa');
  const waBase = 'https://wa.me/34613377062?text=';
  document.querySelectorAll('input[name="tipo"]').forEach((option) => {
    option.addEventListener('change', () => {
      if (!waButton || !option.checked) return;
      const text = 'Hola, me gustaría recibir una propuesta de ' + (option.dataset.msg || 'un seguro') + '.';
      waButton.href = waBase + encodeURIComponent(text);
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

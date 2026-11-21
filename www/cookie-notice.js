(() => {
  'use strict';
  const key = 'gc_cookie_notice_v1';
  const rememberClosed = () => {
    try { localStorage.setItem(key, 'closed'); return; } catch (_) {}
    try { sessionStorage.setItem(key, 'closed'); } catch (_) {}
  };
  try { if (localStorage.getItem(key) === 'closed') return; } catch (_) {}
  try {
    if (sessionStorage.getItem(key) === 'closed') {
      rememberClosed();
      return;
    }
  } catch (_) {}
  const notice = document.createElement('section');
  notice.className = 'gc-cookie-notice';
  notice.setAttribute('aria-label', 'Información sobre cookies');
  const heading = document.createElement('h2');
  heading.textContent = 'Solo lo necesario';
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Usamos cookies técnicas para proteger el formulario. Sin analítica ni publicidad.';
  const actions = document.createElement('div');
  actions.className = 'gc-cookie-actions';
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Entendido';
  const policy = document.createElement('a');
  policy.href = '/cookies.html';
  policy.textContent = 'Política de cookies';
  actions.append(close, policy);
  notice.append(heading, paragraph, actions);
  document.body.appendChild(notice);
  document.documentElement.classList.add('gc-cookie-open');
  const dock = document.querySelector('.insurance-dock');
  const place = () => {
    const h = dock && getComputedStyle(dock).position === 'fixed' ? dock.getBoundingClientRect().height : 0;
    notice.style.setProperty('--gc-dock-height', `${Math.ceil(h)}px`);
  };
  place();
  window.addEventListener('resize', place, {passive: true});
  const observer = typeof ResizeObserver === 'function' && dock ? new ResizeObserver(place) : null;
  observer?.observe(dock);
  close.addEventListener('click', () => {
    rememberClosed();
    const hadFocus = document.activeElement === close;
    notice.remove();
    document.documentElement.classList.remove('gc-cookie-open');
    window.removeEventListener('resize', place);
    observer?.disconnect();
    if (hadFocus) {
      const main = document.querySelector('main');
      if (main) {
        if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
        main.focus({preventScroll: true});
      }
    }
  });
})();

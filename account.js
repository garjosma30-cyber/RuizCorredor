(() => {
  const access = document.querySelector("#acceso-cliente");
  const dashboard = document.querySelector("#panel-cliente");
  const loginForm = document.querySelector(".account-login-form");
  const loginNote = loginForm?.querySelector(".form-note");
  const logoutButton = document.querySelector("[data-account-logout]");
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const policySelect = document.querySelector(".renegotiation-form select");
  const renegotiationLink = document.querySelector("[data-renegotiation-link]");

  const showDashboard = () => {
    access.hidden = true;
    dashboard.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const showAccess = () => {
    dashboard.hidden = true;
    access.hidden = false;
    loginForm?.reset();
    if (loginNote) loginNote.textContent = "Sesión cerrada. Ya puedes acceder con otra cuenta.";
    if (isLocalPreview) {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("demo");
      window.history.replaceState({}, "", cleanUrl);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    loginForm?.elements.email?.focus();
  };

  // La demostración solo puede activarse en el servidor local de desarrollo.
  const isLocalPreview = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  if (isLocalPreview && new URLSearchParams(window.location.search).get("demo") === "cliente") {
    showDashboard();
  }

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }
    loginNote.textContent = "La autenticación se conectará al servidor seguro antes de publicar. No se ha enviado ningún dato.";
    if (isLocalPreview) showDashboard();
  });

  logoutButton?.addEventListener("click", showAccess);

  const activateTab = (selected) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.querySelector(`#${tab.getAttribute("aria-controls")}`).hidden = !active;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(tabs.indexOf(tab) + direction + tabs.length) % tabs.length];
      activateTab(next);
      next.focus();
    });
  });

  policySelect?.addEventListener("change", () => {
    const query = new URLSearchParams({
      motivo: "renegociacion",
      poliza: policySelect.value,
      nombre: "María Ruiz López",
    });
    renegotiationLink.href = `contacto.html?${query}`;
  });
})();

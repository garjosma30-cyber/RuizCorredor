const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
const WHATSAPP_URL = "https://wa.me/34613377062?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20sobre%20seguros.";

document.querySelectorAll(".budget-fab").forEach((button) => button.remove());

let whatsappFab = document.querySelector(".whatsapp-fab");
if (!whatsappFab) {
  whatsappFab = document.createElement("a");
  whatsappFab.className = "whatsapp-fab";
  document.body.appendChild(whatsappFab);
}

const whatsappAvatarStyles = document.createElement("style");
whatsappAvatarStyles.textContent = `
  .whatsapp-fab.whatsapp-fab--portrait {
    width: 72px;
    height: 72px;
    min-height: 72px;
    padding: 0;
    gap: 0;
    overflow: visible;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 15px 34px rgba(20, 32, 52, 0.3);
    animation: none;
    isolation: isolate;
  }

  .whatsapp-fab.whatsapp-fab--portrait .whatsapp-portrait {
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: cover;
    object-position: 50% 34%;
    border-radius: 50%;
  }

  .whatsapp-fab.whatsapp-fab--portrait .whatsapp-badge {
    position: absolute;
    right: -5px;
    bottom: -4px;
    display: grid;
    width: 29px;
    height: 29px;
    place-items: center;
    color: #fff;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #25d366;
    box-shadow: 0 5px 12px rgba(18, 140, 75, 0.38);
  }

  .whatsapp-fab.whatsapp-fab--portrait .whatsapp-badge svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .whatsapp-fab.whatsapp-fab--portrait .fab-label {
    position: absolute;
    top: 50%;
    right: 82px;
    max-width: none;
    overflow: visible;
    padding: 8px 11px;
    color: #fff;
    border-radius: 10px;
    background: rgba(23, 23, 36, 0.94);
    box-shadow: 0 8px 22px rgba(7, 8, 16, 0.2);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(8px, -50%);
    transition: opacity 0.2s ease, transform 0.2s ease;
    font-size: 0.8rem;
    font-weight: 750;
    white-space: nowrap;
  }

  .whatsapp-fab.whatsapp-fab--portrait:hover,
  .whatsapp-fab.whatsapp-fab--portrait:focus-visible {
    gap: 0;
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 19px 42px rgba(20, 32, 52, 0.4);
  }

  .whatsapp-fab.whatsapp-fab--portrait:hover .fab-label,
  .whatsapp-fab.whatsapp-fab--portrait:focus-visible .fab-label {
    max-width: none;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -50%);
  }

  @media (max-width: 640px) {
    .whatsapp-fab.whatsapp-fab--portrait {
      right: 14px;
      width: 62px;
      height: 62px;
      min-height: 62px;
    }

    .whatsapp-fab.whatsapp-fab--portrait .fab-label {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .whatsapp-fab.whatsapp-fab--portrait,
    .whatsapp-fab.whatsapp-fab--portrait .fab-label {
      transition: none;
    }
  }
`;
document.head.appendChild(whatsappAvatarStyles);

const whatsappPortrait = document.createElement("img");
whatsappPortrait.className = "whatsapp-portrait";
whatsappPortrait.src = "assets/retrato-jose-garcia.jpg";
whatsappPortrait.alt = "";
whatsappPortrait.width = 72;
whatsappPortrait.height = 72;

const whatsappBadge = document.createElement("span");
whatsappBadge.className = "whatsapp-badge";
whatsappBadge.setAttribute("aria-hidden", "true");
whatsappBadge.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.3-4.1A8 8 0 1 1 20 11.6Z"></path><path d="M9 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.6 1.8 2.5 3.4 3.2l.7-.8c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .4-.2 1.3-.8 1.8-.5.5-1.3.8-2.4.5-1.3-.3-3.1-1.1-4.8-2.7-1.4-1.3-2.4-3.1-2.7-4.3-.3-1 .1-1.6.5-2Z"></path></svg>';

const whatsappLabel = document.createElement("span");
whatsappLabel.className = "fab-label";
whatsappLabel.textContent = "¿Hablamos por WhatsApp?";

whatsappFab.classList.add("whatsapp-fab--portrait");
whatsappFab.replaceChildren(whatsappPortrait, whatsappBadge, whatsappLabel);
whatsappFab.href = WHATSAPP_URL;
whatsappFab.target = "_blank";
whatsappFab.rel = "noopener noreferrer";
whatsappFab.title = "Hablar con José por WhatsApp";
whatsappFab.setAttribute("aria-label", "Hablar con José por WhatsApp en el 613 377 062");

const placeholderLinks = document.querySelectorAll("[data-placeholder-link]");
const whatsappLinks = document.querySelectorAll(".whatsapp-fab");

if (year) {
  year.textContent = new Date().getFullYear();
}

whatsappLinks.forEach((link) => link.setAttribute("title", "WhatsApp"));

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      navToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
      navToggle.focus();
    }
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    }
  });
}

if (form && formNote) {
  const query = new URLSearchParams(window.location.search);
  const nameField = form.elements.nombre;
  const emailField = form.elements.email;
  const messageField = form.elements.mensaje;
  const privacyField = form.elements.privacidad;
  const csrfField = form.elements.csrf;
  const startedAtField = form.elements.form_started_at;
  const submitButton = form.querySelector('[type="submit"]');
  const submitLabel = form.querySelector("[data-submit-label]");
  const submitProgress = form.querySelector("[data-submit-progress]");
  const messageCount = form.querySelector("[data-message-count]");
  const errorMap = {
    nombre: form.querySelector("#contact-name-error"),
    email: form.querySelector("#contact-email-error"),
    mensaje: form.querySelector("#contact-message-error"),
    privacidad: form.querySelector("#contact-privacy-error"),
  };

  function setStatus(message, state = "") {
    formNote.textContent = message;
    if (state) formNote.dataset.state = state;
    else delete formNote.dataset.state;
  }

  function clearErrors() {
    Object.values(errorMap).forEach((element) => {
      if (element) element.textContent = "";
    });
    [nameField, emailField, messageField, privacyField].forEach((field) => {
      field?.removeAttribute("aria-invalid");
    });
  }

  function setError(fieldName, message) {
    const field = form.elements[fieldName];
    const error = errorMap[fieldName];
    if (error) error.textContent = message;
    field?.setAttribute("aria-invalid", "true");
  }

  function updateMessageCount() {
    if (messageCount && messageField) {
      messageCount.textContent = new Intl.NumberFormat("es-ES").format(messageField.value.length);
    }
  }

  async function loadContactToken(showError = true) {
    try {
      const response = await fetch("contacto-token.php", {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error("No se pudo iniciar el formulario");
      const data = await response.json();
      if (!data.csrf || !data.started_at) throw new Error("Respuesta incompleta");
      csrfField.value = data.csrf;
      startedAtField.value = data.started_at;
      return true;
    } catch {
      if (showError) {
        setStatus("No se ha podido preparar el envío. Recarga la página o escríbenos por correo.", "error");
      }
      return false;
    }
  }

  function validateForm() {
    clearErrors();
    const invalidFields = [];
    const name = nameField?.value.trim() || "";
    const message = messageField?.value.trim() || "";

    if (name.length < 2 || name.length > 100) {
      setError("nombre", "Escribe un nombre de entre 2 y 100 caracteres.");
      invalidFields.push(nameField);
    }
    if (!emailField?.value || !emailField.validity.valid) {
      setError("email", "Escribe una dirección de correo válida.");
      invalidFields.push(emailField);
    }
    if (message.length > 1500) {
      setError("mensaje", "El mensaje no puede superar los 1.500 caracteres.");
      invalidFields.push(messageField);
    }
    if (!privacyField?.checked) {
      setError("privacidad", "Debes aceptar la información de privacidad para enviar la consulta.");
      invalidFields.push(privacyField);
    }

    if (invalidFields.length) {
      setStatus("Revisa los campos señalados antes de enviar.", "error");
      invalidFields[0]?.focus();
      return false;
    }
    return true;
  }

  if (query.get("nombre") && nameField) nameField.value = query.get("nombre");

  messageField?.addEventListener("input", updateMessageCount);
  form.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLElement) || !field.getAttribute("name")) return;
    const error = errorMap[field.getAttribute("name")];
    if (error) error.textContent = "";
    field.removeAttribute("aria-invalid");
  });

  updateMessageCount();
  loadContactToken();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (!csrfField.value || !startedAtField.value) {
      const ready = await loadContactToken();
      if (!ready) return;
    }

    form.setAttribute("aria-busy", "true");
    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.hidden = true;
    if (submitProgress) submitProgress.hidden = false;
    setStatus("Enviando la consulta de forma segura…", "loading");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        Object.entries(data.errors || {}).forEach(([fieldName, message]) => setError(fieldName, message));
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        throw new Error(data.message || "No se ha podido enviar la consulta.");
      }

      form.reset();
      updateMessageCount();
      clearErrors();
      setStatus(data.message || "Consulta recibida. Te responderemos lo antes posible.", "success");
      await loadContactToken(false);
    } catch (error) {
      if (formNote.dataset.state !== "success") {
        setStatus(error.message || "No se ha podido enviar la consulta. Inténtalo de nuevo.", "error");
      }
    } finally {
      form.removeAttribute("aria-busy");
      if (submitButton) submitButton.disabled = false;
      if (submitLabel) submitLabel.hidden = false;
      if (submitProgress) submitProgress.hidden = true;
    }
  });
}

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

// Animación de aparición al hacer scroll (respeta prefers-reduced-motion vía CSS)
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Mantiene visible en la botonera el seguro correspondiente a la sección actual.
const insuranceTabs = [...document.querySelectorAll("[data-insurance-tab]")];
const insuranceTabTargets = insuranceTabs
  .map((tab) => {
    const selector = tab.getAttribute("href");
    return selector?.startsWith("#") ? { tab, target: document.querySelector(selector) } : null;
  })
  .filter((item) => item?.target);

if (insuranceTabTargets.length) {
  let insuranceTabsTicking = false;

  const updateInsuranceTab = () => {
    const viewportAnchor = Math.min(190, Math.max(110, window.innerHeight * 0.22));
    const readingLine = window.scrollY + viewportAnchor;
    let activeItem = null;

    insuranceTabTargets
      .map((item) => ({
        ...item,
        documentTop: item.target.getBoundingClientRect().top + window.scrollY,
      }))
      .sort((a, b) => a.documentTop - b.documentTop)
      .forEach((item) => {
        if (item.documentTop <= readingLine) activeItem = item;
      });

    const distanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    if (distanceToBottom <= 64) {
      activeItem = insuranceTabTargets.find(({ tab }) => tab.getAttribute("href") === "#mas-seguros") || activeItem;
    }

    insuranceTabTargets.forEach(({ tab }) => {
      const isActive = tab === activeItem?.tab;
      tab.classList.toggle("is-active", isActive);
      if (isActive) tab.setAttribute("aria-current", "location");
      else tab.removeAttribute("aria-current");
    });

    insuranceTabsTicking = false;
  };

  const requestInsuranceTabUpdate = () => {
    if (insuranceTabsTicking) return;
    insuranceTabsTicking = true;
    window.requestAnimationFrame(updateInsuranceTab);
  };

  window.addEventListener("scroll", requestInsuranceTabUpdate, { passive: true });
  window.addEventListener("resize", requestInsuranceTabUpdate);
  window.addEventListener("hashchange", requestInsuranceTabUpdate);
  insuranceTabs.forEach((tab) => tab.addEventListener("click", () => {
    insuranceTabs.forEach((item) => item.removeAttribute("aria-current"));
    tab.setAttribute("aria-current", "location");
  }));
  updateInsuranceTab();
}

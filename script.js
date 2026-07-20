const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
// Añadir aquí la dirección externa cuando el canal de denuncias esté disponible.
const REPORTING_CHANNEL_URL = "";

const complaintsLink = document.querySelector('.footer-links a[href="reclamaciones.html"]');
if (complaintsLink) {
  const reportingLink = document.createElement("a");
  reportingLink.className = "reporting-channel-link";
  reportingLink.textContent = "Canal de denuncias ↗";

  if (REPORTING_CHANNEL_URL) {
    reportingLink.href = REPORTING_CHANNEL_URL;
    reportingLink.target = "_blank";
    reportingLink.rel = "noopener noreferrer";
  } else {
    reportingLink.href = "#";
    reportingLink.dataset.placeholderLink = "";
    reportingLink.setAttribute("aria-disabled", "true");
    reportingLink.title = "Enlace externo pendiente de habilitar";
  }

  complaintsLink.insertAdjacentElement("afterend", reportingLink);
}

const placeholderLinks = document.querySelectorAll("[data-placeholder-link]");
const whatsappLinks = document.querySelectorAll(".whatsapp-fab-image");

const COOKIE_CONSENT_KEY = "ruiz-corredor-cookie-consent-v1";
const CONSTRUCTION_NOTICE_KEY = "ruiz-corredor-construction-notice-v1";

function createConstructionNotice(onClose) {
  try {
    if (sessionStorage.getItem(CONSTRUCTION_NOTICE_KEY)) {
      onClose();
      return;
    }
  } catch {
    // Si el navegador bloquea el almacenamiento, el aviso se muestra igualmente.
  }

  const notice = document.createElement("div");
  notice.className = "construction-notice";
  notice.setAttribute("role", "dialog");
  notice.setAttribute("aria-modal", "true");
  notice.setAttribute("aria-labelledby", "construction-notice-title");
  notice.setAttribute("aria-describedby", "construction-notice-description");
  notice.innerHTML = `
    <div class="construction-notice-panel">
      <div class="construction-notice-icon" aria-hidden="true">!</div>
      <div class="construction-notice-copy">
        <p class="construction-notice-kicker">Aviso importante</p>
        <h2 id="construction-notice-title">Página en construcción</h2>
        <p id="construction-notice-description">No se debe considerar su contenido a efectos contractuales.</p>
      </div>
      <button class="cookie-button cookie-button-primary construction-notice-button" type="button">Entendido</button>
    </div>`;

  document.body.appendChild(notice);
  document.body.classList.add("construction-notice-open");

  const closeButton = notice.querySelector(".construction-notice-button");
  closeButton.focus();

  function closeNotice() {
    try {
      sessionStorage.setItem(CONSTRUCTION_NOTICE_KEY, "acknowledged");
    } catch {
      // La navegación sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
    notice.classList.add("is-closing");
    document.body.classList.remove("construction-notice-open");
    window.setTimeout(() => {
      notice.remove();
      onClose();
    }, 180);
  }

  closeButton.addEventListener("click", closeNotice);
  notice.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNotice();
  });
}

function readCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveCookieConsent(preferences) {
  try {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ ...preferences, savedAt: new Date().toISOString() })
    );
  } catch {
    // La web sigue siendo utilizable aunque el navegador bloquee el almacenamiento local.
  }
}

function createCookieConsent() {
  if (readCookieConsent()) return;

  const consent = document.createElement("div");
  consent.className = "cookie-consent";
  consent.setAttribute("role", "dialog");
  consent.setAttribute("aria-modal", "false");
  consent.setAttribute("aria-labelledby", "cookie-consent-title");
  consent.innerHTML = `
    <div class="cookie-consent-panel">
      <div class="cookie-consent-copy">
        <p class="cookie-kicker">Tu privacidad</p>
        <h2 id="cookie-consent-title">Tú decides qué cookies permites</h2>
        <p>Usamos las cookies necesarias para que la web funcione. Las cookies de análisis y personalización solo se activarán si las autorizas.</p>
        <a href="cookies.html">Consultar la política de cookies</a>
      </div>
      <div class="cookie-preferences" hidden>
        <label><span><strong>Necesarias</strong><small>Imprescindibles para el funcionamiento y la seguridad.</small></span><input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas"></label>
        <label><span><strong>Análisis</strong><small>Nos ayudarán a entender el uso de la web.</small></span><input id="cookie-analytics" type="checkbox"></label>
        <label><span><strong>Personalización</strong><small>Permitirán recordar preferencias no esenciales.</small></span><input id="cookie-personalization" type="checkbox"></label>
      </div>
      <div class="cookie-consent-actions">
        <button class="cookie-button cookie-button-secondary" type="button" data-cookie-action="reject">Rechazar</button>
        <button class="cookie-button cookie-button-secondary" type="button" data-cookie-action="settings" aria-expanded="false">Configurar</button>
        <button class="cookie-button cookie-button-primary" type="button" data-cookie-action="accept">Aceptar todas</button>
        <button class="cookie-button cookie-button-primary cookie-save" type="button" data-cookie-action="save" hidden>Guardar selección</button>
      </div>
    </div>`;

  document.body.appendChild(consent);
  document.body.classList.add("cookie-consent-open");

  const settings = consent.querySelector('[data-cookie-action="settings"]');
  const preferences = consent.querySelector(".cookie-preferences");
  const saveButton = consent.querySelector('[data-cookie-action="save"]');

  function closeConsent(choice) {
    saveCookieConsent(choice);
    consent.classList.add("is-closing");
    document.body.classList.remove("cookie-consent-open");
    window.setTimeout(() => consent.remove(), 180);
  }

  consent.addEventListener("click", (event) => {
    const action = event.target.closest("[data-cookie-action]")?.dataset.cookieAction;
    if (!action) return;

    if (action === "accept") {
      closeConsent({ necessary: true, analytics: true, personalization: true });
    } else if (action === "reject") {
      closeConsent({ necessary: true, analytics: false, personalization: false });
    } else if (action === "settings") {
      const opening = preferences.hidden;
      preferences.hidden = !opening;
      saveButton.hidden = !opening;
      settings.setAttribute("aria-expanded", String(opening));
      settings.textContent = opening ? "Ocultar opciones" : "Configurar";
    } else if (action === "save") {
      closeConsent({
        necessary: true,
        analytics: consent.querySelector("#cookie-analytics").checked,
        personalization: consent.querySelector("#cookie-personalization").checked,
      });
    }
  });

}

if (year) {
  year.textContent = new Date().getFullYear();
}

whatsappLinks.forEach((link) => link.setAttribute("title", "Contacto"));

createConstructionNotice(createCookieConsent);

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("is-open");
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    }
  });
}

if (form && formNote) {
  const query = new URLSearchParams(window.location.search);
  const reason = query.get("motivo");
  const nameField = form.elements.nombre;
  const emailField = form.elements.email;
  const reasonField = form.elements.motivo;
  const policyField = form.elements.poliza;
  const messageField = form.elements.mensaje;
  const privacyField = form.elements.privacidad;
  const policyLabel = policyField?.closest("label");
  const messageCount = form.querySelector("[data-message-count]");
  const errorMap = {
    nombre: form.querySelector("#contact-name-error"),
    email: form.querySelector("#contact-email-error"),
    motivo: form.querySelector("#contact-reason-error"),
    poliza: form.querySelector("#contact-policy-error"),
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
    [nameField, emailField, reasonField, policyField, messageField, privacyField].forEach((field) => {
      field?.removeAttribute("aria-invalid");
    });
  }

  function setError(fieldName, message) {
    const field = form.elements[fieldName];
    const error = errorMap[fieldName];
    if (error) error.textContent = message;
    field?.setAttribute("aria-invalid", "true");
  }

  function updatePolicyField() {
    const isRenegotiation = reasonField?.value === "renegociacion";
    if (policyLabel) policyLabel.hidden = !isRenegotiation;
    if (policyField) {
      policyField.required = isRenegotiation;
      if (!isRenegotiation) {
        policyField.value = "";
        policyField.removeAttribute("aria-invalid");
        if (errorMap.poliza) errorMap.poliza.textContent = "";
      }
    }
  }

  function updateMessageCount() {
    if (messageCount && messageField) {
      messageCount.textContent = new Intl.NumberFormat("es-ES").format(messageField.value.length);
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
    if (!reasonField?.value) {
      setError("motivo", "Selecciona el motivo general de la consulta.");
      invalidFields.push(reasonField);
    }
    if (reasonField?.value === "renegociacion" && !policyField?.value.trim()) {
      setError("poliza", "Indica el número de póliza.");
      invalidFields.push(policyField);
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
  if (reason && reasonField && [...reasonField.options].some((option) => option.value === reason)) {
    reasonField.value = reason;
  }
  if (reason === "renegociacion" && policyField && policyLabel) {
    policyLabel.hidden = false;
    policyField.required = true;
    policyField.value = query.get("poliza") || "";
  }

  reasonField?.addEventListener("change", updatePolicyField);
  messageField?.addEventListener("input", updateMessageCount);
  form.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLElement) || !field.getAttribute("name")) return;
    const error = errorMap[field.getAttribute("name")];
    if (error) error.textContent = "";
    field.removeAttribute("aria-invalid");
  });

  updatePolicyField();
  updateMessageCount();
  setStatus("Al enviar se abrirá tu aplicación de correo con la consulta preparada.");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const reasonLabel = reasonField?.options[reasonField.selectedIndex]?.text || "Consulta general";
    const body = [
      `Nombre: ${nameField.value.trim()}`,
      `Email: ${emailField.value.trim()}`,
      `Motivo: ${reasonLabel}`,
      policyField?.value.trim() ? `Póliza: ${policyField.value.trim()}` : "",
      "",
      messageField?.value.trim() || "Sin mensaje adicional.",
    ].filter((line, index, lines) => line || (index > 0 && lines[index - 1])).join("\n");

    const mailto = new URL("mailto:contacto@ruizcorredor.com");
    mailto.searchParams.set("subject", `Consulta web: ${reasonLabel}`);
    mailto.searchParams.set("body", body);
    setStatus("Abriendo tu aplicación de correo…", "success");
    window.location.href = mailto.toString();
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

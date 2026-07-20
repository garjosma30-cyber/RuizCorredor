const quoteProducts = {
  microempresa: {
    base: [30, 65],
    period: "al mes",
    factorLabel: "Dimensión aproximada",
    factors: [
      ["solo", "Autónomo sin empleados", 0.85],
      ["small", "Local o equipo de 1–3 personas", 1],
      ["medium", "Equipo de 4–10 personas", 1.45]
    ],
    coverages: [
      "Daños del local, equipos y mercancía",
      "Responsabilidad civil de la actividad",
      "Pérdida de beneficios y continuidad"
    ],
    review: "Actividad exacta, facturación, capitales, ubicación, medidas de seguridad y coberturas que ya tienes."
  },
  "alquiler-propietario": {
    base: [190, 390],
    period: "al año",
    factorLabel: "Renta mensual aproximada",
    factors: [
      ["low", "Hasta 700 €", 0.82],
      ["medium", "Entre 701 y 1.200 €", 1],
      ["high", "Más de 1.200 €", 1.32]
    ],
    coverages: [
      "Impago de rentas y defensa jurídica",
      "Daños al inmueble y actos vandálicos",
      "Responsabilidad civil del propietario"
    ],
    review: "Renta, duración del contrato, perfil de solvencia, continente asegurado, carencias y límites de mensualidades."
  },
  "alquiler-inquilino": {
    base: [8, 22],
    period: "al mes",
    factorLabel: "Valor aproximado de tus pertenencias",
    factors: [
      ["low", "Hasta 15.000 €", 0.85],
      ["medium", "Entre 15.001 y 35.000 €", 1],
      ["high", "Más de 35.000 €", 1.35]
    ],
    coverages: [
      "Contenido y pertenencias personales",
      "Responsabilidad civil como inquilino",
      "Asistencia y defensa jurídica"
    ],
    review: "Valor del contenido, características de la vivienda, responsabilidad exigida en el contrato y seguros existentes."
  },
  salud: {
    base: [55, 125],
    period: "al mes",
    factorLabel: "Tramo de edad",
    factors: [
      ["young", "18–35 años", 0.78],
      ["adult", "36–50 años", 1],
      ["senior", "51–65 años", 1.38],
      ["older", "Más de 65 años", 1.8]
    ],
    coverages: [
      "Cuadro médico y acceso a especialistas",
      "Hospitalización y pruebas diagnósticas",
      "Revisión expresa de carencias y exclusiones"
    ],
    review: "La horquilla no incorpora el efecto de antecedentes médicos. La entidad puede aplicar exclusiones, sobreprima o no aceptar la solicitud."
  },
  hogar: {
    base: [120, 285],
    period: "al año",
    factorLabel: "Tipo de vivienda",
    factors: [
      ["flat", "Piso de hasta 100 m²", 0.88],
      ["large-flat", "Piso de más de 100 m²", 1],
      ["house", "Casa o vivienda unifamiliar", 1.42]
    ],
    coverages: [
      "Continente, contenido y daños por agua",
      "Responsabilidad civil familiar",
      "Asistencia, robo y defensa jurídica"
    ],
    review: "Metros, año de construcción, capitales, uso de la vivienda, ubicación, medidas de seguridad y franquicias."
  },
  auto: {
    base: [290, 720],
    period: "al año",
    factorLabel: "Uso principal del vehículo",
    factors: [
      ["occasional", "Ocasional y pocos kilómetros", 0.82],
      ["daily", "Uso diario", 1],
      ["professional", "Uso profesional frecuente", 1.38]
    ],
    coverages: [
      "Responsabilidad civil y defensa",
      "Asistencia desde el kilómetro adecuado",
      "Daños propios, lunas, robo e incendio"
    ],
    review: "Vehículo, conductor, antigüedad del permiso, historial, kilómetros, garaje y modalidad de reparación."
  },
  vida: {
    base: [95, 275],
    period: "al año",
    factorLabel: "Capital orientativo",
    factors: [
      ["low", "Hasta 50.000 €", 0.82],
      ["medium", "Entre 50.001 y 150.000 €", 1],
      ["high", "Más de 150.000 €", 1.5]
    ],
    coverages: [
      "Fallecimiento y capital adecuado",
      "Invalidez y accidentes",
      "Beneficiarios y protección familiar"
    ],
    review: "Edad, capital, profesión, hábitos, situación familiar y cuestionario de salud. La aceptación depende de la entidad."
  },
  viaje: {
    base: [28, 90],
    period: "por viaje",
    factorLabel: "Duración y destino",
    factors: [
      ["short-eu", "Hasta 7 días en Europa", 0.78],
      ["long-eu", "8–21 días en Europa", 1],
      ["world", "Fuera de Europa", 1.48]
    ],
    coverages: [
      "Asistencia médica en destino",
      "Cancelación e interrupción",
      "Equipaje, demoras y repatriación"
    ],
    review: "Destino, duración, coste del viaje, actividades, enfermedades previas y límites médicos necesarios."
  }
};

const quoteLevels = {
  essential: { label: "Cobertura esencial", factor: 0.82, marker: "18%" },
  balanced: { label: "Cobertura equilibrada", factor: 1, marker: "50%" },
  broad: { label: "Cobertura amplia", factor: 1.36, marker: "84%" }
};

const quoteExcess = {
  high: 0.86,
  medium: 1,
  low: 1.17
};

const quoteForm = document.querySelector("#quote-form");
const quoteProduct = document.querySelector("#quote-product");
const quoteFactor = document.querySelector("#quote-factor");
const quoteFactorLabel = document.querySelector("#quote-factor-label");
const quoteLevel = document.querySelector("#quote-level");
const quoteExcessField = document.querySelector("#quote-excess");
const quoteMin = document.querySelector("#quote-min");
const quoteMax = document.querySelector("#quote-max");
const quotePeriod = document.querySelector("#quote-period");
const quoteLevelBadge = document.querySelector("#quote-level-badge");
const quoteMarker = document.querySelector("#quote-marker");
const quoteCoverages = document.querySelector("#quote-coverages");
const quoteReview = document.querySelector("#quote-review");
const quotePrint = document.querySelector("#quote-print");

function roundToFive(value) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function populateFactors() {
  const product = quoteProducts[quoteProduct.value];
  quoteFactorLabel.textContent = product.factorLabel;
  quoteFactor.replaceChildren();

  product.factors.forEach(([value, label, factor]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.dataset.factor = String(factor);
    quoteFactor.append(option);
  });

  if (product.factors.length > 1) {
    quoteFactor.selectedIndex = 1;
  }
}

function calculateQuote() {
  const product = quoteProducts[quoteProduct.value];
  const level = quoteLevels[quoteLevel.value];
  const selectedFactor = quoteFactor.options[quoteFactor.selectedIndex];
  const dimensionFactor = Number(selectedFactor?.dataset.factor || 1);
  const excessFactor = quoteExcess[quoteExcessField.value];

  const minimum = roundToFive(product.base[0] * dimensionFactor * level.factor * excessFactor);
  const maximum = roundToFive(product.base[1] * dimensionFactor * level.factor * excessFactor);

  quoteMin.textContent = minimum.toLocaleString("es-ES");
  quoteMax.textContent = maximum.toLocaleString("es-ES");
  quotePeriod.textContent = product.period;
  quoteLevelBadge.textContent = level.label;
  quoteMarker.style.left = level.marker;
  quoteReview.textContent = product.review;

  quoteCoverages.replaceChildren();
  product.coverages.forEach((coverage) => {
    const item = document.createElement("li");
    item.textContent = coverage;
    quoteCoverages.append(item);
  });
}

quoteProduct.addEventListener("change", () => {
  populateFactors();
  calculateQuote();
});

[quoteFactor, quoteLevel, quoteExcessField].forEach((field) => {
  field.addEventListener("change", calculateQuote);
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateQuote();
});

quotePrint.addEventListener("click", () => window.print());

populateFactors();
calculateQuote();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("output").innerText = "Geolocalização não suportada.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  document.getElementById("output").innerText = `Você está em: ${lat}, ${lon}\nBuscando curiosidades sobre BTS...`;

  let curiosidade = "";

  if (lat < 0 && lon < -30) {
    curiosidade = "🇧🇷 O BTS já mencionou o Brasil como um dos países com fãs mais apaixonados!";
  } else if (lat > 35 && lon > 125) {
    curiosidade = "🇰🇷 RM fará discurso sobre cultura coreana na Cúpula da APEC em 2025.";
  } else if (lat > 25 && lat < 50 && lon > -125 && lon < -70) {
    curiosidade = "🇺🇸 O BTS venceu prêmios como o Billboard Music Awards e fez turnês históricas nos EUA.";
  } else {
    curiosidade = "🌍 O BTS tem fãs apaixonados em todos os cantos do mundo!";
  }

  document.getElementById("output").innerHTML += `<p>${curiosidade}</p>`;

  // Nova chamada para obter o conteúdo completo da introdução
  fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=true&explaintext=true&titles=BTS`)
    .then(response => response.json())
    .then(data => {
      const pages = data.query.pages;
      const page = pages[Object.keys(pages)[0]];
      const extract = page.extract;
      const url = `https://en.wikipedia.org/wiki/BTS`;

      document.getElementById("output").innerHTML += `
        <h2>${page.title}</h2>
        <p>${extract}</p>
        <a href="${url}" target="_blank">🔗 Leia mais na Wikipedia</a>
      `;
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado!"));
}
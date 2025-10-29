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

  fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=BTS`)
    .then(response => response.json())
    .then(data => {
      const result = data.query.search[0];
      const title = result.title;
      const snippet = result.snippet;
      const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

      document.getElementById("output").innerHTML += `
        <h2>${title}</h2>
        <p>${snippet}...</p>
        <a href="${url}" target="_blank">Leia mais na Wikipedia</a>
      `;
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado!"));
}
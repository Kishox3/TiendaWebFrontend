export function renderizar() {
  document.getElementById("contenido-principal").innerHTML = `
    <h2 class="mb-4">📊 Reportes</h2>

    <div class="mb-4">
      <h5>🏷️ Marcas con ventas</h5>
      <ul id="reporte-marcas" class="list-group"></ul>
    </div>

    <div class="mb-4">
      <h5>📦 Stock restante por prenda</h5>
      <ul id="reporte-stock" class="list-group"></ul>
    </div>

    <div class="mb-4">
      <h5>🔥 Top 5 marcas más vendidas</h5>
      <ul id="reporte-top5" class="list-group"></ul>
    </div>
  `;

  fetch("${API_BASE_URL}/reportes/marcas-con-ventas")
    .then(r => r.json())
    .then(data => {
      const ul = document.getElementById("reporte-marcas");
      data.forEach(m => {
        ul.innerHTML += `<li class="list-group-item">${m}</li>`;
      });
    });

  fetch("${API_BASE_URL}/reportes/prendas-stock")
    .then(r => r.json())
    .then(data => {
      const ul = document.getElementById("reporte-stock");
      data.forEach(p => {
        ul.innerHTML += `<li class="list-group-item">${p.prenda}: ${p.stockRestante} unidades</li>`;
      });
    });

  fetch("${API_BASE_URL}/reportes/top5-marcas")
    .then(r => r.json())
    .then(data => {
      const ul = document.getElementById("reporte-top5");
      data.forEach(p => {
        ul.innerHTML += `<li class="list-group-item">${p.marca}: ${p.ventas} ventas</li>`;
      });
    });
}

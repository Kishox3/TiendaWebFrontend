export function renderizar() {
  fetch("http://localhost:5000/tienda/api/v1/prendas")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">👕 Prendas</h2>
        <button class="btn btn-primary mb-3" onclick="alert('Formulario de prendas en construcción')">➕ Nueva Prenda</button>
        <table class="table table-bordered table-striped">
          <thead><tr><th>Nombre</th><th>Marca</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
          <tbody>
      `;
      data.forEach(p => {
        html += `
          <tr>
            <td>${p.nombre}</td>
            <td>${p.marca?.nombre || 'N/A'}</td>
            <td>${p.precio}</td>
            <td>${p.cantidad_stock}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1">Editar</button>
              <button class="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        `;
      });
      html += `</tbody></table>`;

      document.getElementById("contenido-principal").innerHTML = html;
    })
    .catch(err => {
      console.error("Error al obtener prendas", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar prendas</p>
      `;
    });
}

export function renderizar() {
  fetch("http://localhost:5000/tienda/api/v1/marcas")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">🏷️ Marcas</h2>
        <button class="btn btn-primary mb-3" onclick="alert('Formulario de marcas en construcción')">➕ Nueva Marca</button>
        <table class="table table-bordered table-striped">
          <thead><tr><th>Nombre</th><th>País</th><th>Acciones</th></tr></thead>
          <tbody>
      `;
      data.forEach(m => {
        html += `
          <tr>
            <td>${m.nombre}</td>
            <td>${m.pais}</td>
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
      console.error("Error al obtener marcas", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar marcas</p>
      `;
    });
}

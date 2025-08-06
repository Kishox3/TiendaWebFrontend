export function renderizar() {
  fetch("http://localhost:5000/tienda/api/v1/ventas")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">💰 Ventas</h2>
        <button class="btn btn-primary mb-3" onclick="alert('Formulario de ventas en construcción')">➕ Nueva Venta</button>
        <table class="table table-bordered table-striped">
          <thead><tr><th>Prenda</th><th>Usuario</th><th>Fecha</th><th>Cantidad</th><th>Total</th><th>Acciones</th></tr></thead>
          <tbody>
      `;
      data.forEach(v => {
        html += `
          <tr>
            <td>${v.prenda?.nombre || 'N/A'}</td>
            <td>${v.usuario?.username || 'N/A'}</td>
            <td>${new Date(v.fecha_venta).toLocaleDateString()}</td>
            <td>${v.cantidad}</td>
            <td>${v.total}</td>
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
      console.error("Error al obtener ventas", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar ventas</p>
      `;
    });
}

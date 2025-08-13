export function renderizar() {
  // Primero obtenemos las marcas para el select
  fetch("${API_BASE_URL}/marcas")
    .then(res => res.json())
    .then(marcas => {
      fetch("${API_BASE_URL}/prendas")
        .then(res => res.json())
        .then(data => {
          let html = `
            <h2 class="mb-4">👕 Prendas</h2>
            <form id="form-prenda" class="row g-3 mb-4">
              <div class="col-md-3">
                <input required name="nombre" class="form-control" placeholder="Nombre de la prenda">
              </div>
              <div class="col-md-3">
                <select required name="marca" class="form-select">
                  <option value="">Marca...</option>
                  ${marcas.map(m => `<option value="${m._id}">${m.nombre}</option>`).join("")}
                </select>
              </div>
              <div class="col-md-2">
                <input required name="precio" type="number" min="0" step="0.01" class="form-control" placeholder="Precio">
              </div>
              <div class="col-md-2">
                <input required name="cantidad_stock" type="number" min="0" class="form-control" placeholder="Stock">
              </div>
              <div class="col-md-2 d-grid">
                <button class="btn btn-success" type="submit">Agregar</button>
              </div>
            </form>
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
                  <button class="btn btn-sm btn-warning me-1" onclick="editarPrenda('${p._id}', '${p.nombre}', '${p.marca?._id}', '${p.precio}', '${p.cantidad_stock}')">Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarPrenda('${p._id}')">Eliminar</button>
                </td>
              </tr>
            `;
          });
          html += `</tbody></table>`;

          document.getElementById("contenido-principal").innerHTML = html;

          // Manejar submit del formulario
          document.getElementById("form-prenda").onsubmit = function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            fetch("${API_BASE_URL}/prendas", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(() => renderizar());
          };
        })
        .catch(err => {
          console.error("Error al obtener prendas", err);
          document.getElementById("contenido-principal").innerHTML = `
            <p class="alert alert-danger">Error al cargar prendas</p>
          `;
        });
    });
}

// Eliminar prenda (debe ser global)
window.eliminarPrenda = function(id) {
  if (confirm("¿Seguro que deseas eliminar esta prenda?")) {
    fetch(`${API_BASE_URL}/prendas/${id}`, {
      method: "DELETE"
    })
    .then(() => renderizar());
  }
};

// Editar prenda (prompt simple)
window.editarPrenda = function(id, nombre, marcaId, precio, cantidad_stock) {
  const nuevoNombre = prompt("Nuevo nombre de la prenda:", nombre);
  if (!nuevoNombre) return;
  const nuevoPrecio = prompt("Nuevo precio:", precio);
  if (!nuevoPrecio) return;
  const nuevoStock = prompt("Nuevo stock:", cantidad_stock);
  if (!nuevoStock) return;
  // Marca: selecciona de nuevo (simple)
  fetch("${API_BASE_URL}/marcas")
    .then(res => res.json())
    .then(marcas => {
      const opciones = marcas.map(m => `${m._id}:${m.nombre}`).join('\n');
      const nuevaMarcaId = prompt(`ID de la nueva marca:\n${opciones}`, marcaId);
      if (!nuevaMarcaId) return;
      fetch(`${API_BASE_URL}/prendas/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          nombre: nuevoNombre,
          marca: nuevaMarcaId,
          precio: nuevoPrecio,
          cantidad_stock: nuevoStock
        })
      })
      .then(() => renderizar());
    });
};
export function renderizar() {
  fetch("http://localhost:5000/tienda/api/v1/marcas")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">🏷️ Marcas</h2>
        <form id="form-marca" class="row g-3 mb-4">
          <div class="col-md-5">
            <input required name="nombre" class="form-control" placeholder="Nombre de la marca">
          </div>
          <div class="col-md-5">
            <input required name="pais" class="form-control" placeholder="País de origen">
          </div>
          <div class="col-md-2 d-grid">
            <button class="btn btn-success" type="submit">Agregar</button>
          </div>
        </form>
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
              <button class="btn btn-sm btn-danger" onclick="eliminarMarca('${m._id}')">Eliminar</button>
            </td>
          </tr>
        `;
      });
      html += `</tbody></table>`;

      document.getElementById("contenido-principal").innerHTML = html;

      // Manejar submit del formulario
      document.getElementById("form-marca").onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        fetch("http://localhost:5000/tienda/api/v1/marcas", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(() => renderizar());
      };
    })
    .catch(err => {
      console.error("Error al obtener marcas", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar marcas</p>
      `;
    });
}

// Eliminar marca (debe ser global)
window.eliminarMarca = function(id) {
  if (confirm("¿Seguro que deseas eliminar esta marca?")) {
    fetch(`http://localhost:5000/tienda/api/v1/marcas/${id}`, {
      method: "DELETE"
    })
    .then(() => renderizar());
  }
};
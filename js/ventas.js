export function renderizar() {
  // Obtener prendas y usuarios para los selects
  Promise.all([
    fetch(`${API_BASE_URL}/prendas`).then(r => r.json()),
    fetch(`${API_BASE_URL}/usuarios`).then(r => r.json())
  ]).then(([prendas, usuarios]) => {
    fetch("${API_BASE_URL}/ventas")
      .then(res => res.json())
      .then(data => {
        let html = `
          <h2 class="mb-4">💰 Ventas</h2>
          <form id="form-venta" class="row g-3 mb-4">
            <div class="col-md-3">
              <select required name="prenda" class="form-select">
                <option value="">Prenda...</option>
                ${prendas.map(p => `<option value="${p._id}">${p.nombre}</option>`).join("")}
              </select>
            </div>
            <div class="col-md-3">
              <select required name="usuario" class="form-select">
                <option value="">Usuario...</option>
                ${usuarios.map(u => `<option value="${u._id}">${u.username}</option>`).join("")}
              </select>
            </div>
            <div class="col-md-2">
              <input required name="cantidad" type="number" min="1" class="form-control" placeholder="Cantidad">
            </div>
            <div class="col-md-2 d-grid">
              <button class="btn btn-success" type="submit">Agregar</button>
            </div>
          </form>
          <table class="table table-bordered table-striped">
            <thead><tr><th>Prenda</th><th>Usuario</th><th>Fecha</th><th>Cantidad</th><th>Total</th></tr></thead>
            <tbody>
        `;
        data.forEach(v => {
          html += `
            <tr>
              <td>${v.prenda?.nombre || 'N/A'}</td>
              <td>${v.usuario?.username || 'N/A'}</td>
              <td>${v.fecha_venta ? new Date(v.fecha_venta).toLocaleDateString() : ''}</td>
              <td>${v.cantidad}</td>
              <td>${v.total}</td>
            </tr>
          `;
        });
        html += `</tbody></table>`;

        document.getElementById("contenido-principal").innerHTML = html;

        // Manejar submit del formulario
        document.getElementById("form-venta").onsubmit = function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            fetch("${API_BASE_URL}/ventas", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(async r => {
                if (!r.ok) {
                const err = await r.json();
                alert(err.error || "Error al registrar la venta");
                return;
                }
                return r.json();
            })
            .then(() => renderizar());
        };
      })
      .catch(err => {
        console.error("Error al obtener ventas", err);
        document.getElementById("contenido-principal").innerHTML = `
          <p class="alert alert-danger">Error al cargar ventas</p>
        `;
      });
  });
}

// Eliminar venta (debe ser global)
window.eliminarVenta = function(id) {
  if (confirm("¿Seguro que deseas eliminar esta venta?")) {
    fetch(`${API_BASE_URL}/ventas/${id}`, {
      method: "DELETE"
    })
    .then(() => renderizar());
  }
};
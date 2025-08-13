export function renderizar() {
  fetch("${API_BASE_URL}/usuarios")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">👥 Usuarios</h2>
        <form id="form-usuario" class="row g-3 mb-4">
          <div class="col-md-4">
            <input required name="username" class="form-control" placeholder="Nombre de usuario">
          </div>
          <div class="col-md-4">
            <input required name="email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="col-md-3">
            <select required name="rol" class="form-select">
              <option value="">Rol...</option>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>
          <div class="col-md-1 d-grid">
            <button class="btn btn-success" type="submit">Agregar</button>
          </div>
        </form>
        <table class="table table-bordered table-striped">
          <thead><tr><th>Username</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
          <tbody>
      `;
      data.forEach(u => {
        html += `
          <tr>
            <td>${u.username}</td>
            <td>${u.email}</td>
            <td>${u.rol}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" onclick="editarUsuario('${u._id}', '${u.username}', '${u.email}', '${u.rol}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${u._id}')">Eliminar</button>
            </td>
          </tr>
        `;
      });
      html += `</tbody></table>`;

      document.getElementById("contenido-principal").innerHTML = html;

      // Manejar submit del formulario (crear)
      document.getElementById("form-usuario").onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        fetch("${API_BASE_URL}/usuarios", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(() => renderizar());
      };
    })
    .catch(err => {
      console.error("Error al obtener usuarios", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar usuarios</p>
      `;
    });
}

// Eliminar usuario (debe ser global para que el botón lo encuentre)
window.eliminarUsuario = function(id) {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: "DELETE"
    })
    .then(() => renderizar());
  }
};

// Editar usuario (abre prompt simple)
window.editarUsuario = function(id, username, email, rol) {
  const nuevoUsername = prompt("Nuevo nombre de usuario:", username);
  if (!nuevoUsername) return;
  const nuevoEmail = prompt("Nuevo email:", email);
  if (!nuevoEmail) return;
  const nuevoRol = prompt("Nuevo rol (admin/cliente):", rol);
  if (!nuevoRol) return;
  fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username: nuevoUsername, email: nuevoEmail, rol: nuevoRol })
  })
  .then(() => renderizar());
};
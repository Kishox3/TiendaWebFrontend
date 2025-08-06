export function renderizar() {
  fetch("http://localhost:5000/tienda/api/v1/usuarios")
    .then(res => res.json())
    .then(data => {
      let html = `
        <h2 class="mb-4">👥 Usuarios</h2>
        <button class="btn btn-primary mb-3" onclick="mostrarFormularioUsuario()">➕ Nuevo Usuario</button>
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
      console.error("Error al obtener usuarios", err);
      document.getElementById("contenido-principal").innerHTML = `
        <p class="alert alert-danger">Error al cargar usuarios</p>
      `;
    });
}

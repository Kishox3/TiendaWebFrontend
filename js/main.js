fetch("http://localhost:5000/tienda/api/v1/usuarios")
  .then(res => res.json())
  .then(data => {
    console.log("Usuarios recibidos:", data);
    document.getElementById("contenido-principal").innerHTML = `
      <p class="alert alert-success">Conectado con API: ${data.length} usuarios encontrados.</p>
    `;
  })
  .catch(err => {
    console.error("Error al conectar con la API", err);
    document.getElementById("contenido-principal").innerHTML = `
      <p class="alert alert-danger">No se pudo conectar con la API. ¿Está corriendo?</p>
    `;
  });

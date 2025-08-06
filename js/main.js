function cargarSeccion(seccion) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activo = Array.from(document.querySelectorAll('.nav-link')).find(link => link.textContent.toLowerCase().includes(seccion));
  if (activo) activo.classList.add('active');

  import(`./${seccion}.js`)
    .then(modulo => {
      modulo.renderizar();
    })
    .catch(err => {
      console.error(`Error cargando ${seccion}.js`, err);
      document.getElementById("contenido-principal").innerHTML = `
        <div class="alert alert-danger">Error al cargar sección "${seccion}"</div>
      `;
    });
}

// Carga por defecto la sección de usuarios al iniciar
window.onload = () => cargarSeccion('usuarios');

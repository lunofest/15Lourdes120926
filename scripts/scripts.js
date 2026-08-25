

// -----------------------TEMPORIZADOR---------------------------

const fechaObjetivo = new Date("september 12, 2026 21:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia > 0) {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
  } else {
    document.querySelector(".contador__titulo").textContent = "¡Es el día!";
    document.querySelector(".contador__tiempo").style.display = "none";
  }
}

// Actualiza el contador cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();

// --------------------------MUSICA----------------------------------

const audio = document.querySelector('.musica audio');
const playPauseButton = document.querySelector('.musica__button');

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.classList.add('musica__button--playing');
    playPauseButton.classList.remove('musica__button--paused');
  } else {
    audio.pause();
    playPauseButton.classList.remove('musica__button--playing');
    playPauseButton.classList.add('musica__button--paused');
  }
});

// -----------------PLAYLIST----------------------

document.addEventListener('DOMContentLoaded', function () {
  const botonEnviar = document.getElementById('playlistbtn');
  const nombreInput = document.getElementById('nombre');
  const cancionInput = document.getElementById('cancion');
  const linkInput = document.getElementById('link');
  const errorMensaje = document.getElementById('error-mensaje');
  const numeroWhatsapp = '541140483684';

  botonEnviar.addEventListener('click', function () {
    const nombre = nombreInput.value.trim();
    const cancion = cancionInput.value.trim();
    const link = linkInput.value.trim();

    if (!nombre || !cancion) {
      errorMensaje.textContent = "Por favor, completa tu nombre y el nombre de la canción.";
      return;
    } else {
      errorMensaje.textContent = "";
    }

    let mensaje = `Hola!, mi nombre es *${nombre}* quiero recomendar el siguiente tema:\n*${cancion}*`;

    if (link) {
      mensaje += `\nlink: ${link}`;
    }


    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');

    // Opcional: Limpiar los campos después de enviar
    nombreInput.value = '';
    cancionInput.value = '';
    linkInput.value = '';
  });
});



// -----------------DRESSCODE------------------------

document.addEventListener('DOMContentLoaded', function () {
  const botonEjemplo = document.querySelector('.dresscode__ejemplo');
  const lightbox = document.getElementById('lightbox');
  const botonCerrar = document.querySelector('.lightbox__cerrar');

  botonEjemplo.addEventListener('click', function () {
    lightbox.classList.add('active');
  });

  botonCerrar.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });

  // Opcional: Cerrar el lightbox al hacer clic fuera de la imagen
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
});

// ----------------REGALOS--------------------


document.addEventListener('DOMContentLoaded', function () {
  const botonDatos = document.querySelector('.regalos__button');
  const datosDiv = document.getElementById('datos');
  const botonesCopiar = document.querySelectorAll('.datos__copiar');
  const mensajeCopiado = document.getElementById('mensajeCopiado');

  botonDatos.addEventListener('click', function () {
    datosDiv.classList.toggle('mostrar');
  });

  botonesCopiar.forEach(boton => {
    boton.addEventListener('click', function () {
      const targetSelector = this.getAttribute('data-copy-target');
      const targetElement = datosDiv.querySelector(targetSelector);

      if (targetElement) {
        const textToCopy = targetElement.textContent;

        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            mensajeCopiado.classList.add('mostrar');
            setTimeout(() => {
              mensajeCopiado.classList.remove('mostrar');
            }, 1500);
          })
          .catch(err => {
            console.error('Error al copiar al portapapeles:', err);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
          });
      }
    });
  });
});


// --------------- confirmacion --------------------------------------


document.addEventListener('DOMContentLoaded', function () {
  // Definir los números de teléfono
  const recipientNumber1 = '541140483684'; // Número para el primer botón
  const recipientNumber2 = '541122656877'; // Número para el segundo botón
  const recipientNumber3 = '541128768430'; // Número para el tercer botón

  // Función para enviar mensaje por WhatsApp
  function sendMessage(phoneNumber) {
    const userName = document.getElementById('userFullName').value.trim();
    const userMessage = document.getElementById('customMessage').value.trim();
    const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

    if (!attendanceStatus) {
      alert('Por favor, selecciona si asistirás o no.');
      return;
    }

    if (userName === '') {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

    // Abre la URL de WhatsApp en una nueva pestaña
    window.open(whatsappLink, '_blank');

    // Mostrar mensaje de confirmación
    alert('Mensaje enviado');

    // Limpiar los campos de entrada
    document.getElementById('userFullName').value = '';
    document.getElementById('customMessage').value = '';
    document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

    // Redirigir a la sección con id 'correo'
    window.location.hash = 'correo';
  }

  // Asignar eventos a los botones
  document.getElementById('btnConfirmacion1').addEventListener('click', function () {
    sendMessage(recipientNumber1);
  });

  document.getElementById('btnConfirmacion2').addEventListener('click', function () {
    sendMessage(recipientNumber3);
  });

  document.getElementById('btnConfirmacion3').addEventListener('click', function () {
    sendMessage(recipientNumber2);
  });
});

// ---------------------menu----------------------


document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('precio__toggle-btn1');
  const mostrarSection = document.getElementById('precio__mostrar1');
  const copyCbuBtn = document.getElementById('precio__copy-cbu1');
  const copyAliasBtn = document.getElementById('precio__copy-alias1');

  // Toggle bank details
  toggleBtn.addEventListener('click', () => {
    mostrarSection.classList.toggle('active');
    toggleBtn.textContent = mostrarSection.classList.contains('active')
      ? 'Ocultar datos bancarios'
      : 'Ver datos bancarios para pagos';
  });

  // Función común para copiar texto (para CBU y Alias)
  const copiarTexto = (button, elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (element) {
      const text = element.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = `¡${elementSelector === '.precio__CBU1' ? 'CBU' : 'Alias'} Copiado!`;
        setTimeout(() => {
          button.textContent = `Copiar ${elementSelector === '.precio__CBU1' ? 'CBU' : 'Alias'}`;
        }, 2000);
      });
    } else {
      // Si el elemento no existe, cambia el texto del botón para informar al usuario
      button.textContent = `${elementSelector === '.precio__CBU1' ? 'CBU' : 'Alias'} no disponible`;
      setTimeout(() => {
        button.textContent = `Copiar ${elementSelector === '.precio__CBU1' ? 'CBU' : 'Alias'}`;
      }, 2000);
    }
  };

  // Copy CBU
  if (copyCbuBtn) {
    copyCbuBtn.addEventListener('click', () => {
      copiarTexto(copyCbuBtn, '.precio__CBU1');
    });
  }

  // Copy Alias
  if (copyAliasBtn) {
    copyAliasBtn.addEventListener('click', () => {
      copiarTexto(copyAliasBtn, '.precio__alias1');
    });
  }

  // Lightbox del menú
  const btnAbrir = document.querySelector('.foto__menu1');
  const lightbox = document.getElementById('menuFotoLightbox1');
  const btnCerrar = document.getElementById('menuFotoCerrar1');
  const overlay = document.querySelector('.menuFoto-overlay1');

  // Abrir lightbox
  btnAbrir.addEventListener('click', () => {
    lightbox.style.display = 'block';
    setTimeout(() => lightbox.classList.add('activo'), 10);
  });

  // Cerrar lightbox
  const cerrarLightbox = () => {
    lightbox.classList.remove('activo');
    setTimeout(() => (lightbox.style.display = 'none'), 0);
  };

  btnCerrar.addEventListener('click', cerrarLightbox);
  overlay.addEventListener('click', cerrarLightbox);

  // Prevenir cierre al hacer click en la imagen
  document.querySelector('.menuFoto-imagen1').addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

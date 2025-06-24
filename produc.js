document.addEventListener('DOMContentLoaded', () => {
  const regiones = {
    'AMERICA': { precio: '$90', pago: ['Transferencia', 'Mercado Pago', 'Efectivo'] },
    'EUROPA': { precio: '€4', pago: ['Tarjeta europea', 'PayPal'] },
    'ASIA': { precio: '¥500', pago: ['AliPay', 'Tarjeta internacional'] },
  };

  const modal = document.getElementById('modalRegion');
  const btnGuardar = document.getElementById('btnGuardarRegion');
  const selectRegionModal = document.getElementById('selectRegionModal');
  const formasPagoContainer = document.getElementById('formasPagoContainer');

  let regionSeleccionada = '';
  let formaPagoSeleccionada = '';

  // Abrir modal con botón “Elegir región y forma de pago”
  document.querySelectorAll('.btn-region').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
      btnGuardar.disabled = true;
      selectRegionModal.value = '';
      formasPagoContainer.textContent = 'Seleccioná una región para ver opciones';
      formaPagoSeleccionada = '';
      regionSeleccionada = '';
    });
  });

  // Cerrar modal con X
  document.querySelector('.cerrar').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal clic fuera del contenido
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Cuando cambie región, actualizar formas de pago
  selectRegionModal.addEventListener('change', e => {
    regionSeleccionada = e.target.value;
    formasPagoContainer.innerHTML = '';
    formaPagoSeleccionada = '';
    btnGuardar.disabled = true;

    if (!regionSeleccionada || !regiones[regionSeleccionada]) {
      formasPagoContainer.textContent = 'No hay opciones disponibles';
      return;
    }

    regiones[regionSeleccionada].pago.forEach(pago => {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.margin = '8px 0';
      label.style.cursor = 'pointer';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'formaPago';
      radio.value = pago;

      radio.addEventListener('change', () => {
        formaPagoSeleccionada = pago;
        btnGuardar.disabled = false;
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + pago));
      formasPagoContainer.appendChild(label);
    });
  });

  // Guardar selección, actualizar precios, cerrar modal
  btnGuardar.addEventListener('click', () => {
    if (!regionSeleccionada || !formaPagoSeleccionada) return;

    document.querySelectorAll('.producto').forEach(producto => {
      const precioElem = producto.querySelector('.precio');
      if (precioElem) {
        precioElem.innerHTML = `<span class="icono-precio"></span> ${regiones[regionSeleccionada].precio} por unidad`;
      }
    });

    alert(`Región seleccionada: ${regionSeleccionada}\nForma de pago: ${formaPagoSeleccionada}`);

    modal.style.display = 'none';
  });
});
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Producto agregado al carrito');
  });
});
let indice = 0;
const productos = document.querySelectorAll('.producto');

function mostrarProducto(i) {
  productos.forEach((prod, idx) => {
    prod.classList.toggle('active', idx === i);
  });
}

function mover(direccion) {
  indice += direccion;
  if (indice < 0) indice = productos.length - 1;
  if (indice >= productos.length) indice = 0;
  mostrarProducto(indice);
}

// Mostrar el primero al cargar
mostrarProducto(indice);

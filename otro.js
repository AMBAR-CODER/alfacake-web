const regiones = {
  'AMERICA': { precio: '$90', pago: 'Transferencia, Mercado Pago o efectivo' },
  'EUROPA': { precio: '€4', pago: 'Tarjeta europea o PayPal' },
  'ASIA': { precio: '¥500', pago: 'AliPay o tarjeta internacional' },
  'DEFAULT': { precio: '$--', pago: 'Seleccioná región' }
};

function actualizarPorRegion(region) {
  document.querySelectorAll('.producto').forEach(producto => {
    const precioElem = producto.querySelector('.precio');
    const pagoTexto = producto.querySelector('.opciones-pago');

    const info = regiones[region] || regiones['DEFAULT'];

    if (precioElem) precioElem.innerHTML = `<span class="icono-precio"></span> ${info.precio} por unidad`;
    if (pagoTexto) pagoTexto.textContent = info.pago;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('regionSelect');
  if (selector) {
    selector.addEventListener('change', e => {
      const region = e.target.value;
      actualizarPorRegion(region);
    });
  }
});
const regiones = {
  'AMERICA': { precio: '$90', pago: 'Transferencia, Mercado Pago o efectivo' },
  'EUROPA': { precio: '€4', pago: 'Tarjeta europea o PayPal' },
  'ASIA': { precio: '¥500', pago: 'AliPay o tarjeta internacional' },
  'DEFAULT': { precio: '$--', pago: 'Seleccioná región' }
};

function actualizarPorRegion(region) {
  document.querySelectorAll('.producto').forEach(producto => {
    const precioElem = producto.querySelector('.precio');
    const pagoTexto = producto.querySelector('.opciones-pago');

    const info = regiones[region] || regiones['DEFAULT'];

    if (precioElem) precioElem.innerHTML = `<span class="icono-precio"></span> ${info.precio} por unidad`;
    if (pagoTexto) pagoTexto.textContent = info.pago;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('regionSelect');
  selector.addEventListener('change', e => {
    actualizarPorRegion(e.target.value);
    // También cerramos todos los dropdown si están abiertos al cambiar región
    document.querySelectorAll('.pago-dropdown').forEach(dd => dd.classList.remove('activo'));
  });

  // Agregar toggle a cada botón “Forma de pago”
  document.querySelectorAll('.btn-pago').forEach(boton => {
    boton.addEventListener('click', e => {
      e.stopPropagation(); // Evita que se cierre inmediatamente al hacer click dentro
      const dropdown = boton.parentElement;
      // Cerrar otros abiertos primero
      document.querySelectorAll('.pago-dropdown').forEach(dd => {
        if(dd !== dropdown) dd.classList.remove('activo');
      });
      dropdown.classList.toggle('activo');
    });
  });

  // Cerrar dropdown si se clickea fuera
  document.addEventListener('click', () => {
    document.querySelectorAll('.pago-dropdown.activo').forEach(dd => {
      dd.classList.remove('activo');
    });
  });
});
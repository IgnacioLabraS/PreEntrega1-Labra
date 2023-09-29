const divMostrar = document.querySelector('#mostradorProductos');
const formFiltrar = document.querySelector('#filtroForm')
const tablaParaMostrar = document.querySelector('#tabla')
const mostrarCarritoBtn = document.getElementById('mostrarCarritoBtn');
const mostarTablas = document.querySelector('#escondido')
const infoDelTotal = document.querySelector('#totalInfo')
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Evento para mostrar el carrito apretando el botón del nav
mostrarCarritoBtn.addEventListener('click', () => {
  if (carrito.length > 0) {
    mostrarProductos()
  } else {
    Swal.fire({
      title: 'Carrito Vacío',
      text: 'Intenta agregar algunos productos :)',
      backdrop: 'rgba(0, 0, 0, 0.8)',
      imageUrl: 'https://i.gifer.com/7VE.gif',
      imageWidth: 350,
      imageHeight: 350,
      imageAlt: 'jhon travolta meme',
    })
  }
});

//función para mostrar la consulta al json con los productos y mostrarlos en pantalla
function mostrarDiv() {
  const url='./productos.json'
  fetch(url)
    .then(res => res.json())
    .then(obj => {
      const productos = obj
      let productoDiv = ''

      for (let i = 0; i < productos.length; i++) { 
        productoDiv += `<div class="col-md-3">
                            <div class="card">
                            <img src="img/${productos[i].codigo}.avif" class="card-img-top" alt="${productos[i].descripcion}">
                            <div class="card-body">
                              <span class="card-text categoriaP">${productos[i].categoria}</span>
                              <h5 class="card-title nombreP">${productos[i].nombre}</h5>
                              <p class="card-text descripcionP">${productos[i].descripcion}.</p>
                              <h5 class="precioP">$${productos[i].precio}</h5>
                              <div class="card-footer d-flex justify-content-center">
                              <a class="btn btn-primary agregar-producto" data-codigo="${productos[i].codigo}">Agregar</a>
                              </div>
                           </div>
                         </div>
                       </div>
                       `;
      }
      divMostrar.innerHTML = productoDiv;
      const botonesAgregar = document.querySelectorAll('.agregar-producto');
      botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => agregarAlCarrito(event, productos)); 
      });
    formFiltrar.addEventListener('submit', (event) => {
    event.preventDefault()
    const categoriaSeleccionada = formFiltrar.elements.categoria.value;
    const productosFiltrados = categoriaSeleccionada === 'todos' ? productos : productos.filter(producto => producto.categoria === categoriaSeleccionada)
    mostrarProductosFiltrados(productosFiltrados);
  });
    });
}

//función para filtrar los productos por su categoría respondiendo al evento del form
function mostrarProductosFiltrados(productos) {
    divMostrar.innerHTML = '';
    productos.forEach(producto => {
      const productoHTML = `
        <div class="col-md-3">
          <div class="card">
            <img src="img/${producto.codigo}.avif" class="card-img-top" alt="${producto.descripcion}">
            <div class="card-body">
              <span class="card-text categoriaP">${producto.categoria}</span>
              <h5 class="card-title nombreP">${producto.nombre}</h5>
              <p class="card-text descripcionP">${producto.descripcion}.</p>
              <h5 class="precioP">$${producto.precio}</h5>
              <div class="card-footer d-flex justify-content-center">
              <a class="btn btn-primary agregar-producto" data-codigo="${producto.codigo}">Agregar</a>
              </div>
            </div>
          </div>
        </div>
      `;
      divMostrar.innerHTML += productoHTML;
    });
    const botonesAgregar = document.querySelectorAll('.agregar-producto');
    botonesAgregar.forEach(boton => {
      boton.addEventListener('click', (event) => agregarAlCarrito(event, productos));
    });
  }
// función que agrega el producto al carrito  a partir del evento y del producto seleccionado
function agregarAlCarrito(event, productos) {
    const codigoProducto = event.target.getAttribute('data-codigo');
    const productoEncontrado = productos.find(producto => producto.codigo === codigoProducto);
    if (productoEncontrado) {
      const productoEnCarrito = carrito.find(item => item.codigo === codigoProducto);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
      } else {
        productoEncontrado.cantidad = 1;
        carrito.push(productoEncontrado);
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado',
        showConfirmButton: false,
        timer: 1500,
        width: '25em',
        toast: true,
        timerProgressBar: true
      })
      mostrarProductos()
    }
  }
// función para mostrar el carrito una vez se haya agregado el producto 
function mostrarProductos(){
    if (carrito.length > 0) {
     mostarTablas.style.display="block"
     let tablaBucle= ''
       for(let i = 0; i < carrito.length; i++){
          tablaBucle += `<tr>
                   <td>${carrito[i].nombre}</td>
                   <td>${carrito[i].categoria}</td>
                   <td>$${carrito[i].precio}</td>
                   <td>${carrito[i].cantidad}</td>
                   <td>$${(carrito[i].precio * carrito[i].cantidad).toFixed(2)}</td>
                   <td align="center"><a class="eliminar" onclick="eliminarProductos(${i})"> Eliminar </a></td>
                   </tr> `
       }
         tablaParaMostrar.innerHTML = tablaBucle
         sumadoraProductos()
     }
 }
 // función para eliminar el producto del carrito apartir de su indice
 function eliminarProductos(i) {
    if (i >= 0 && i < carrito.length) {
        carrito.splice(i, 1)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Producto eliminado',
          showConfirmButton: false,
          timer: 1500,
          width: '25em',
          toast: true,
          timerProgressBar: true
        })
        mostrarProductos()
    }
  }
//función para sumar los productos seleccionados para el carrito y en caso de que se cumpla la condición restarle el 10%
function sumadoraProductos(){
  let total = 0
  const pre = carrito.map( preXcan => preXcan.cantidad * preXcan.precio)
  pre.forEach(valordeproducto => { total = total + valordeproducto })
  let valorFinal = total
  if (valorFinal >= 500){
      valorFinal = valorFinal*0.9
         let mostrarValor = `<tr>
             <td colspan="4" align="right"> Total</td>
             <td colspan="1">$${total.toFixed(2)}</td>
             <td colspan="1"></td>
             </tr>
             <tr>
             <td colspan="4" align="right"> Total con 10% descuento </td>
             <td colspan="1">$${valorFinal.toFixed(2)}</td>
             <td colspan="1"><a class="comprar btn btn-primary" onclick="confirmarCompra(${valorFinal.toFixed(2)})"> Comprar </a></td>
             </tr> `
             infoDelTotal.innerHTML=mostrarValor
  } else {
         let mostrarValor = `<tr>
         <td colspan="4" align="right"> Total</td>
         <td colspan="1">$${total.toFixed(2)}</td>
         <td colspan="1"><a class="comprar btn btn-primary" onclick="confirmarCompra(${total.toFixed(2)})"> Comprar </a></td>
         </tr>
         <tr> `
         infoDelTotal.innerHTML=mostrarValor
  }
     return valorFinal
 }
 // función que muestra alerta al confirmar la compra y refresca la página al finalizar
 function confirmarCompra(valorFinal){
  Swal.fire({
    title: 'Confirmar compra',
    text: "Estás seguro que quieres confirmar tu compra?",
    icon: 'question',
    backdrop: 'rgba(0, 0, 0, 0.8)',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No, ir atrás',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.splice(0, carrito.length);
      localStorage.removeItem('carrito');
      mostrarProductos();
      Swal.fire(
        'Felicidades',
        'Confirmaste tu compra con un total de $'+ valorFinal.toFixed(2),
        'success'
      ).then(() => {
        location.reload();
      });
    }
  })
 }
mostrarDiv();


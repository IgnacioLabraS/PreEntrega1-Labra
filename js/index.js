alert('Hoy 10% de descuento si superas los $1000 pesos en el total')
//variables que recogen id's desde el HTML
const registrarProducto = document.querySelector('#agregarProductos')
const campoNombre = document.querySelector('#campoNombre')
const campoCategoria = document.querySelector('#campoCategoria')
const campoPrecio = document.querySelector('#campoPrecio')
const campoCantidad = document.querySelector('#campoCantidad')
const tablaParaMostrar = document.querySelector('#tabla')
const mostarTablas = document.querySelector('#escondido')
const infoDelTotal = document.querySelector('#totalInfo')
const carrito = JSON.parse(localStorage.getItem('carrito')) || []
      mostrarProductos()
//Construcción del objeto
class Producto {
    constructor({nombre, categoria, precio, cantidad, valor}) {
      this.nombre = nombre
      this.categoria = categoria
      this.precio = precio
      this.cantidad = cantidad
      this.valor = valor
    }
  }
//función para agregar los objetos
    registrarProducto.onsubmit = e => {
    e.preventDefault()
    const nombre = campoNombre.value
    const categoria = campoCategoria.value
    const precio = campoPrecio.value
    const cantidad = campoCantidad.value
    const valor = precio * cantidad 
    const producto = new Producto({nombre,categoria, precio, cantidad, valor })
    guardarEnCarrito(producto)
  }
  //función para guardar los objetos en el array
  function guardarEnCarrito(producto) {
    carrito.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarProductos()
  }
   //función para mostrar los productos en una tabla html
  function mostrarProductos(){
   if (carrito.length > 0) {
    mostarTablas.style.display="block"
    let tablaBucle= ''
      for(let i = 0; i < carrito.length; i++){  
         tablaBucle += `<tr>
                  <td>${carrito[i].nombre}</td>
                  <td>${carrito[i].categoria}</td>
                  <td>${carrito[i].precio}</td>
                  <td>${carrito[i].cantidad}</td>
                  <td>${carrito[i].valor}</td>
                  <td align="center"><a class="eliminar" onclick="eliminarProductos(${i})"> Eliminar </a></td>
                  </tr> `
      }   
        tablaParaMostrar.innerHTML = tablaBucle
      sumadoraProductos()
    }
}
//función para sumar el valor total de los productos y crear una tabla
  function sumadoraProductos(){ 
  let total = 0 
  const pre = carrito.map( preXcan => preXcan.valor)
  pre.forEach(valordeproducto => { total = total + valordeproducto })
  let valorFinal = total
  if (valorFinal >= 1000){
      valorFinal = valorFinal*0.9   
         let mostrarValor = `<tr>
             <td colspan="5" align="right"> Total</td>
             <td colspan="1">${total}</td>
             </tr>
             <tr>
             <td colspan="5" align="right"> Total con 10% descuento </td>
             <td colspan="1">${valorFinal}</td>
             </tr> `
             infoDelTotal.innerHTML=mostrarValor
  } else {
         let mostrarValor = `<tr>
         <td colspan="5" align="right"> Total</td>
         <td colspan="1">${total}</td>
         </tr>
         <tr> `
         infoDelTotal.innerHTML=mostrarValor  
  }
     console.log(total)
     console.log(valorFinal)
 }
 //función para eliminar los datos del array y del localStorage
 function eliminarProductos(i) {
  if (i >= 0 && i < carrito.length) {
      carrito.splice(i, 1)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      mostrarProductos()
  }
}


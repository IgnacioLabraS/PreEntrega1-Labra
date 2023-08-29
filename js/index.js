
alert('Hoy 10% de descuento si superas los 80 dólares en el total')
//Construcción del objeto
class Producto {
    constructor(nombre, precio, cantidad, valor) {
      this.nombre = nombre
      this.precio = precio
      this.cantidad = cantidad
      this.valor = valor
    }
  }
  //función para agregar los objetos
  function agregarProducto() {
    const nombre = prompt('ingresa el nombre del producto')//entrada de datos
    const precio = parseFloat(prompt('Ingresa el precio del producto(dólares)'))//entrada de datos
    const cantidad = parseFloat(prompt('Cuantos quieres agregar al carrito?'))//entrada de datos
    const valor = precio * cantidad 
    return new Producto(nombre, precio, cantidad, valor)
  }
  const carrito = []
    //const item = agregarProducto();
    //carrito.push(item);
    console.log(carrito) //ver el contenido del array en consola
  let comprarMas = true
  while (comprarMas) {
    const item = agregarProducto()
    carrito.push(item) // agrega el objeto al array
    const seguirComprando = prompt('Agregar otro producto al carrito? (si/no)')
    if (seguirComprando === 'si') {
      comprarMas = true
    }else if(seguirComprando === 'no') {
      comprarMas = false  
    } else {
       alert('La respuesta solo admite "si" o "no" por favor vuelva a intentar')
    }
  }
    let total = 0 //declarar el valor total antes de las funciones 
    const pre = carrito.map( preXcan => preXcan.valor)
    pre.forEach(valordeproducto => { total = total + valordeproducto })
    console.log(total)
    let valorFinal = total
    if (valorFinal >= 80){
        valorFinal = valorFinal*0.9
    }else {}
    alert('Felicidades! haz comprado '+ carrito.length+' Productos. con un total de '+ valorFinal.toFixed(2) + ' dólares')//salida de datos
    console.log(valorFinal)

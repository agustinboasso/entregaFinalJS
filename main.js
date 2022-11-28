//capturas DOM
let divProductos = document.getElementById("productos")
let btnGuardarCarta = document.getElementById("guardarCartaBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")


let productosEnCarrito = JSON.parse(localStorage.getItem("coleccion")) || []
console.log(productosEnCarrito)




//FUNCTIONS
/*function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let cartas of array){
        let nuevaCarta = document.createElement("div")
        nuevaCarta.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        nuevaCarta.innerHTML = `<div id="${cartas.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="media/${cartas.imagen}" alt="${cartas.carta} de ${cartas.expansion}">
                                    <div class="card-body">
                                        <h4 class="card-title">${cartas.carta}</h4>
                                        <p>Expansion: ${cartas.expansion}</p>
                                        <p class="${cartas.precio <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${cartas.precio}</p>
                                    <button id="agregarBtn${cartas.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevaCarta)
        let btnAgregar = document.getElementById(`agregarBtn${cartas.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(cartas)
        })
    }

}*/

//function AGREGAR AL CARRITO
function agregarAlCarrito(cartas){
    console.log(cartas)
    //Primer paso
    productosEnCarrito.push(cartas)
    console.log(productosEnCarrito)
    localStorage.setItem("coleccion", JSON.stringify(productosEnCarrito))
    
    
    //SweetAlert para agregar al carrito
    Swal.fire({
        position: `top`,
        title: "Ha agregado producto",
        icon: `sucess`,
        confirmButtonText:`entendido`,
        confirmButtonColor:"green",
        timer: 3000,
        text:`La carta ${cartas.carta} de la expansión ${cartas.expansion} fue agregada!`,
        imageUrl:`media/${cartas.imagen}`,
        imageHeight: 400,
        imageAlt: `${cartas.carta} de ${cartas.expansion}`
    })
}
//function IMPRIMIR en modal
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="media/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de compras
            let productoEliminar = array.find(carta => carta.id == productoCarrito.id)
           //productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('coleccion', JSON.stringify(productosEnCarrito))
           //vuelvo a calcular el total
           compraTotal(array)
        })
    })
    compraTotal(array)
}

//FUNCION QUE CALCULA EL TOTAL
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
}
//FUNCION AGREGAR: 
function cargarCarta(array){
    //captura y utilización de input para crear nuevo objeto
    let inputCarta = document.getElementById("cartaInput")  
    let inputExpansion = document.getElementById("expansionInput")
    let inputPrecio = document.getElementById("precioInput")
    
    let cartaCreada = new Carta(array.length+1, inputExpansion.value, inputCarta.value, parseInt(inputPrecio.value), "media/cartaNueva.jfif")//CARGAR IMAGEN CARTANUEVA
    //Objeto creado lo pusheo al array
    array.push(cartaCreada)
    //TAMBIÉN MODIFICAMOS ARRAY DEL STORAGE:
    localStorage.setItem("coleccion", JSON.stringify(array))
    mostrarColeccion(array)
    
    inputExpansion.value = ""
    inputCarta.value = ""
    inputPrecio.value =""

    //toastify
    Toastify({
        text:"Tu carta fue agregada a la expansion!!!",
        duration: 6000,
        //propiedades para posicionar
        gravity: "bottom", //top o botom
        position:"center", //left, right, center
        style: {
            background:"green",
            color: "black",
            gradient: "",

        } 
        .onclick
    }).showToast()
}

//function buscador que se activa con evento change del input para buscar
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (carta) => carta.expansio.toLowerCase().includes(buscado.toLowerCase()) || carta.carta.toLowerCase().includes(buscado.toLowerCase())
        // Coincidencias sin includes (libro) => libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    )
    
    
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No se encontro lo que buscabas! Te mostramos toda la coleccion por si la encontras!!!</h3>`, mostrarColeccion(array)) 
    : (coincidencia.innerHTML = "", mostrarColeccion(busqueda))
}






//EVENTOS PROYECTO
btnGuardarCarta.addEventListener("click", ()=>{cargarCarta(coleccion)})
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, coleccion)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)

    
}) 

mostrarCatalogo(coleccion)
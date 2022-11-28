
fetch("https://api.pokemontcg.io/v2/cards//?key=e2dff93f-b5da-4200-aab4-dd5c0d760cb4")
.then((res)=>res.json())
.then(array => imprimirDatos(array))
function imprimirDatos(array){

    console.log(array.data)
    console.log(array)
    array.data.forEach(pokemon => console.log(pokemon))
    for(let cartas of array){
        let nuevaCarta = document.createElement("div")
        nuevaCarta.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        nuevaCarta.innerHTML = `<div id="${cartas.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="media/${cartas.image}" alt="${cartas.name} de ${cartas.set}">
                                    <div class="card-body">
                                        <h4 class="card-title">${cartas.name}</h4>
                                        <p>Expansion: ${cartas.set}</p>
                                        <p class="${cartas.tcgplayer <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${cartas.tcgplayer}</p>
                                    <button id="agregarBtn${cartas.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevaCarta)
        let btnAgregar = document.getElementById(`agregarBtn${cartas.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(cartas)
        })
    }

}
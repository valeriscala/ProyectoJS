const postres = [];
let carrito = []

class Postre {
    constructor(id, nombre, precio, imagen, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = parseInt(cantidad);
    }
    subTotal() {
        return this.precio * this.cantidad
    }
    agregarCantidad(suma) {
        this.cantidad += suma
    }
}

$.get("../data/productos.json", (datos, estado) => {
    console.log(datos);
    console.log(estado);

    if (estado=="success") {
     for (const literal of datos) {
         postres.push(new Postre(literal.id,literal.nombre,literal.precio,literal.imagen,literal.cantidad))
     }
    }
    crearCards(postres)
    carritoUI(carrito)

    let btn = document.querySelectorAll(".comprar-btn")
    btn.forEach(boton => {
        boton.addEventListener('click', () => {
            const existe = carrito.find(el => el.id == boton.id)
            if (existe == undefined) {
                const encontrado = postres.find(el => el.id == boton.id)
                carrito.push(encontrado)
            } else {
                existe.agregarCantidad(1)
            }
            carritoUI(carrito)
            localStorage.setItem("productos", JSON.stringify(carrito))
        })
    })
})



function crearCards(array) {
    array.forEach(prod => {
        let div = document.createElement('div')
        div.classList.add("product")
        div.innerHTML =
            `
        <img src="${prod.imagen}" alt="" class="product__img">
        <div class="product__description">
        <h3 class="product__title">${prod.nombre}</h3>
        <span class="product__price">$${prod.precio}</span>
        </div>
        <button id="${prod.id}" class="comprar-btn"><i class="product__icon fas fa-cart-plus"></i></button>
        `
        document.getElementById('container-products').appendChild(div)
    })
}




function carritoUI(carro) {

    $("#containerProductos").empty()

    for (const producto of carro) {
        let tr = document.createElement("tr")
        tr.innerHTML =
            `
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>$${producto.subTotal()}</td>
                    <td><i class="fas fa-trash tacho" id="${producto.id}" ></i></td>
                    `
        $("#containerProductos").append(tr)

        document.querySelector(".tacho").addEventListener("click",eliminarItem)
    }
}
 
 function eliminarItem(event) {
     console.log(event.target.id)
   carrito = carrito.filter(prod=>prod.id != event.target.id)

   carritoUI(carrito)
   localStorage.setItem("productos", JSON.stringify(carrito))
     
 }

$(document).ready(() => {
    if ("productos" in localStorage) {
        const datos = JSON.parse(localStorage.getItem("productos"))

        datos.forEach(x => {
            carrito.push(new Postre(x.id, x.nombre, x.precio, x.imagen, x.cantidad))
        })

        carritoUI(carrito)
    }
})

// validacion boton compra
$("#btnComprar").click(() => {
    if (carrito.length !== 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 1500
        })
        carrito = [];
        $("#containerProductos").empty()
        localStorage.clear();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío!',
        })
    }
});

$("#btnVaciar").click(() => {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío! Por favor agregue productos al carrito.',
    })
    }else {
        carrito = [];
        $("#containerProductos").empty()
        localStorage.clear();
    }
})






console.dir(document.body);

const postres = [];
let carrito =[]

class Postre {
    constructor (id,nombre,precio,imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = parseFloat(1)
    }
    subTotal(){
        return this.precio * this.cantidad
    }
    agregarCantidad(suma){
        this.cantidad += suma
    }
}

postres.push(new Postre(1,"Trufas de chocolate", 350,"../assets/img/postre1.jpg"));
postres.push(new Postre(2,"Cheesecake frutos rojos", 400,"../assets/img/postre3.jpg"));
postres.push(new Postre(3,"Postre de banana con ganache de chocolate", 300,"../assets/img/postre4.jpg"));
postres.push(new Postre(4,"Tiramisú", 550,"../assets/img/postre5.jpg"));
postres.push(new Postre(5,"Cheesecake con gelatina de frambuesa", 450,"../assets/img/postre6.jpg"));
postres.push(new Postre(6,"Torta de crema americana", 350,"../assets/img/postre7.jpg"));
postres.push(new Postre(7,"Donas", 400,"../assets/img/postre8.jpg"));
postres.push(new Postre(8,"Muffin de dulce de leche", 300,"../assets/img/postre2.jpg"));
postres.push(new Postre(9,"Cuadrado frutal", 550,"../assets/img/postre10.jpg"));
postres.push(new Postre(10,"Banana pancake", 450,"../assets/img/postre11.jpg"));
postres.push(new Postre(11,"Mini bizcochuelo de chocolate", 350,"../assets/img/slider.jpg"));
postres.push(new Postre(12,"Frutillas con crema", 400,"../assets/img/postre13.jpg"));
postres.push(new Postre(13,"Macarrones dulces", 300,"../assets/img/postre14.jpg"));
postres.push(new Postre(14,"Torta de vainilla y crema de frutos rojos", 550,"../assets/img/postre15.jpg"));
postres.push(new Postre(15,"Muffin de chocolate", 450,"../assets/img/postre16.jpg"));
postres.push(new Postre(16,"Rogel de chocolate", 350,"../assets/img/postre17.jpg"));
postres.push(new Postre(17,"Muffins de avena", 400,"../assets/img/postre18.jpg"));
postres.push(new Postre(18,"Shot de lemon pie", 300,"../assets/img/postre19.jpg"));
postres.push(new Postre(19,"Brownie con chips de chocolate", 550,"../assets/img/postre20.jpg"));
postres.push(new Postre(20,"Shot de mousse de chocolate", 450,"../assets/img/postre21.jpg"));

function crearCards (array){
    array.forEach(prod=>{
        let div = document.createElement('div')
        div.classList.add("product")
        div.innerHTML= 
        `
        <img src="${prod.imagen}" alt="" class="product__img">
        <div class="product__description">
        <h3 class="product__title">${prod.nombre}</h3>
        <span class="product__price">$${prod.precio}</span>
        </div>
        <button id="${prod.id}" class="comprar-btn"><i class="product__icon fas fa-cart-plus"></i></button>
        `
        document.getElementById('container-products').appendChild(div)
    console.log(`${prod.id}`);
    })
}

   crearCards(postres)


   let btn = document.querySelectorAll(".comprar-btn")
   btn.forEach(boton=>{
       boton.addEventListener('click',()=>{
           const existe = carrito.find(el=>el.id==boton.id)
           if(existe==undefined){
               const encontrado = postres.find(el=>el.id==boton.id)
               carrito.push(encontrado)
           }
           else{
               existe.cantidad += 1
           }
           carritoUI(carrito)
           localStorage.setItem("productos", JSON.stringify (carrito))
       })
   }
    )

    function carritoUI(carro){
        document.getElementById("containerProductos").innerHTML=""
        for (const producto of carro) {
        let div = document.createElement ("div")
        div.innerHTML=
                    `
                    <p>${producto.nombre}</p>
                    <p>$ ${producto.precio}</p>
                    <p>$${producto.subTotal()}</p>

                    `
        document.getElementById("containerProductos").appendChild(div)    
        

       
        }

    }

        $(document).ready(()=>{
            // 1° Preguntamos si está la clave/ key en el localStorage
          if ("productos" in localStorage) {
            //   2° si existe "productos" en el localStorage quiero pasarlos a tipo objeto con el JSON.parse
            const carrito = JSON.parse(localStorage.getItem("productos"))
            //   3° Transformamos el array de tipo objeto a tipo producto
            for (const literal of carrito) {
                carrito.push(new Postre(literal.id, literal.nombre, literal.precio, literal.imagen, literal.cantidad)) 

            }
            
            carritoUI(carrito)
            console.log("productos generados");
          }
        })

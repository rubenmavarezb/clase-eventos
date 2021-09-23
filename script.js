console.log('segundo console.log')
let products = [];

let carrito = [];

const addToCart = (evento, id) => {
    console.log('Products que ya estan cargados',products);
    const cantidades = evento.target.previousElementSibling.value;
    //console.log(cantidades)
    //Buscamos si existe en el carrito
    const prodIsInCart = isInCart(id);
    //console.log(prodIsInCart);
    
    //Falsey values
    //undefined, null, 0, '', unknown, false
    //Truthy values 
    //numeros > 0, strings que no sean vacios, true, {}, []

    if(prodIsInCart) {
        //Buscamos el producto en el carrito para modificarlo
        const indexDelProd = carrito.findIndex(prod => prod.id === prodIsInCart.id);
        const product = carrito[indexDelProd]
        if((product.cantidad < prodIsInCart.stock ) && (parseInt(product.cantidad) + parseInt(cantidades) < prodIsInCart.stock )) {
            product.cantidad = parseInt(product.cantidad) + parseInt(cantidades);
        } else {
            alert('No podes agregar mas master!');
            product.cantidad = prodIsInCart.stock;
        }
        renderProductsInCart(carrito, '.cart');
        return;
    }

    const productoEnBaseDeDatos = products.find(producto => producto.id === id);
    //console.log(productoEnBaseDeDatos);
    productoEnBaseDeDatos.cantidad = cantidades;
    //console.log(productoEnBaseDeDatos)
    carrito.push(productoEnBaseDeDatos);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderProductsInCart(carrito,'.cart');
}

const renderProducts = (arrayDeProductos, elemento) => {
    const productDiv = document.querySelector(elemento);

    if(arrayDeProductos.length === 0) {
        productDiv.innerHTML = 'No hay productos en la tineda :(((';
        return;
    }
    //console.log(productDiv)
    productDiv.innerHTML = '';
    let html = '';

    arrayDeProductos.forEach(articulo => {
        html += `
            <article>
                <p>${articulo.nombre}</p>
                <span>${articulo.precio}$</span>
                <input class="input-qty input-qty-${articulo.id}" type="number" value="1">
                <button class="btn-comprar" onclick="addToCart(event,'${articulo.id}')">Comprar</button>
            </article>
        `;
    })

    productDiv.innerHTML = html;
}

const deleteItem = (idDelProducto) => {
    const nuevoCarrito = carrito.filter(articulo => articulo.id !== idDelProducto);
    carrito = nuevoCarrito;

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderProductsInCart(nuevoCarrito, '.cart');

    if(carrito.length === 0) {
        document.querySelector('.cart').innerHTML = '<h2>No hay productos :(</h2>'
    }
}

const renderProductsInCart = (arrayDeProductos, elemento) => {
    const cartDiv = document.querySelector(elemento);
    //console.log(cartDiv)
    cartDiv.innerHTML = '';
    let html = '';

    arrayDeProductos.forEach(articulo => {
        html += `
            <article>
                <p>${articulo.nombre}</p>
                <span>${articulo.precio}$</span>
                <p>Cantidad: ${articulo.cantidad}</p>
                <button class="btn-borrar" onclick="deleteItem('${articulo.id}')">X</button>
            </article>
        `;
    })

    cartDiv.innerHTML = html;
}

const isInCart = (productId) => carrito.find(prod => prod.id === productId);

window.onload = () => {

    console.log('Primer console log')

    if(carrito.length === 0) {
        document.querySelector('.cart').innerHTML = '<h2>No hay productos :(</h2>'
    }

    $.get("/products.json", function( data ) {
        console.log('Data:',data['1'])
        products = [...data['0']];
        // console.log('Products despues de ejecutar el codigo: ', products);
        renderProducts(products, '.products'); 
    });
    
    //renderProducts(products, '.products');
    //No hace falta porque el asincronismo cambio la forma en la que se ejecutaba el codigo
    //const btns = document.querySelectorAll('.btn-comprar');
    //console.log(inputQty)
    //console.log(btns);
    //btns.forEach(button => button.addEventListener('click', addToCart))
}









//OFF TOPIC 

class Animal {
    constructor(especie){
        this.especie = especie;
    }
}

class Perro extends Animal {
    constructor(especie, domestico) {
        super(especie)
        this.domestico = domestico;
    }
}


const animal1 = new Perro('perro', true);

const animales = [];

for (let index = 0; index < 10; index++) {
    let animal = new Perro(`perro${index}`, true);  
    animales.push(animal)
}
const products = [
    {
        id:'1',
        nombre:'producto1',
        precio: 1000,
        stock:15,
        cantidad: 0
    },
    {
        id:'2',
        nombre:'producto2',
        precio: 2000,
        stock: 20,
        cantidad: 0
    },
    {
        id:'3',
        nombre:'producto3',
        precio: 3000,
        stock: 30,
        cantidad: 0
    },
];

let carrito = [];

const renderProducts = (arrayDeProductos, elemento) => {
    const productDiv = document.querySelector(elemento);
    //console.log(productDiv)
    productDiv.innerHTML = '';
    let html = '';

    arrayDeProductos.forEach(articulo => {
        html += `
            <article>
                <p>${articulo.nombre}</p>
                <span>${articulo.precio}$</span>
                <input class="input-qty input-qty-${articulo.id}" type="number" value="1">
                <button class="btn-comprar" value=${articulo.id}>Comprar</button>
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

const addToCart = (evento) => {
    const idDelProducto = evento.target.value;
    const cantidades = evento.target.previousElementSibling.value;
    console.log(cantidades)
    //Buscamos si existe en el carrito
    const prodIsInCart = isInCart(idDelProducto);
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

    const productoEnBaseDeDatos = products.find(producto => producto.id === idDelProducto);
    //console.log(productoEnBaseDeDatos);
    productoEnBaseDeDatos.cantidad = cantidades;
    //console.log(productoEnBaseDeDatos)
    carrito.push(productoEnBaseDeDatos);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderProductsInCart(carrito,'.cart');
}


window.onload = () => {
    renderProducts(products, '.products');
    if(carrito.length === 0) {
        document.querySelector('.cart').innerHTML = '<h2>No hay productos :(</h2>'
    }

    const btns = document.querySelectorAll('.btn-comprar');
    //console.log(inputQty)
    //console.log(btns);
    btns.forEach(button => button.addEventListener('click', addToCart))
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
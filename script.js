const products = [
    {
        id:'1',
        nombre:'producto1',
        precio: 1000,
        stock:15
    },
    {
        id:'2',
        nombre:'producto2',
        precio: 2000,
        stock: 20
    },
    {
        id:'3',
        nombre:'producto3',
        precio: 3000,
        stock: 30
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
                <p>Cantidad: ${articulo.cantidad ? articulo.cantidad : '1'}</p>
                <button class="btn-borrar" onclick="deleteItem('${articulo.id}')">X</button>
            </article>
        `;
    })

    cartDiv.innerHTML = html;
}

const isInCart = (productId) => carrito.find(prod => prod.id === productId);

const addToCart = (evento) => {
    const idDelProducto = evento.target.value;
    //console.log(idDelProducto);

    //Buscamos si existe en el carrito
    const prodIsInCart = isInCart(idDelProducto);
    
    if(prodIsInCart) {
        //Buscamos el producto en el carrito para modificarlo
        const indexDelProd = carrito.findIndex(prod => prod.id === prodIsInCart.id);
        if(carrito[indexDelProd].cantidad <= prodIsInCart.stock) {
            carrito[indexDelProd].cantidad++;
        } else {
            alert('No podes agregar mas master!');
            carrito[indexDelProd].cantidad = prodIsInCart.stock;
        }
        carrito = [...carrito];
        renderProductsInCart(carrito, '.cart');
        return;
    }

    const productoEnBaseDeDatos = products.find(producto => producto.id === idDelProducto);
    //console.log(productoEnBaseDeDatos);
    productoEnBaseDeDatos.cantidad = 1;
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


const perro3 = animales.find(animal => animal.especie === 'perro3');
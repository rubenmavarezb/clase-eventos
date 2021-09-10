

//Llamamos al div que tiene esa clase, recuerden que con querySelector hay que especificar si es un tag un id o n css como en CSS
const container = document.querySelector('.container');
//Lo podemos ver aqui si descomentamos
//console.log('CONTAINEr', container);

//Si revisamos el html vemos que dentro del div con la clase container tenemos un h1 y 3 span, esos serian los hijos. 
//Si en el ocnsole.log anterior abrimos el objeto para ver las opciones nos encontramos con la propiedad children, esa es un array que contiene elementos del html
//De esos elementos solo necesitamos tomar el que esta a la posicion 0 que seria el h1
const titulo = container.children[0];
//Lo podemos ver aqui si descomentamos
//console.log(titulo)

//A los elementos podemos agregarle estilos en linea como si lo hicieramos en HTML, de la siguiente manera:
titulo.style.cursor = 'pointer';


//Esto es un evento lo veremos en la proxima clase

titulo.addEventListener('click', () => {
    //Los elementos ademas cuentan con una propiedad que se llama classList que es un array de strings que tienen los nombres de clase de css d eeste elemento
    //classList a su vez tiene tres propiedades: add para agregar clases, remove para eliminar clases y toggle que lo que hace es que si tiene la clase de css se la quita y si no la tiene se la agrega
    titulo.classList.toggle('color-red');
    console.log(titulo)
})
//Llamamos a la section que esta en el html
const section = document.querySelector('.section');
//Lo podemos ver aqui si descomentamos
//console.log(section);

//Con DOM podemos creaer elementos, en este caso creamos un h2
const heading = document.createElement('h2');
//Le cargamos un texto
heading.textContent = 'Soy un titulo 2';
//Le agregamos un id
heading.id = 'titulo2';
//Le podemos agregar un string que seran sus clases de CSS
heading.className = 'clase1 clase2'

/*
Esta seria la section antes de hacer el prepend
    <section class="section">
        <div class="seccion-1">Soy un div</div>
    </section>
*/



//Le hacemos un prepend a la section para agregarle el titulo como un hijo.
//Los elementos tienen la opcion de agregarle hijos tenemos por ejemplo append (que lo agrega como ultimo hijo) y prepend (que lo agrega siempre antes que el resto de los hijos)
section.prepend(heading);

/*
Asi quedaria luego de hacerle el prepend
    <section class="section">
        <h2 id="titulo2" class="clase1 clase2">Soy un titulo 2</h2>
        <div class="seccion-1">Soy un div</div>
    </section>
*/


//Ahora crearemos un div donde vamos a renderizar unos productos que vienen de un array
const productDiv = document.createElement('div');
//Otra forma de agregar clases, junto al className, tenemos el classList, que es un array de strings
//el .join(' ') lo que esta haciendo es separando esos scripts en el HTML con un espacio
productDiv.classList = ['productos', 'product-section'].join(' ')

//A diferencia del prepend que hicimos anteriormente ahora haremos un appendChild que pondriaal final de todos los hijos
section.appendChild(productDiv);
/*
Asi quedaria luego de hacerle el appendChild
    <section class="section">
        <h2 id="titulo2" class="clase1 clase2">Soy un titulo 2</h2>
        <div class="seccion-1">Soy un div</div>
        <div class="productos product-section"></div>
    </section>
*/


//Esta es la estructura que necesitamos conseguir para agregarlos dentro del div que acabamos de crear
{/* <article>
    <p>producto1</p>
    <span>1000$</span>
</article> */}


//Nuestro array de productos
const productos = [
    {
        id:'1',
        nombre:'producto1',
        precio: 1000
    },
    {
        id:'2',
        nombre:'producto2',
        precio: 2000
    },
    {
        id:'3',
        nombre:'producto3',
        precio: 3000
    },
]

//Creamos una variable que va a iniciar como un string vacio
let html = '';

//Vaciamos el div de productos. este paso es importante hacerlo para que no se repitan los productos en caos de que se volviesen a renderizar
productDiv.innerHTML = '';

//Hacemos un forEach de nuestro array de productos
productos.forEach(producto => {
    //Si descomentamos el console.log veremos que nos traera un objeto por cada vuelta
    //console.log(producto)
    //A la variable que creamos anteriormente le haremos una concatenacion de este string dinamico
    //Lo unico que hacemos es dinamicamente pasarle el precio y el nombre. Por cada vuelta va a crear un article nuevo
    html += `
    <article>
        <p>${producto.nombre}</p>
        <span>${producto.precio}$</span>
    </article>
    `;
})


//Luego que termina de iterar el forEach lo agregamos todo con el innerHTML
productDiv.innerHTML = html;


//a diferencia del querySelector, el querySelectorAll te traera un array con todos los elementos que tengaan ese array
const span = document.querySelectorAll('.clase');
//Lo podemos ver aqui
//console.log(span);


//Le hacemos un forEach a ese array para que por cada elemento le agreguemos una clase dinamicamente
span.forEach((element, index) => {
    // console.log(element);
    // console.log(index);
    //El index es el indice del elemento en su array, seria  0, 1, 2. Le sumamos 1 porque queremos que por cada vuelta sea 1, 2 y 3 respectivamente
    const numero = index + 1;
    //A cada span le vamos a agregar una clase dinamica, si nos fijamos en el archivo CSS tenemos tres clases:
    //color-1, color-2, color-3
    //Por cada vuelta la variable numero seria 1, 2, 3 y asi sucesivamente
    //Al hacer `color-${numero}`, JS lo entendera como 'color-1', 'color-2', 'color-3' y de esa forma cargariamos un css dinamico
    element.classList.add(`color-${numero}`);
})


setTimeout(() => {
    titulo.style.fontSize = '3rem';
}, 3000);
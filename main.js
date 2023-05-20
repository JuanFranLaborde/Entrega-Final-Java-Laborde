const carrito = [];

class TragoUsuario {
  constructor(tipoTrago, precioTrago) {
    this.tipoTrago = tipoTrago;
    this.precioTrago = precioTrago;
  }
}

const productos = [
  {
    tipo: 'Fernet',
    nombre: 'Fernet con Coca Cola',
    precio: 500,
    imagen: 'imagenes/F&C.jpg'
  },
  {
    tipo: 'Vodka',
    nombre: 'Vodka con Sprite',
    precio: 450,
    imagen: 'imagenes/V&S.jpg'
  },
  {
    tipo: 'whisky',
    nombre: 'Johnnie Walker Black Label',
    precio: 1000,
    imagen: 'imagenes/W.jpg'
  },
  {
    tipo: 'Gin',
    nombre: 'Gin tonic',
    precio: 750,
    imagen: 'imagenes/gin-tonic.png'
  },
  {
  tipo: 'Cerveza',
  nombre: 'Corona Extra',
  precio: 500,
  imagen: 'imagenes/CORONa.png'
  },
  {
    tipo: 'Ron',
    nombre: 'Ron con Coca Cola',
    precio: 600,
    imagen: 'imagenes/Cubalibre.jpg'
  },
  {
    tipo: 'Campari',
    nombre: 'Campari con Naranja',
    precio: 700,
    imagen: 'imagenes/Camp.png'
  },
];

function cargarProductos() {
  const productCardsElement = document.getElementById('product-cards');

  productos.forEach((producto) => {
    const productCard = createProductCard(producto);
    productCardsElement.appendChild(productCard);
  });
}

function createProductCard(producto) {
  const { nombre, precio, imagen } = producto;

  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const imgElement = document.createElement('img');
  imgElement.src = imagen;
  imgElement.alt = nombre;
  productCard.appendChild(imgElement);

  const nameElement = document.createElement('h2');
  nameElement.textContent = nombre;
  productCard.appendChild(nameElement);

  const priceElement = document.createElement('p');
  priceElement.classList.add('price');
  priceElement.textContent = `$${precio}`;
  productCard.appendChild(priceElement);

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Agregar al Carrito';
  buttonElement.addEventListener('click', () => {
    agregarAlCarrito(nombre, precio);
  });
  productCard.appendChild(buttonElement);

  return productCard;
}

function agregarAlCarrito(nombre, precio) {
  const trago = new TragoUsuario(nombre, precio);
  carrito.push(trago);

  mostrarMensaje(`Se agregó al carrito: ${nombre}`);
  actualizarCarrito();
}

function mostrarMensaje(mensaje) {

    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: 'top',
        position: 'right'
    }).showToast();
}
function mostrarMensaje2(mensaje) {

  Toastify({
      text: mensaje,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      style: {
        background: 'red'
    }

  }).showToast();
}
function vaciarcarrito() {
  const botonvaciarcarrito = document.getElementById('vaciarcarrito');
  botonvaciarcarrito.addEventListener('click', () => {
    carrito.length = 0;
    mostrarMensaje2('Se vacio el carrito')
    actualizarCarrito();
  });
 
}
vaciarcarrito();

function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${carrito[i].tipoTrago} - $${carrito[i].precioTrago}`;
    cartItems.appendChild(li);

    total += carrito[i].precioTrago;
  }

  const liTotal = document.createElement('li');
  liTotal.textContent = `Total: $${total}`;
  cartItems.appendChild(liTotal);
}

cargarProductos();

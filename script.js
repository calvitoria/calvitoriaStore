// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");
// const { price } = require("./mocks/item");

// busca section mãe dos cards
const sectionItems = document.querySelector('.items'); 

// elemeno onde vai imprimir o preço
const valor = document.querySelector('.total-price');

// buca a ol do cart
const olCartContainer = document.querySelector('.cart__items');

// desconstrói os objetos passados |  requisito 2 2️⃣
const desconstructor = ({ id: sku, title: name, price: salePrice }) => ({ sku, name, salePrice });

// função de soma | requisito 5 5️⃣
const SumProduct = (salePrice) => {  
  const total = (Number(valor.innerText) + Number(salePrice)); // .toFixed(2); tive que tirar os decimais após a vírgola para passar no teste
  valor.innerText = total;
  saveCartItems('subTotal', valor.innerText);
};

// função de subtração | requisito 5 5️⃣
const SubProduct = (salePrice) => {
  const total = (Number(valor.innerText) - Number(salePrice)); // .toFixed(2); tive que tirar os decimais após a vírgola para passar no teste
  valor.innerText = total;
  saveCartItems('subTotal', valor.innerText); 
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// retira item do carrinho de compras | requisito 3 3️⃣
function cartItemClickListener(event) {
    const str = event.target.innerText.split('PRICE: $'); // pega o innerText do evento que foi clicado (li) e separa para pegar apenas a partir de PRICE: $
    SubProduct(str[1]); // O valor após o PRICE: $ fica na posição 2 do array. (index 1)
    event.target.remove(); // remove ítem clicado   
    saveCartItems('cartItems', olCartContainer.innerHTML); // atualiza local storage 
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// pega os valores necessário da requesição por ID| requisito 2 2️⃣
const getDataFromFetchItems = async (idItem) => {
  // O elemento com classe .cart__items deve adicionar o item escolhido, apresentando corretamente suas informações de id, título e preço.
  const fetchedItems = await fetchItem(idItem); // pega o retorno da fetchedItem (objeto)
  const formatedItems = desconstructor(fetchedItems); // passa o formatedItems como parâmetro da função que faz o desconstruction
  SumProduct(formatedItems.salePrice);
  olCartContainer.appendChild(createCartItemElement(formatedItems));// apenda o objeto na ol desejada após o elemento ser passado como parâmetro da função que puxa apenas os elementos desejados.(createCartItemElement) 
  saveCartItems('cartItems', olCartContainer.innerHTML); // salva as informações do ol dentro do local storage. Coloquei aqui nessa função pois ela é chamada na criação do botão add to cart dentro do addEventListener
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnAddToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAddToCart.addEventListener('click', () => {
    getDataFromFetchItems(sku);    
  });
  section.appendChild(btnAddToCart); 

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// cria texto 'LOADING' | requisito  7 7️⃣
const createLoadingText = () => {
  const loading = document.createElement('h4');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  sectionItems.appendChild(loading);
};

// removes LOADING text | requisito  7 7️⃣
const removesLoadingText = () => {
  sectionItems.innerHTML = '';
};

// desconstrói os objetos passados | requisito 1 1️⃣
const changeObjectKeys = ({ id: sku, title: name, thumbnail: image }) => ({ sku, name, image });

// carrega os produtos | requisito 1 1️⃣
const pushProductsIntoSection = async () => {
  // const sectionItems = document.querySelector('.items'); // busca a section
  createLoadingText(); // coloca texto 'Carregando' enquanto a API não responde
  const products = await fetchProducts('computador'); // guarda o objeto retornado do json em uma variável
  removesLoadingText(); // retira texto 'Carregando' depois da resposta da API
  const infos = products.results; // guarda array dentro do objeto retornado em uma variável
  const formatado = infos.map(changeObjectKeys); // usa o map para retornar apenas os ítens que queremos pois é passada a função changeObjectKeys. Guarda isso em uma variável
  formatado.forEach((element) => { // faz um forEach em cada obj retornado pela changeObjectKeys no array formatado(oriundo do map)
    sectionItems.appendChild(createProductItemElement(element)); // apenda cada objeto na section desejada após o elemento ser passado como parâmetro da função que gera os cards menores. 
  });
};

// limpa carrinho de compras com o botão 'limpar' | requisito  6 6️⃣
const emptiesCard = () => {
 olCartContainer.innerText = ''; // limpa o OL
 valor.innerHTML = 0; // seta o valor novamente para 0
 saveCartItems();
 localStorage.clear(); // limpa todo o carrinho e assim o local storage
};

const emptyBtn = document.querySelector('.empty-cart');
emptyBtn.addEventListener('click', () => {
  emptiesCard();
});

const addListenerOnLoad = async () => {
 const liOnload = document.querySelectorAll('.cart__item');
 liOnload.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

// função para fazer a lógica do storage
const getItemsFromLocalStorage = () => {
  const cartContainerOl = document.querySelector('.cart__items');
  const valorCarrinho = document.querySelector('.total-price');
  const cartData = window.localStorage.getItem('cartItems'); // o que deve retornAR
  const subTotal = window.localStorage.getItem('subTotal');
  if (cartData !== null && subTotal !== null) {
    cartContainerOl.innerHTML = cartData;
    valorCarrinho.innerText = subTotal;
  }
  getSavedCartItems();
};

window.onload = () => {
  pushProductsIntoSection();
  // requisito 4: chamada para aparecer os ítens do carrinho
  getItemsFromLocalStorage();
  // adciona novamente o escutador de evento
  addListenerOnLoad();
};

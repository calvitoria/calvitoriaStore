const saveCartItems = (chave, item) => {
  // const item = document.querySelector('.cart__item');
  window.localStorage.setItem(chave, item);  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

const getSavedCartItems = () => {  
  const cartData = window.localStorage.getItem('cartItems'); // o que deve retornar
  return cartData;  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

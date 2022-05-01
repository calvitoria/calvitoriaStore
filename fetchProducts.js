// requere à API as informações
const fetchProducts = async (item) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`; // https://api.mercadolibre.com/sites/MLB/search?q=computador
    const response = await fetch(url);
    const returnedObject = await response.json();
    return returnedObject;
  } catch (erro) {
    return Error('You must provide an url');
  }
};
 
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

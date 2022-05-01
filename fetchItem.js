const fetchItem = async (idItem) => {
  try {
    const url = `https://api.mercadolibre.com/items/${idItem}`; // https://api.mercadolibre.com/sites/MLB/search?q=computador
    const response = await fetch(url);
    const returnedObjectFromId = await response.json();
    return returnedObjectFromId;
  } catch (erro) {
    return Error('You must provide an url');
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

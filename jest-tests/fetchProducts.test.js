require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', async () => {
    // const actual = fetchProducts();
    expect(typeof fetchProducts === 'function').toBeTruthy();
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled(); //https://jestjs.io/pt-BR/docs/expect#tohavebeencalled 
  });
  
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint [url]', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador'); //https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  });
  
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const actual = await fetchProducts('computador');    
    expect(actual).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const actual = await fetchProducts();    
    expect(actual).toEqual(new Error('You must provide an url'));
  });

});

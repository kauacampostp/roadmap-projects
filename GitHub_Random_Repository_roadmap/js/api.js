async function randomRepository(linguagem) {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${linguagem}`);
    if(!response.ok){
      throw new Error('Network reponse was not ok');
    }
    const data = await response.json();
    if(data.items && data.items.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * data.items.length);
      return data.items[indiceAleatorio];
    } else {
      throw new Error('Nenhum repositório encontrado.');
    }
  } catch (error) {
    errorState();
    console.log('Erro:', error);
    return null;
  }
}
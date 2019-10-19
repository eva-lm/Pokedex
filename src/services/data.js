const url = "https://pokeapi.co/api/v2/pokemon/?limit=25";

const getDataFromServer = () => {
  return fetch(url).then(response => response.json());
};

export default getDataFromServer;

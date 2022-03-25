import { Pokedex } from 'pokeapi-js-wrapper';

const pokedex = new Pokedex();

const getRandomIds = () => {
  const idArray = [];

  for (let i = 0; i < 20; i += 1) {
    const randomNumber = Math.floor(Math.random() * 251) + 1;
    if (idArray.includes(randomNumber)) {
      i -= 1;
    } else {
      idArray.push(randomNumber);
    }
  }
  return idArray;
};

const pokemons = async () => {
  const array = getRandomIds();
  const mapArray = array.map((id) => {
    const pokeResponse = pokedex.getPokemonByName(id);
    return pokeResponse;
  });
  const values = await Promise.all(mapArray);
  return values;
};

export default pokemons;

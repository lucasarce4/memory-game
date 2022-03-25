import React, { useEffect, useState } from 'react';
import pokemons from './generatePokemons';

function Cards() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showPokemon, setShowPokemon] = useState([]);
  const [clickedPoke, setClickedPoke] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const generateList = async () => {
    const list = await pokemons();
    setPokemonList(list);
  };

  const checkLose = () => {
    const lastClicked = clickedPoke[clickedPoke.length - 1];
    for (let i = 0; i < clickedPoke.length - 1; i += 1) {
      if (clickedPoke[i] === lastClicked) return true;
    }
    return false;
  };

  const showSomePokemon = () => {
    const shortList = pokemonList.slice(0, 10);
    setShowPokemon(shortList);
  };

  const shuffleArray = (array) => {
    const arrayLenght = [...array].length;
    const newArray = [...array];
    // eslint-disable-next-line for-direction
    for (let i = arrayLenght - 1; i > -1; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[j];
      newArray[j] = newArray[i];
      newArray[i] = temp;
    }
    setPokemonList(newArray);
  };

  const updateClicked = (name) => {
    setClickedPoke([...clickedPoke, name]);
  };

  const handleClick = (array, name) => {
    updateClicked(name);
    shuffleArray(array);
  };

  useEffect(() => {
    generateList();
    showSomePokemon();
  }, []);

  useEffect(() => {
    showSomePokemon();
  }, [pokemonList]);

  useEffect(() => {
    if (score >= maxScore) setMaxScore(score);
  }, [score]);

  useEffect(() => {
    const state = checkLose();
    if (!state && clickedPoke.length !== 0) setScore(score + 1);
    if (state) {
      setClickedPoke([]);
      setScore(0);
    }
  }, [clickedPoke]);

  return (
    <div className="cardsContainer">
      <div className="score">
        <p>
          Max score :
          {' '}
          {maxScore}
        </p>
        <p>
          Score :
          {' '}
          {score}
        </p>
      </div>
      <div className="cards">

        {showPokemon === [] ? 'loading'
          : showPokemon.map((item, i) => (
            <div
              className="card"
              onClick={() => handleClick(pokemonList, item.name)}
              onKeyDown={() => handleClick(pokemonList)}
              role="button"
              tabIndex={i}
              key={item.name}
            >
              <img src={item.sprites.front_default} alt={item.name} />
              <h2>{item.name}</h2>
            </div>
          ))}

      </div>
    </div>
  );
}

export default Cards;

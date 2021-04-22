import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../stylesheets/layout/List.scss";


const List = props => {
  const { pokemon } = props;

  const pokeId = pokemon.map(i => i.id);
  const pokeOrdenId = pokeId.sort();


    const typeColors = {
      "bug": "rgb(45, 70, 11)",
      "dark": "rgb(10, 10, 10)",
      "dragon": "rgb(255, 115, 0)",
      "electric": "rgb(189, 201, 25)",
      "fairy": "rgb(255, 108, 132)",
      "fighting": "rgb(133, 5, 5)",
      "fire": "rgb(247, 61, 28)",
      "flying": "rgb(135, 206, 235)",
      "ghost": " rgb(136, 103, 201)",
      "grass": "rgb(70, 199, 70)",
      "ground": "rgb(56, 45, 52)",
      "ice": "rgb(8, 100, 112)",
      "normal": "rgb(173, 150, 130)",
      "poison": "rgb(94, 9, 94)",
      "psychic": "rgb(146, 125, 28)",
      "rock": "rgb(85, 83, 77)",
      "shadow":"rgb(77, 104, 131)",
      "steel": "rgb(66, 66, 66)",
      "unknown": "rgb(46, 42, 58)",
      "water": "rgb(28, 123, 160)"
    }
  return (
    <ul className="pokemon__list">
      {pokemon.map((pokemon, index) => {
        return (
          <li key={index} className="pokemon__item">
            <Link to={`/pokemon/${pokemon.id}`}>
            <Card pokemon={pokemon} typeColors={typeColors} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string
};

export default List;

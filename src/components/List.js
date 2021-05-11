import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../stylesheets/layout/List.scss";


const List = props => {
  const { pokemon } = props;

  const pokeId = pokemon.map(i => i.id);
  const pokeOrdenId = pokeId.sort();
  return (
    <ul className="pokemon__list">
      {pokemon.map((pokemon, index) => {
        return (
            <Link className="pokemon__item-link" to={`/pokemon/${pokemon.id}`}>
          <li key={index} className="pokemon__item">
            <Card pokemon={pokemon} />
          </li>
            </Link>
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

import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import "../stylesheets/layout/List.scss";

const List = props => {
  const { pokemon, search } = props;
  return (
    <ul className="pokemon__list">
      {pokemon
        .filter(pokemonFilter =>
          pokemonFilter.name.toUpperCase().includes(search.toUpperCase())
        )
        .map((pokemon, index) => {
          return (
            <li key={index} className="pokemon__item">
              <Card pokemon={pokemon} />
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

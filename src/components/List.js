import React from "react";
import Card from "./Card";
import "../stylesheets/List.scss";

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
export default List;

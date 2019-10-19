import React from "react";
import Card from "./Card";

const List = props => {
  const { pokemon } = props;
  return (
    <ul className="pokemon__list">
      {pokemon.map((pokemon, index) => {
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

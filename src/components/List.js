import React from "react";

const List = props => {
  const { pokemon } = props;
  console.log("props", props);
  return (
    <ul className="pokemon__list">
      {pokemon.map((pokemon, index) => {
        return (
          <li className="pokemon__item" key={index}>
            {pokemon.name}
          </li>
        );
      })}
    </ul>
  );
};

export default List;

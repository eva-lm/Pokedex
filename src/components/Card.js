import React from "react";

const Card = props => {
  const { pokemon } = props;
  return (
    <div className="pokemon__card">
      <h1 className="pokemon__name">{pokemon.name}</h1>
      <img className="pokemon__image" src={pokemon.image} />
      <p className="pokemon_types">{pokemon.type}</p>
    </div>
  );
};

export default Card;

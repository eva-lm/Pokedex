import React from "react";
import "../stylesheets/Card.scss";

const Card = props => {
  const { pokemon } = props;
  return (
    <div className="pokemon__card">
      <h1 className="pokemon__name">{pokemon.name}</h1>
      <p className="pokemon__id">ID: {pokemon.id} </p>
      <img
        className="pokemon__image"
        src={pokemon.image}
        alt={pokemon.name}
        title={pokemon.name}
      />
      <ul className="pokemon__types">
        {pokemon.type.map((type, index) => {
          return (
            <li className="pokemon__info-type" key={index}>
              {type}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Card;

import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/layout/Card.scss";

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

Card.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string
};

export default Card;

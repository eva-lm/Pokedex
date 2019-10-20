import React from "react";
import "../stylesheets/Filters.scss";

const Filters = props => {
  return (
    <label htmlFor="pokemon" className="filter__container">
      <input
        className="filter__name"
        onChange={props.handleSearchPokemon}
        type="text"
        value={props.search}
        name="pokemon"
        placeholder="Busca tu pokemon..."
      />
    </label>
  );
};

export default Filters;

import React from "react";

const Filters = props => {
  return (
    <label htmlFor="pokemon">
      <input
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

import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/layout/Filters.scss";

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

Filters.propTypes = {
  handleSearchPokemon: PropTypes.func.isRequired,
  search: PropTypes.string
};

export default Filters;

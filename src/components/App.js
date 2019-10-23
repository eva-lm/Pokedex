import React from "react";
import getDataFromServer from "../services/data";
import List from "./List";
import Filters from "./Filters";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      search: ""
    };
    this.handleSearchPokemon = this.handleSearchPokemon.bind(this);
  }
  componentDidMount() {
    this.getPokemonInfo();
  }

  getPokemonInfo() {
    getDataFromServer().then(data => {
      for (let pokeData of data.results) {
        fetch(pokeData.url)
          .then(response => response.json())
          .then(pokemones => {
            const newTypes = pokemones.types.map(item => {
              return item.type.name;
            });
            const pokeInfo = {
              name: pokeData.name,
              id: pokemones.id,
              image: pokemones.sprites.front_default,
              type: newTypes
            };
            this.setState({
              pokemon: [...this.state.pokemon, pokeInfo]
            });
            console.log(this.state);
          });
      }
    });
  }

  handleSearchPokemon(ev) {
    const search = ev.currentTarget.value;
    this.setState({
      search: search
    });
  }

  render() {
    const { search } = this.state;

    const pokemon = this.state.pokemon.filter(pokemonFilter =>
      pokemonFilter.name.toUpperCase().includes(search.toUpperCase())
    );
    return (
      <div className="App">
        <Filters
          search={search}
          handleSearchPokemon={this.handleSearchPokemon}
        />
        <List pokemon={pokemon} />
      </div>
    );
  }
}

export default App;

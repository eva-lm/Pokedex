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
            const typesArray = [];
            for (let pokeType of pokemones.types) {
              typesArray.push(pokeType.type.name);
            }
            const pokeInfo = {
              name: pokeData.name,
              id: pokemones.id,
              image: pokemones.sprites.front_default,
              type: typesArray
            };
            this.setState({
              pokemon: [...this.state.pokemon, pokeInfo]
            });
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
    const { pokemon, search } = this.state;
    return (
      <div className="App">
        <Filters
          search={search}
          pokemon={pokemon}
          handleSearchPokemon={this.handleSearchPokemon}
        />
        <List pokemon={pokemon} search={search} />
      </div>
    );
  }
}

export default App;

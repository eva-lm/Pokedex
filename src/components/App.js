import React from "react";
import getDataFromServer from "../services/data";
import List from "./List";
import Card from "./Card";
import "../stylesheets/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: []
    };
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

  render() {
    const { pokemon } = this.state;
    return (
      <div className="App">
        <List pokemon={pokemon} />
      </div>
    );
  }
}

export default App;

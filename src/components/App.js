import React from "react";
import List from "./List";
import Filters from "./Filters";
import PokeInfo from "./PokeInfo";
import { Route, Switch } from "react-router-dom";
import "../stylesheets/layout/App.scss";
import { fetchService, url, urlPokeTypesList, urlMorePokemon } from "../services/fetchService";

let count = 0;
let getTypes;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      search: "",
      pokeTypesList: []
    };
    this.handleSearchPokemon = this.handleSearchPokemon.bind(this);
  }

  componentDidMount() {
    this.getInitialPokemon();
  }

  getInitialPokemon() {
    fetchService(url).then(data => {
      for (let pokeData of data.results) {
        fetchService(pokeData.url)
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
          });
      }
    });

    fetchService(urlPokeTypesList).then((dataTypes) => {
      getTypes = dataTypes.results.map(i => i.name);
      this.setState({
        pokeTypesList: getTypes,
      })
    });
  }


  handleClickShowMore = async () => {
    count = count + 25;
    await fetchService(urlMorePokemon + count).then(async data => {
      for (let dataResults of data.results) {
        await fetchService(dataResults.url).then(morePokemon => {
          const pokeTypes = morePokemon.types.map(i => {
            return (
              i.type.name
            )
          })
          const newPokemons = {
            name: dataResults.name,
            id: morePokemon.id,
            image: morePokemon.sprites.front_default,
            type: pokeTypes
          };

          this.setState({
            pokemon: [...this.state.pokemon, newPokemons]
          });
        })
      }
    })


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
      <div className="app">
        <Switch>
          <Route
            exact path="/"
            render={
              () => {
                return (
                  <div>
                    <Filters
                      search={search}
                      handleSearchPokemon={this.handleSearchPokemon}
                    />
                    <List pokemon={pokemon} pokeTypesList={this.state.pokeTypesList} />
                    <div className="app__show-more-content">
                      <button className="app__show-more-btn" onMouseOver={this.handleClickShowMore}>Show More...</button>
                    </div>
                  </div>
                )
              }
            } />
          <Route path="/pokemon/:id"
            children={<PokeInfo />} />
        </Switch>
      </div>
    );
  }
}

export default App;

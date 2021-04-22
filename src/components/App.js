import React from "react";
import List from "./List";
import Filters from "./Filters";
import PokeInfo from "./PokeInfo";
import { Route, Switch } from "react-router-dom";
import "../stylesheets/layout/App.scss";


let count = 0;
let getTypes;
const url = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";

const getDataFromServer = function() {
  return (
    fetch(url).then(res => res.json())
    .catch((err) => console.log("error en fetch list", err))
  )
 };

const urlPokeTypesList = "https://pokeapi.co/api/v2/type/"
const fetchPokeTypesList = function() {
return (
  fetch(urlPokeTypesList).then(res => res.json())
  .catch((err) => console.log("error en fetch type->", err))
    )
  }

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
          });
      }
    });

    fetchPokeTypesList().then((dataTypes) =>  {
      getTypes = dataTypes.results.map(i => i.name);
      this.setState({
        pokeTypesList: getTypes,
      })
    });
  }


handleClickShowMore = async() => {
    count = count + 25;
  const urlMorePokemon = `https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${count}`;
//console.log("url", urlMorePokemon)
await fetch(urlMorePokemon).then(res => res.json()).then(async data => {
  for (let dataResults of data.results) {
    await fetch(dataResults.url).then(respose => respose.json()).then(morePokemon => {
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
  //  console.log("STATE types", this.state.pokeTypesList)
    const { search } = this.state;

    const pokemon = this.state.pokemon.filter(pokemonFilter =>
      pokemonFilter.name.toUpperCase().includes(search.toUpperCase())
    );
    return (
      <div className="app">
        <Switch>
          <Route
          exact path="/"
          render= {
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
          children = {<PokeInfo />} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from "react";
import getDataFromServer from "../services/data";
import List from "./List";
import Card from "./Card";
import "../stylesheets/App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemon: []
    };
  }

  componentDidMount() {
    getDataFromServer().then(data => {
      this.setState({
        pokemon: data.results
      });
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

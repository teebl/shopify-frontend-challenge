import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SubscribeCard from "./components/SubscribeCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SubscribeCard />
      </div>
    );
  }
}

export default App;

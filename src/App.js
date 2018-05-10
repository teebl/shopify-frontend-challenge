import React, { Component } from "react";
import "./App.css";
import SubscribeCard from "./components/SubscribeCard";

class App extends Component {
	render() {
		return (
			<div className="App">
				<SubscribeCard />
				<p>
					the code can be found{" "}
					<a href="https://www.github.com/teebl/shopify-frontend-challenge">
						here
					</a>
				</p>
			</div>
		);
	}
}

export default App;

import React, { Component } from "react";

export default class SubscribeFrom extends Component {
	constructor() {
		super();
		this.state = {
			formEntry: "",
			formField: "",
			formComplete: false
		};
	}

	render() {
		const prompt = this.state.formComplete
			? "You'll start receiving free tips and resources soon."
			: "Subscribe for free marketing tips";

		return <p>{prompt}</p>;
	}
}

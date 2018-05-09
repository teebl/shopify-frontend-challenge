import React, { Component } from "react";

export default class SubscribeCard extends Component {
	constructor() {
		super();
		this.state = {
			formEntry: "",
			formField: "",
			formComplete: false
		};
	}

	handleChange(e) {
		this.setState({ formField: e.target.value });
		console.log(this.state.formField);
	}
	render() {
		const prompt = this.state.formComplete
			? "You'll start receiving free tips and resources soon."
			: "Subscribe for free marketing tips";

		return (
			<div className="subscribeForm">
				<p>{prompt}</p>
				<input value={this.state.formField} onChange={this.handleChange} />
			</div>
		);
	}
}

import React, { Component } from "react";

export default class FormField extends Component {
	constructor(props) {
		super(props);

		this.state = { entry: "" };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ entry: e.target.value });
		console.log(this.state.entry);
	}

	submitListener() {}

	render() {
		return (
			<div className="formField">
				<form onSubmit={submitListener}>
					<input
						value={this.state.entry}
						onChange={this.handleChange}
						onSubmit={this.handleSubmit}
					/>
				</form>
			</div>
		);
	}
}

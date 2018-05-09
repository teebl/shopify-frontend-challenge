import React, { Component } from "react";
import FormField from "./FormField";

export default class SubscribeCard extends Component {
	constructor() {
		super();
		this.state = {
			formField: "",
			submittedEmail: "",
			error: "dropDown",
			newsletterCategory: "",
			formComplete: false,
			emailCheck: ""
		};
		this.submitEmail = this.submitEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectDropdown = this.selectDropdown.bind(this);
	}

	handleChange(e) {
		this.setState({ formField: e.target.value });
		console.log(this.state.formField);
	}

	handleSubmit(e) {
		e.preventDefault();
		//this lengthy regex is RFC 5322 compliant, and procured from https://www.emailregex.com
		const emailRegex = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		if (
			emailRegex.test(this.state.formField) &&
			this.state.newsletterCategory !== ""
		) {
			this.setState({ error: "" });
			this.submitEmail();
		} else if (!emailRegex.test(this.state.formField)) {
			this.setState({ error: "email" });
		} else if (this.state.newsletterCategory === "") {
			this.setState({ error: "dropdown" });
		}
	}

	submitEmail() {
		this.setState({ formComplete: true });
	}

	selectDropdown(e) {
		this.setState({ newsletterCategory: e.target.value });
		console.log(this.state.newsletterCategory);
	}

	render() {
		if (!this.state.formComplete) {
			return (
				<div className="subscribeCard">
					<h1 className="title">
						Stay up to date with ecommerce trends with Shopify's newsletter
					</h1>
					<hr width="20px" />
					<p>Subscribe for free marketing tips</p>
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							placeholder="Email Address"
							value={this.state.formField}
							onChange={this.handleChange}
						/>
						<select
							placeholder="Interested In..."
							onChange={this.selectDropdown}
						>
							<option value="" defaultValue>
								Interested in...
							</option>
							<option value="marketing">Marketing</option>
							<option value="siteDesign">Site Design</option>
							<option value="newFeatures">New Features</option>
							<option value="clientStories">Client Stories</option>
						</select>
						<ErrorMessage error={this.state.error} />
					</form>
					<SignUpButton onClick={this.handleSubmit} />
				</div>
			);
		} else {
			return (
				<div className="subscribeCard">
					<h1 className="title">
						Stay up to date with ecommerce trends with Shopify's newsletter
					</h1>
					<hr width="20px" />
					<h3>Thanks for subscribing</h3>
					<p>You'll start receiving free tips and resources soon</p>
				</div>
			);
		}
	}
}

const ErrorMessage = props => {
	switch (props.error) {
		case "dropdown":
			return (
				<div className="errorMessage">
					Please select an option from the dropdown menu
				</div>
			);
		case "email":
			return (
				<div className="errorMessage">Please enter a valid email address</div>
			);
		default:
			return null;
	}
};

const SignUpButton = props => {
	return (
		<div className="signUpButton" onClick={props.onClick}>
			Sign Up Now
		</div>
	);
};

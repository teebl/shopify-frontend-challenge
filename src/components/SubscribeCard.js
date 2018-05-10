import React, { Component } from "react";

export default class SubscribeCard extends Component {
	constructor() {
		super();
		this.state = {
			categories: [
				"Marketing",
				"Site Design",
				"New Features",
				"Client Stories"
			],
			textInput: "",
			submittedEmail: "",
			error: "",
			newsletterCategory: "",
			formComplete: false,
			loading: false
		};
		this.submitEmail = this.submitEmail.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectDropdown = this.selectDropdown.bind(this);
	}

	handleChange(e) {
		//updates state with current text in field
		this.setState({ textInput: e.target.value });
	}

	handleSubmit(e) {
		//prevent typical form behaviour
		e.preventDefault();
		//this lengthy regex is RFC 5322 compliant, and procured from https://www.emailregex.com
		const emailRegex = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		//prevent submission if already 'loading'
		if (this.state.loading) {
			return;
		} else if (
			emailRegex.test(this.state.textInput) &&
			this.state.newsletterCategory !== ""
		) {
			//email validated, carry out email submission, and clear any error message
			this.setState({ error: "" });
			this.submitEmail(this.state.textInput, this.state.newsletterCategory);
		} else if (!emailRegex.test(this.state.textInput)) {
			// validation failed, email error will be rendered
			this.setState({ error: "email" });
		} else if (this.state.newsletterCategory === "") {
			// validation passed, but no category selected. dropdown error will be rendered
			this.setState({ error: "dropdown" });
		}
	}

	submitEmail(email, category) {
		//prevent sending additional requests with 'loading' bool
		this.setState({ loading: true });

		//simulate an API request, as well as log the submitted data in the console
		setTimeout(() => {
			console.log("The submitted email address: " + email);
			console.log("The area of interest: " + category);
			this.setState({ formComplete: true, loading: false });
		}, 2000);
	}

	selectDropdown(category) {
		//defines the selected item in the dropdown menu
		this.setState({ newsletterCategory: category });
	}

	render() {
		if (!this.state.formComplete) {
			return (
				<SubscribeWrapper>
					<div className="entryForm">
						<p>Subscribe for free marketing tips</p>
						<form className="formInput" onSubmit={this.handleSubmit}>
							<div className="emailInput">
								<input
									type="text"
									placeholder="Email Address"
									value={this.state.textInput}
									onChange={this.handleChange}
								/>
								<ErrorMessage error={this.state.error} />
							</div>
							<DropdownMenu
								onChange={this.selectDropdown}
								selectedCategory={this.state.newsletterCategory}
								onClick={this.selectDropdown}
								onSubmit={this.handleSubmit}
								categories={this.state.categories}
							/>
							<SignUpButton
								onClick={this.handleSubmit}
								loading={this.state.loading}
							/>
						</form>
					</div>
				</SubscribeWrapper>
			);
		} else {
			return (
				<SubscribeWrapper>
					<h3>Thanks for subscribing</h3>
					<p>You'll start receiving free tips and resources soon</p>
				</SubscribeWrapper>
			);
		}
	}
}

const ErrorMessage = props => {
	//stateless functional component, only shows up when passed an error message from state
	//the switch is a bit much, but it would have the capacity to scale
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
	//Another stateless functional component, it will pose as a loading indicator while the fake async operation occurs
	const message = props.loading ? "Submitting..." : "Sign up now";
	return (
		<div className="signUpButton" onClick={props.onClick}>
			{message}
		</div>
	);
};

const SubscribeWrapper = props => {
	//made to avoid redundancy in typing out the return statements of subscribe card component
	return (
		<div className="subscribeCard">
			<h1 className="title">
				Stay up to date with ecommerce trends with Shopify's newsletter
			</h1>
			<hr width="20px" />
			{props.children}
		</div>
	);
};

export class DropdownMenu extends Component {
	/*rather than cleaning up and re-establishing <select>, I decided to just make my own custom dropdown
	 component in order to match the details depicted in the challenge*/
	//caret SVG courtesy of Font Awesome
	constructor(props) {
		super(props);
		this.state = {
			dropdownVisible: false
		};

		this.dropdownHandler = this.dropdownHandler.bind(this);
		this.categoryHandler = this.categoryHandler.bind(this);
	}

	dropdownHandler() {
		this.setState({ dropdownVisible: !this.state.dropdownVisible });
	}

	categoryHandler(e) {
		this.setState({ dropdownVisible: !this.state.dropdownVisible });
		this.props.onClick(e.target.innerText);
		console.dir(e.target.innerText);
	}

	render() {
		//toggles dropdown menu visibility
		const dropdownToggle = this.state.dropdownVisible
			? { display: "block" }
			: { display: "none" };
		//controls text color for default option
		const defaultTextColor = this.props.selectedCategory
			? {}
			: { color: "#7b7b7b" };
		return (
			<div className="dropdownMenu">
				<div className="dropdownSelected" style={defaultTextColor}>
					{this.props.selectedCategory || "Interested in..."}
				</div>
				<div className="dropdownArrow" onClick={this.dropdownHandler}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						viewBox="0 0 320 512"
					>
						<path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
					</svg>
				</div>
				<div className="dropdownOptions " style={dropdownToggle}>
					{this.props.categories.map(i => {
						return (
							<div
								className="dropdownOption"
								key={i}
								onClick={this.categoryHandler}
							>
								{i}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

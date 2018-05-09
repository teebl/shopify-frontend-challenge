import React, { Component } from "react";
import SubscribeForm from "./SubscribeForm";

export default class SubscribeCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="subscribeCard">
				<h1 className="title">
					Stay up to date with ecommerce trends with Shopify's newsletter
				</h1>
				<hr width="20px" />
				<SubscribeForm />
			</div>
		);
	}
}

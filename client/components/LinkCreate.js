import React from "react";

class LinkCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ""
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		Meteor.call("links.insert", this.refs.link.value, error => {
			// We can always add a callback to our meteor methods as a last argument
			if (error) {
				this.setState({
					error: "Enter a valid url"
				});
			} else {
				this.setState({
					error: ""
				});
				// After submission we want to clear the input field
				this.refs.link.value = "";
			}
		});
	}

	render() {
		return (
			<form onSubmit={event => this.handleSubmit(event)}>
				<div className="form-group">
					<label>Link to shorten</label>
					<input ref="link" className="form-control" />
				</div>
				<div className="text-danger">{this.state.error}</div>
				<button className="btn btn-primary">Shorten!</button>
			</form>
		);
	}
}

export default LinkCreate;

import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import LinkCreate from "./components/LinkCreate";
import LinkList from "./components/LinkList";

// We need to import Links to get executed immediately because we removed insecure
import { Links } from "../imports/collections/links";

const App = () => {
	return (
		<div>
			<Header />
			<LinkCreate />
			<LinkList />
		</div>
	);
};

Meteor.startup(() => {
	ReactDOM.render(<App />, document.querySelector(".render-target"));
});

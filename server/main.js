import { Meteor } from "meteor/meteor";

// We need to import Links to get executed immediately because we removed insecure
import { Links } from "../imports/collections/links";

// We need to import this to have a middleware
import { WebApp } from "meteor/webapp";

import ConnectRoute from "connect-route";

Meteor.startup(() => {
	// code to run on server at startup
	Meteor.publish("links", function() {
		return Links.find({});
	});
});

// Executed whenever a user visits with a route like localhost:3000/abcd
function onRoute(req, res, next) {
	// take the token out of the url and try to find a matching link in the links collections
	// the token from the req object we can check the params of it
	// findOne returns the first one found in the collection!!!
	const link = Links.findOne({ token: req.params.token });

	// Increment the number of clicks on the link using Mongo modifier: https://docs.meteor.com/api/collections.html#modifiers
	Links.update(link, { $inc: { clicks: 1 } });

	// if we find a link object, redirect the user to the long URL
	// 307 is the server response we send back
	if (link) {
		res.writeHead(307, { Location: link.url });
		res.end();
	} else {
		// If we don't find the long url we redirect to the normal URL
		next();
	}
}

const middleware = ConnectRoute(function(router) {
	//  This will look for requests with only a / and single set of characters
	router.get("/:token", onRoute);
});

// Create a Middleware - Middleware = functions when we run when a request comes is
WebApp.connectHandlers.use(middleware);

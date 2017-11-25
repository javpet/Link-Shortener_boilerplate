import { Mongo } from "meteor/mongo";
import { check, Match } from "meteor/check";
import validUrl from "valid-url";

Meteor.methods({
	"links.insert": function(url) {
		// if the URL is valid it returns the URL, in another case it returns undefined
		// validUrl.isUri(url);
		// We need Match to run a custom validation function
		check(url, Match.Where(url => validUrl.isUri(url)));
		// If the Match inner function passes check will return true
		// If the Match inner function is false, then check will throw error

		// If the check passes we are ready to save the URL

		// Let's generate the token
		const token = Math.random()
			.toString(36)
			.slice(-5);

		Links.insert({ url: url, token: token, clicks: 0 });
		// Links.insert({url, token, clicks: 0}) - in ES6
	}
});

export const Links = new Mongo.Collection("links");

'use strict';

var React = require('react');
// var FollowMouse = require('./FollowMouse.jsx');
var PageTransitions = require('./PageTransitions.jsx');


var App = React.createClass({
	render: function() {
		return (
			<PageTransitions />
		); 

		// return (
		// 	<FollowMouse>
		// 		View 1
		// 	</FollowMouse>
		// );
	}
});

module.exports = App;

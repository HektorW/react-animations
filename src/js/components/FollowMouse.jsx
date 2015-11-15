'use strict';

var React = require('react');
var Motion = require('react-motion').Motion;
var spring = require('react-motion').spring;
var presets = require('react-motion').presets;


/**
 * FollowMouse
 */
var FollowMouse = React.createClass({

	getInitialState: function() {
		return {
			x: 500,
			y: 500
		};
	},

	componentDidMount: function() {
		window.addEventListener('mousemove', this.onMouseMove, false);
	},

	componentWillUnmount: function() {
		window.removeEventListener('mousemove', this.onMouseMove, false);
	},


	render: function() {
		var motionConfig = presets.wobbly;

		return (
			<Motion defaultStyle={{x: 0, y: 0}} style={{x: spring(this.state.x, motionConfig), y: spring(this.state.y, motionConfig)}}>
				{value =>
					<div style={ { position: 'absolute', transform: `translate3d(${value.x}px, ${value.y}px, 0)` } }>
						{this.props.children}
					</div>
				}
			</Motion>
		);
	},

	onMouseMove: function({pageX: x, pageY: y}) {
		this.setState({x, y});
	}
});

module.exports = FollowMouse;

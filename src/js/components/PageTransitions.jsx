'use strict';

var React = require('react');
var TransitionMotion = require('react-motion').TransitionMotion;
var spring = require('react-motion').spring;
var presets = require('react-motion').presets;

const colors = [
	'#001f3f',
	'#3D9970',
	'#85144b',
	'#FF851B',
	'#111'
];

var PageTransitions = React.createClass({

	getInitialState: function() {
		return {
			pages: [{
				title: 'Page 1'
			}, {
				title: 'Page 2'
			}, {
				title: 'Page 3'
			}, {
				title: 'Page 4'
			}, {
				title: 'Page 5'
			}],
			selectedIndex: 0,
			direction: 1
		};
	},

	componentDidMount: function() {
		window.addEventListener('keydown', this.onKeyDown, false);
	},

	componentWillUnmount: function() {
		window.removeEventListener('keydown', this.onKeyDown, false);
	},

	getPageStyles: function() {
		const config = {};
		const selected = this.state.pages[this.state.selectedIndex];

		config[this.state.selectedIndex] = {
			y: spring(0, presets.wobbly),
			title: selected.title
		};

		return config;
	},

	willEnter: function(key) {
		return {
			y: spring(this.state.direction, presets.wobbly),
			title: this.state.pages[key].title
		};
	},

	willLeave: function(key, style) {
		return {
			y: spring(this.state.direction * -1, presets.wobbly),
			title: style.title
		};
	},


	render: function() {

		return (
			<div className="page-transitions">
				<TransitionMotion
					styles={this.getPageStyles()}
					willEnter={this.willEnter}
					willLeave={this.willLeave}
					>
					{interpolatedStyles => 
						<div className="page-transitions__container" style={{ 'background-color': colors[this.state.selectedIndex] }}>
							{Object.keys(interpolatedStyles).map(key => {
								const values = interpolatedStyles[key];
								const className = `page-transitions__page page-transitions__page--nth-${key}`;
								return (
									<div key={key} className={className} style={{ transform: `translate3d(0, ${values.y * window.innerHeight}px, 0)` }}>
										{values.title}
									</div>
								);
							})}
						</div>
					}
				</TransitionMotion>
			</div>
		);
	},

	nextPage: function() {
		if (this.state.selectedIndex < this.state.pages.length - 1) {
			this.setState({ selectedIndex: this.state.selectedIndex + 1, direction: 1 });
		}
	},
	previousPage: function() {
		if (this.state.selectedIndex > 0) {
			this.setState({ selectedIndex: this.state.selectedIndex - 1, direction: -1 });
		}
	},

	onKeyDown: function(event) {
		if (event.keyCode === 38) {
			this.previousPage();
		} else if (event.keyCode === 40) {
			this.nextPage();
		}
	}
});

module.exports = PageTransitions;

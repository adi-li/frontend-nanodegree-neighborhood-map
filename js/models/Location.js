define([
	'goog!maps,3,other_params:sensor=false'
], function(){
	'use strict';

	var Location = function(position, title) {
		var self = this;

		// `position` is an object containing lat and lng key.
		this.position  = position;

		this.title = title;

		this.marker = new google.maps.Marker({
			position: self.position,
			title: self.title
		});
	};

	return Location;
});
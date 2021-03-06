define([
	'jquery',
	'knockout',
	'collections/Locations',
	'models/Location',
	'libs/ImageSearcher',
	'config',
	'libs/detectmobilebrowser',
	'goog!maps,3,other_params:sensor=false'
], function($, ko, locations, Location, ImageSearcher, config){
	'use strict';

	var MapViewModel = function() {
		var self = this;
		var searcher = new ImageSearcher(config.googleAPIKey, config.customSearchEngineID);

		// Create map
		this.map = new google.maps.Map($('.map')[0], {
			center: {
				lat: 22.31931,
				lng: 114.16893
			},
			zoom: 14
		});

		// Filtering locations by query
		this.query = ko.observable('');

		// Copy the locations to observableArray
		this.filteredLocations = ko.observableArray(locations.slice());

		// Filter locations when `query` is updated
		this.query.subscribe(function(newQuery) {
			newQuery = newQuery || '';
			var query = newQuery.toLowerCase();

			self.filteredLocations.removeAll();
			locations.forEach(function(location){
				var marker = location.marker;
				if (!newQuery || location.title.toLowerCase().indexOf(query) > -1) {
					marker.setVisible(true);
					self.filteredLocations.push(location);
				} else {
					// Set highlightedMarker to null if the marker is no longer visible
					if (self.highlightedMarker() == marker) {
						self.highlightedMarker(null);
					}
					marker.setVisible(false);
				}
			});
		});

		// Show marker info
		this.infowindow = new google.maps.InfoWindow();

		this.infowindow.addListener('closeclick', function(){
			// Set highlightedMarker to null if the infowindow is closed
			self.highlightedMarker(null);
		});

		// Highlighted Marker
		this.highlightedMarker = ko.observable(null);

		this.highlightedMarker.subscribe(function(newMarker){
			// Animate and set content for the newMarker
			locations.forEach(function(location){
				var marker = location.marker;
				if (newMarker == marker) {
					// Bounce the marker if it is highlighted
					marker.setAnimation(google.maps.Animation.BOUNCE);

					// Use Google Custom Search API to get the first image for the title
					var errorMsg = location.title + '<br>No image available';
					self.infowindow.setContent(location.title + '<br>Loading image...');

					searcher.search(
						location.title
					).done(function(data){
						// search success callback
						if (!data || !data.items || data.items.length == 0) {
							if (data && data.error) {
								self.infowindow.setContent(location.title + '<br>' + data.error.code + ': ' + data.error.message);
							} else {
								self.infowindow.setContent(errorMsg);
							}
						} else {
							self.infowindow.setContent(location.title + '<br><img class="infowindow-img" src="' + data.items[0].link + '">');
						}
					}).fail(function(){
						// search fail callback
						self.infowindow.setContent(errorMsg);
					});

				} else {
					// remove animation if not the newMarker
					marker.setAnimation(null);
				}
			});

			if (newMarker != null) {
				// Show the infowindow if marker is highlighted
				self.infowindow.open(self.map, newMarker);
				// Center the marker in map
				var latLng = newMarker.getPosition();
				self.map.panTo(latLng);
			} else {
				self.infowindow.close();
			}
		});

		this.showMarkerInfo = function(data) {
			//
			if (data instanceof Location) {
				self.highlightedMarker(data.marker);
			} else {
				self.highlightedMarker(data);
			}
			self.hideLocationsList();
		};

		// List view control
		this.isLocationsListOpen = ko.observable(false);

		// Show list view
		this.showLocationsList = function() {
			this.isLocationsListOpen(true);
		};

		// Hide list view
		this.hideLocationsList = function() {
			this.isLocationsListOpen(false);
		};

		// Final init view models

		// Get the suitable listener name
		var event_name = $.browser.mobile ? 'mousedown' : 'click';
		locations.forEach(function(location){
			// Pin all markers to the map
			location.marker.setMap(self.map);
			// Attach click listener when
			location.marker.addListener(event_name, function(){
				var marker = this;
				self.showMarkerInfo(marker);
			});
		});
	};

	return MapViewModel;
});

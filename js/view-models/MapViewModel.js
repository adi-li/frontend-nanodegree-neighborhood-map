define([
	'jquery',
	'knockout',
	'collections/Locations',
	'models/Location',
	'libs/ImageSearcher',
	'config',
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
					self.infowindow.setContent(location.title + '<br>Loading image...');
					searcher.search(location.title).success(function(data){
						if (data.items.length == 0) {
							self.infowindow.setContent(location.title + '<br>No image available');
						} else {
							self.infowindow.setContent(location.title + '<br><img style="width:100%" src="' + data.items[0].link + '">')
						}
					}).error(function(){
						self.infowindow.setContent(location.title + '<br>No image available');
					});

				} else {
					// remove animation if not the newMarker
					marker.setAnimation(null);
				}
			});

			// Show the infowindow if marker is highlighted
			if (newMarker != null) {
				self.infowindow.open(self.map, newMarker);
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

		// Show/hide list view
		this.showLocationsList = function(data, event) {
			event.cancelBubble = true;
			if (event.stopPropagation) event.stopPropagation();
			var $markersList = $('.locations-list:first');
			var left = parseInt($markersList.css('left'));
			if (left != NaN) {
				$markersList.animate({left: 0});
			};
		};

		this.hideLocationsList = function(data, event) {
			var $markersList = $('.locations-list:first');
			var left = parseInt($markersList.css('left'));
			var width = parseInt($markersList.css('width'));
			if (left != NaN) {
				$markersList.animate({left: -width});
			};
		};

		// Final init view models
		// Pin all markers to the map
		locations.forEach(function(location){
			location.marker.setMap(self.map);
			location.marker.addListener('click', function(){
				var marker = this;
				self.showMarkerInfo(marker);
			});
		});
	};
	
	return MapViewModel;
});

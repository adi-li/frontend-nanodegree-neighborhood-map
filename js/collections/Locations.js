define([
	'models/Location'
], function(Location){
	'use strict';

	var locations = [],
		data = [
			{
				position: {
					lat: 22.31951,
					lng: 114.16928
				},
				title: 'Mong Kok MTR Station'
			},
			{
				position: {
					lat: 22.32215,
					lng: 114.17256
				},
				title: 'Mong Kok East MTR Station'
			},
			{
				position: {
					lat: 22.32507,
					lng: 114.16851
				},
				title: 'Prince Edward MTR Station'
			},
			{
				position: {
					lat: 22.31292,
					lng: 114.17078
				},
				title: 'Yau Ma Tei MTR Station'
			},
			{
				position: {
					lat: 22.31469,
					lng: 114.17224
				},
				title: 'Kwong Wah Hospital'
			},
			{
				position: {
					lat: 22.30877,
					lng: 114.17417
				},
				title: 'Queen Elizabeth Hospital'
			},
			{
				position: {
					lat: 22.32316,
					lng: 114.16842
				},
				title: 'Golden Plaza'
			}
		];

	data.forEach(function(location){
		locations.push(new Location(location.position, location.title));
	});

	return locations;
});
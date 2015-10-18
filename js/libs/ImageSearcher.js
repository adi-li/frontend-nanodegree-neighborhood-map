define([
	'jquery'
], function($){
	'use strict';

	var ImageSearcher = function(APIKey, searchEngineID) {
		var self = this;

		this.baseURL = 'https://www.googleapis.com/customsearch/v1?searchType=image&imgSize=medium&key=' + APIKey + '&cx=' + searchEngineID;

		// This will return a jQuery.promise object that
		// getting query result from the Google Custom Search REST API
		this.search = function(query) {
			var ajax = $.ajax({
				url: self.baseURL + '&q=' + encodeURIComponent(query),
				dataType: 'jsonp'
			});
			return ajax;
		};
	};

	return ImageSearcher;
});
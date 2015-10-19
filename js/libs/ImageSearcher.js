define([
	'jquery'
], function($){
	'use strict';

	var ImageSearcher = function(APIKey, searchEngineID) {
		var self = this;

		this.apiKey = APIKey;
		this.searchEngineID = searchEngineID;
		this.baseURL = 'https://www.googleapis.com/customsearch/v1';

		// This will return a jqXHR object that
		// getting query result from the Google Custom Search REST API
		this.search = function(query) {
			var ajax = $.ajax({
				url: self.baseURL,
				data: {
					key: self.apiKey,
					cx: self.searchEngineID,
					searchType: 'image',
					imgSize: 'medium',
					q: query
				},
				dataType: 'jsonp'
			});
			return ajax;
		};
	};

	return ImageSearcher;
});
require.config({
    paths: {
        async: '/bower_components/requirejs-plugins/src/async',
        font: '/bower_components/requirejs-plugins/src/font',
        goog: '/bower_components/requirejs-plugins/src/goog',
        propertyParser: '/bower_components/requirejs-plugins/src/propertyParser',
        jquery: '/bower_components/jquery/dist/jquery.min',
        knockout: '/bower_components/knockout/dist/knockout'
    }
});

requirejs([
	'knockout',
	'view-models/MapViewModel',
], function(ko, MapViewModel) {
    ko.applyBindings(new MapViewModel());
});
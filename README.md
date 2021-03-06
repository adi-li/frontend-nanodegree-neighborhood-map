## Neighborhood Map

#### How to run?

1. Prepare your Google API key from from [Console](https://console.developers.google.com)
1. Enable the *Custom Search API* inside the console.
1. Create your own Custom Search Engine from [Google Custom Search Engine](https://cse.google.com/cse)
	Fill in any website in *Sites to search* section when creating the engine.
1. Enable *Image search* and select *Search the entire web but emphasize included sites* inside the engine setup.
1. Replace the key and the ID in the `js/config.js.template`, and rename it to `js/config.js`.
1. Go to the project directory and run a simple HTTP server by `python -m SimpleHTTPServer 8000`.
1. Open browser and go to [http://localhost:8000](http://localhost:8000).


#### How to use?

###### Desktop

1. Filter the location by entering keyword in the search bar.
1. Click the result to show the image from Google image search on the map.

###### Mobile

1. Click the burger button to show the search bar.
1. Filter the location by entering keyword in the search bar.
1. Click the result to show the image from Google image search on the map.


#### Reference Link

* [Custom Search API](https://developers.google.com/custom-search/json-api/v1/using_rest)

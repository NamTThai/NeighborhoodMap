## Neighborhood Map project

The project is not battery-included. Please get a developer API key from Yelp.

### How to run the application

The application is run using Express framework for Node.js.

1. Install Node.js `~0.12.7`. I haven't tested new versions of Node yet.
1. The project uses gulp as the task runner and bower as front-end dependency manager. Install gulp and bower with npm: `npm install -g gulp` `npm install -g bower`
1. Navigate to project's root and run `npm install` and then `bower install`
1. Besides Google Maps API, the project also uses Yelp API. Please get a developer API key (instruction in the corresponding section)
1. Start the application with `gulp build`. The distributed version of the application is located in the `build` directory. The default port is 3000. It can be changed by setting `NODE_ENV` environment variable. The application can be accessed from a web browser at `localhost:3000/neighborhood-map/``

### How to get a developer API key from Yelp

Navigate to `https://www.yelp.com/developers/manage_api_keys` to get an API key from yelp. Afterwards, open the file named `data\yelp-oauth.json` and provide the following information:

```
{
  "consumer_key": "YOUR CONSUMER KEY HERE",
  "consumer_secret": "YOUR CONSUMER SECRET HERE",
  "token": "YOUR TOKEN HERE",
  "token_secret": "YOUR TOKEN SECRET HERE"
}
```

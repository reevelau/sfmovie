# San Francisco Movies

Create a service that shows on a map where movies have been filmed in San
Francisco. The user should be able to filter the view using autocompletion
search.

The data is available on [DataSF](http://www.datasf.org/): [Film
Locations](https://data.sfgov.org/Arts-Culture-and-Recreation-/Film-Locations-in-San-Francisco/yitu-d5am).

# Problem and Solution

To build a service, there are some problems to be solved, the map, the data set of the movies and the autocompletion search mechanism are the main topics to be discussed. And javascript and fullstack development are also the main theme of this project. So non javascript and front end only solution will not be discussed here.

## The Map

In order to pinpoint a location on a map, the latitude and longitude of the location has to be known. Given a full or partial address, a service is required to translate the information into map geographic coordinates (latlong). And also we need a service to display the San Francisco map on the user interface.

## The Movie Data Set

The data set has a web api for consumption. There are 2 problems here. Firstly, the [Json API](https://data.sfgov.org/resource/wwmu-gmzc.json) returns a list of object, but every object has to be identified by multiple of fields, e.g "title" + "locations". This will bring additional complexity to the code if it is used directly. Seconldly, though, it is consider as a relatively minor, the given API url will be return a full list of data. Extra URL param (e.g. $limit=2000) inorder to get the full (as of writing) 1,622 records.

## Autocompltion Search

One every user input, a search on all movies title and find a list of title that contains the input string. At last, presents the list of movie title under the search box for user to pick up any one. Once user picked up a movie title, the map should present all the locations where the movie has been filmed.

# My Solution

A fullstack solution will be built to solve the problems memtioned above. The solution will focus on extensibility in feature set and scalability in number of user that the system support. 

To begin a server models will be built to store a transformed movie data. Initially, all locations that belongs to the same movie will be grouped together. The server models will be well structured and benefit the development of frontend code. Also, the models will make the system less fragile on the change of the external api. In additional to the backend models, a REST API will also be provided for the frontend web application to consume. This REST API provides a contractual relationship between frontend and backend, and making both sides fairly easy to extend. 

Then the application will be hosted in Google App Engine which provides the best of its kind cloud hosting service. One of the greatest feature of the service is the ability to add in more computation instances on traffic usage. Our application will just scale naturally on the infrastructure.

# Techical Choice

**[Google Maps API](https://developers.google.com/maps/?hl=zh-tw)**

A public API from Google to provide Maps and Geo information service

**[Sailsjs](https://sailsjs.com/)**

A nodejs MVC framework base on Express. It provids out of the box REST API building block and ORM of various database.
The REST API aforementioned is also hosted by Sailsjs

`https://sf-movies-191519.appspot.com/movie?limit=2000` 

**[sails-react-webpack](https://github.com/markmur/sails-react-webpack)**

A boilerplate command line tool for scaffolding Sails apps with React frontend.

**[reactjs](https://reactjs.org/)**

A frontend library to provide View (of MVC) capability.

**[react-autcomplete](https://github.com/reactjs/react-autocomplete)**

A React component to provide configurable autocomplete input box.

**[google-maps-react](https://github.com/fullstackreact/google-maps-react)**

A Google Maps API React wrapper, with this, it is really ease to use Google Maps API.

# TODO
1. Connecting to a read Database, currently the app is using sails-disk ORM adapter which is based on [nedb](https://github.com/balderdashy/sails-disk). Which is good for development, but bad for performance.

2. Provide more filter for user to search, like actor's name, director's name and etc.

3. More tests

# Link to App
https://sf-movies-191519.appspot.com/

# Development

## Prerequisites

All you need is nodejs 6.10 or above

## Installing Dependency

```
npm install
```

## Running for development

```
node run local
```

Wait for a minute or a cup of coffee

Open http://localhost:8080/ on your favorite browser.

## Running the tests

```
npm run test
```

## Deployment

1. Open Google App Engine Console
2. Git clone this repository from Github
3. `cd sfmovies`
4. `npm install`
5. `npm run dist`
6. `gcloud app deploy`

## Authors

* **Reeve lau**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
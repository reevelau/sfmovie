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

A fullstack solution will be built to solve the problems memtioned above. To protect our frontend logic, a server models will be built to store the transformed movie data. At least, all locations that belongs to the same movie will be grouped together. The server models will be well structure and benefit the development of frontend code. Also, the models will make the system less fragile on the change of the external api. In additional to the backend models, a REST API will also be provided for the frontend web application to consume. This REST API provides a contractual relationship between frontend and backend, and making both sides fairly easy to extend.

# Techical Choice

[Google Maps API](https://developers.google.com/maps/?hl=zh-tw)

[Sailsjs](https://sailsjs.com/)


[reactjs](https://reactjs.org/)
[react-autcomplete](https://github.com/reactjs/react-autocomplete)

# TODO
FILL_IN_THIS_BLANK Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

# Link to App
FILL_IN_THIS_BLANK Link to to the hosted application where applicable.
https://sf-movies-191519.appspot.com/


## Use of npm module

front end
google-maps-react
https://github.com/fullstackreact/google-maps-react

usages
build a react component to turn Film Location into latlng data and then present in google map. Highlevel workflow
1. parent passes list of locations in
2. translate the location string into latlong value using google geocode api
3. present the locations using Marker
4. create InfoWindow to present the movie information when user click one of Marker

react-autocomplete
https://github.com/reactjs/react-autocomplete

usages
1. On user changing input box value
2. send a request to /movie?ihere={"title":{"contains":"${[search text]}"}} to backend
3. present the list of movie title to a drop down menu of the input box
4. On every new selected value, update the google map

backend

sails-react-webpack
https://github.com/markmur/sails-react-webpack

usages

api server

orm


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
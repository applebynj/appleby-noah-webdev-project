var app = require("../../express");
var https = require("https");
var querystring = require('querystring');

app.get("/api/google/place/:placeId", findPlaceById);
app.get("/api/google/place/search", findPlaceByTextSearch);

var apiKey = 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk'; //TODO: replace with environment variable
var googleMapsHost = 'https://maps.googleapis.com';
var googlePlacesBaseUrl = '/maps/api/place/';

function findPlaceById(req, res) {
    var placeId = req.params.placeId;
    googlePlaceQueryById(placeId)
        .then(function(response){
            res.json(response);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function findPlaceByTextSearch(req, res) {
    var searchText = req.body.searchText;
    googlePlaceSearchQuery(searchText)
        .then(function(response){
            res.json(response);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function googlePlaceQueryById(placeId) {
    return $http.get({
        host: googleMapsHost,
        path: googlePlacesBaseUrl + 'details/json?placeid=' + placeId,
        headers: {
            "Accept": "application/json",
            "app_key": apiKey
        }
    }, digestResponse(response));
}

function googlePlaceSearchQuery(searchText) {
    return $http.get({
        host: googleMapsHost,
        path: googlePlacesBaseUrl + 'details/json?textSearch=' + searchText,
        headers: {
            "Accept": "application/json",
            "app_key": apiKey
        }
    }, digestResponse(response));
}

function digestResponse(response){
    var deferred = q.defer();

    var body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {
        try {
            body = JSON.parse(body);
            deffered.resolve(body);
        } catch(e) {
            deferred.reject({error: e});
        }
    })
}
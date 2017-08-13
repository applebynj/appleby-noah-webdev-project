var q = require("q");
var app = require("../../express");
var https = require("https");
var querystring = require('querystring');

app.get("/api/google/place/:placeId", findPlaceById);
app.get("/api/google/place/search/:searchText", findPlaceByTextSearch);

var apiKey = 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk'; //TODO: replace with environment variable
var googleMapsHost = 'maps.googleapis.com';
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
    var searchText = req.params.searchText;

    googlePlaceSearchQuery(searchText)
        .then(function(response){
            res.json(response);
        }, function(err) {
            res.sendStatus(404).send(err);
        });
}

function googlePlaceQueryById(placeId) {
    var deferred = q.defer();
    https.get({
        host: googleMapsHost,
        path: googlePlacesBaseUrl + 'details/json?placeid=' + placeId + "&key=" + apiKey,
        headers: {
            "Accept": "application/json",
            // "app_key": apiKey
        }
    }, function(response){
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        })
    });

    return deferred.promise;
}

function googlePlaceSearchQuery(searchText) {
    var deferred = q.defer();

    https.get({
        host: googleMapsHost,
        path: googlePlacesBaseUrl + 'textsearch/json?query=' + searchText+ "&key=" + apiKey,
        headers: {
            "Accept": "application/json",
            // "app_key": apiKey
        }
    }, function(response){
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        })
    });

    return deferred.promise;
}
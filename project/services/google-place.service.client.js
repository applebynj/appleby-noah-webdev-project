var app = require("../../express");
var https = require("https");
var querystring = require('querystring');

var places = [

];

app.get("/api/google/place/:placeId", findPlaceById);
app.get("/api/google/place/search", findPlaceByTextSearch);


function findPlaceById(placeId) {
/*  TODO: Need to make these calls a different way than on the front end (below is the call for reference

    var url = 'https://maps.googleapis.com/maps/api/place/details/' +
        'json?placeid=' + placeId +
        '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
    //TODO: destroy this key and set as var in heroku instead
    return $http.get(url);*/

}

function findPlaceByTextSearch(searchText) {
    /*  TODO: Need to make these calls a different way than on the front end (below is the call for reference

     /*     var url = 'https://maps.googleapis.com/maps/api/place/textsearch/' +
        'json?query=' + searchText +
        '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
     //TODO: destroy this key and set as var in heroku instead
     return $http.get(url);*/
}

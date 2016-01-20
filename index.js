/**
 * Created by Tazrian Haider Rafi on 11/11/2015.
 */
var http = require('http');
var util = require('util');
var path = require('path');
var express = require('express');
var beautify = require('js-beautify').js_beautify;
var parseString = require('xml2js').parseString;



var app = express();

app.use(express.static('public'));

app.listen(3000, function() {
    console.log('listening to port localhost:3000');
});

app.get('/v1/wine_search/', function(req, resource) {
    var foodTypeTranslation = {
        'meat':3008,
        'cheese':3009,
        'dessert':3010,
        'pasta':3011,
        'poultry':3012,
        'seafood':3013,
        'other':3008
    }

    var wineColorTranslation = {
        'red': 124,
        'white':125,
        'rose':126
    }

    var wineVarietalTranslation = {
        'CabernetSauvignon': 139,
        'Chardonnay':140,
        'SauvignonBlanc':151,
        'PinotGris':194,
        'PinotNoir':143
    }



    var catList = [];

    var foodType= JSON.parse(req.query[1]);
    var categoryNumber = foodTypeTranslation[foodType.value];
    catList.push(categoryNumber);

    console.log(req.query);
    console.log(req.query.length);
    var arrayLength = req.query.length;

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            console.log(req.query[key]);
            var wineQuery= JSON.parse(req.query[key]);
            console.log(wineQuery);
            if (wineQuery.name == 'color'){
                catList.push(wineColorTranslation[wineQuery.value]);
            }
            if (wineQuery.name == 'selectWineVarietal'){
                catList.push(wineVarietalTranslation[wineQuery.value]);
            }
        }
    }

    //for (var i = 0; i < arrayLength; i++) {
    //        console.log(req.query[i]);
    //        var wineQuery= JSON.parse(req.query[i]);
    //        console.log(wineQuery);
    //        if (wineQuery.name == 'color'){
    //            catList.push(wineColorTranslation[wineQuery.value]);
    //        }
    //        if (wineQuery.name == 'varietal'){
    //            catList.push(wineColorTranslation[wineQuery.value]);
    //        }
    //
    //}

    //if (typeof req.query[2] != "undefined") {
    //    console.log(req.query[2]);
    //    var wineVarietal= JSON.parse(req.query[2]);
    //    var wineVarietalNumber = wineVarietalTranslation[wineVarietal.value];
    //    catList.push(wineVarietalNumber);
    //
    //}


    var query="";

    for (var i = 0; i < catList.length; i++) {
        query =  query + "+" + catList[i]
    }

    query= query.substr(1);


    console.log(query);
    var wine;
    http.get("http://services.wine.com/api/beta2/service.svc/json/catalog?filter=categories(" + query +")&apikey=c10347af788d3f1b6bcfa73687ca74a2", function(res) {
        var jsonString="";
        res.on('data', function (chunk) {
            jsonString += chunk;
        });
        res.on('end', function(){
            var obj = JSON.parse(jsonString);
            resource.status(200).send(obj);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    })
})





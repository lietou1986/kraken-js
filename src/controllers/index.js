'use strict';
var Cookier = require('../utils/cookier');
var DataHandler = require('./datahandler');

exports.index = function (req, res) {

    var cookier = new Cookier(req, res);
    var dataHandler = new DataHandler(req, res);
    var jobLocation = '530';
    var cJobLocation = cookier.get(appSettings.cookies.lastCityId);
    if (tools.isNotNullOrEmpty(cJobLocation)) jobLocation = cJobLocation;
    var viewData = {
        searchHistory: dataHandler.getSearchHistory(),
        jobTypeHtml: dataHandler.getJobTypeHtml(),
        jobLocation: jobLocation
    };

    res.render('index', viewData);
};


exports.error = function (req, res) {

    res.render('errors/500');
};

exports.nofound = function (req, res) {

    res.render('errors/404');
};




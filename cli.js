#!/usr/bin/env casperjs
// Simple scrapper that read traffic from http://www.alexa.cn/?url=[query]
// [NOTE] This is not node script but phantom!

var args = require('system').args;
var site = args[args.length-1];
var query = "http://www.alexa.cn/?url=" + site;
var numeral = require('numeral');

var fs = require('fs');
var path = require('path');

var casper = require('casper').create({
  clientScripts: [
    'node_modules/jquery/dist/jquery.min.js'
  ]
});

console.log("querying for traffic of...", site);

// load the website page
casper.start(query, function onPageLoad(status) {
  this.echo(this.evaluate(function clientSideCode() {
    return $(".info2.liw0").text();
  }).replace(/\d+/g, function(traffic){
    return numeral(+traffic).format('0a');
  }));
});

casper.run(function(){
  this.exit();
});
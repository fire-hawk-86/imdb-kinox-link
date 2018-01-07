// ==UserScript==
// @name        imdb kinox.to link
// @namespace   firehawk86
// @include     http://www.imdb.com/title/*
// @version     1
// @grant       none
// ==/UserScript==

// read
var movieId = document.querySelector("meta[property='pageId']").getAttribute('content');

// construct
var zNode       = document.createElement ('div');
zNode.innerHTML = '<a href="http://kinox.to/Search.html?q=' + movieId + '">'
                + 'kinox</a>'
                ;
zNode.setAttribute ('id', 'myContainer');

// write
document.querySelector('.showtime.full-table').appendChild (zNode);

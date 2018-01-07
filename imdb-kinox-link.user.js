// ==UserScript==
// @name        imdb - kinox link
// @namespace   firehawk86
// @include     http://www.imdb.com/title/*
// @version     1.0.5
// @grant       none
// ==/UserScript==

var movieId = document.querySelector("meta[property='pageId']").getAttribute('content');

var kinox = document.createElement("div");

kinox.setAttribute('title', 'Kinox');
kinox.setAttribute('class', 'watch-option secondary-watch-option has-watchoptions');
kinox.setAttribute('data-href', '');
kinox.setAttribute('data-optiontype', 'instant');
kinox.setAttribute('onClick', "javascript:window.open('http://kinox.to/Search.html?q="+movieId+"', '_blank')");

kinox.innerHTML =`
    <div class="watch-icon instant"></div>
    <div class="secondary-info">KINOX</div>
`;

document.querySelector('.showtime.full-table').appendChild(kinox);

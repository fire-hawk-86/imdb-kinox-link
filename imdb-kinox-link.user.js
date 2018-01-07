// ==UserScript==
// @name        imdb - kinox link
// @namespace   firehawk86
// @include     http://www.imdb.com/title/*
// @version     1.1
// @grant       none
// ==/UserScript==

/*******************************************************************
* What it does:                                                    *
* Creating nice looking links on IMDB pages which refer to (open)  *
* Kinox streaming sites                                            *
*******************************************************************/

// get the IMDB title ID (example tt1234567)
var movieId = document.querySelector("meta[property='pageId']").getAttribute('content');

// if watch bar is available
if ( document.querySelector('.watchbar2') != null ) {
    
    // create Kinox link
    
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
    
    // add Kinox link to bar
    
    document.querySelector('.showtime.full-table').appendChild(kinox);
}

// if watchbar is missing
else {
    
    // create a new bar with Kinox link
    
    var bar = document.createElement("span");
    bar.setAttribute('class', 'ab_widget');
    bar.innerHTML =`
        <div class="watchbar2 article" style="border-top: 1px solid #CCC;">
            <div class="showtime  full-table">
                <div onClick="javascript:window.open('http://kinox.to/Search.html?q=`+movieId+`', '_blank')" class="winner-option watch-option " data-offsite="1" data-href="" title="Watch Now">
                    <div id="watchbar2" class="watch-icon winner provider amazon-instant-video" jsz4x73="" hidden="">
                    </div>
                    <div class="info table-cell">
                        <h2>
                           <a href="//kinox.to" class="segment-link " target="_blank"> Kinox </a>
                        </h2>
                        <p>Watch Now</p>
                    </div>
                </div>
                <script type="text/javascript">
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST","/tr/",true);
                    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    xmlhttp.send("ref_=tt_wbr_aiv&pt=title&spt=main&pageAction=showing-aiv&ht=actionOnly");
                </script>
            </div>
        </div>
    `;
    
    // add bar
    
    document.querySelector('#title-overview-widget').appendChild(bar);
}

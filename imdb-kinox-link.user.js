// ==UserScript==
// @name        imdb - kinox link
// @namespace   firehawk86
// @include     http://www.imdb.com/title/*
// @version     1.3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*******************************************************************
* What it does:                                                    *
* Creating nice looking links on IMDB pages which refer to (open)  *
* Kinox streaming sites                                            *
*******************************************************************/

// switches (Change this value if you want to either 'false' or 'true')

// If set to true, this script won't check the kinox.to page if the movie is available or not
var silent_mode = false;

// get the IMDB title ID (example tt1234567)
var movieId = document.querySelector("meta[property='pageId']").getAttribute('content');

function create_a_link() {
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
}

if (silent_mode == false) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://kinox.to/Search.html?q="+movieId,
      onload: function(response) {
          // write the retrieved HTML data from Kinox to a DOM variable
          var kinoxHtml = document.createElement("html");
          kinoxHtml.innerHTML = response.responseText;

          // If at least one element with the class "Year" exists on the Kinox page
          // then the movie is available
          var availableOnKinox = kinoxHtml.getElementsByClassName("Year")[0];
          if(availableOnKinox) {
              create_a_link();
          }
      },
      ontimeout: function(response) {
         // create a link anyway
         create_a_link();
         // make error visible
         var elements = document.querySelectorAll("div.secondary-info");
         for (i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML == "KINOX") {
               elements[i].innerHTML = "Connection Error"
            }
         }
      },
      onerror: function(response) {
         // create a link anyway
         create_a_link();
         // make error visible
         var elements = document.querySelectorAll("div.secondary-info");
         for (i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML == "KINOX") {
               elements[i].innerHTML = "Connection Error"
            }
         }
      }
    });
}
else {
    create_a_link();
}

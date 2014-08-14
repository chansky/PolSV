/**
 * Meteor Rider
 * ===================
 *
 * This script is to facilitate an easy means of "taking over" or "hijacking"
 * a HTML page, with a Meteor app.
 *
 * Use Case
 * ----------------
 * The Use Case for this, is for a PhoneGap application.  On the device, you
 * load a basic HTML file, and it initializes the phone and device specific JS.
 * Then you use Meteor Rider to connect to your Meteor backend and "take over"
 * the HTML.
 *
 * Requirements
 * ----------------
 * jQuery or Zepto are required, because I'm lazy and want to use their API for
 * AJAX+DOM
 *
 * Gotchas
 * ----------------
 * Cross Origin Request Security doesn't allow this in a browser,
 *   but PhoneGap does, and if we can inject CORS headers into Meteor it might
 *   work in a browser sometime
 * Meteor Rider can not remove CSS... so anything loaded on the root page, remains.
 *
 *
 *
 */

//define('MeteorRider', ['jquery'], function($) {
var MeteorRider = {
  init: function() {
              var __MeteorRiderConfig__ = {
            // Your production meteor app
            meteorUrl:  "http://lunch-o-meter.herokuapp.com",
            
            // Your local dev meteor server url                        
            //meteorUrl:  "http://192.168.1.XX:3000",

            // track Cordova version, bump this after a `cordova update <platform>`
            phonegapVersion: 3.5,

            // make sure to bump this along with /www/config.xml version and build
            // to update xcodes version number. AppStore also requires >= 1.0 on submission
            phonegapAppVersion: 0.1
          };
              var meteorUrl = __MeteorRiderConfig__.meteorUrl;

    if (! (meteorUrl.length > 0)) {
      console.error('MeteorRider: error: unable to determine config.meteorUrl');
      return false;
    }
    // trigger request
    $.ajax({
      url: __MeteorRiderConfig__.meteorUrl,
      cache: false,
      // TODO: split to method on MeteorRider
      error: function( jqXHR, textStatus, errorThrown ) {
        console.error("MeteorRider failure");
        console.error(jqXHR, textStatus, errorThrown);
      },
      // TODO: split to method on MeteorRider
      success: function( data, textStatus, jqXHR ) {
        console.log("MeteorRider success");
        console.log(textStatus);
        console.log(data);
        // update URLs
        data = data.replace(/(href|src|manifest)\=\"\//gm, '$1="' + meteorUrl + '/');
          console.log(meteorUrl);
        console.log("Data is: \n"+data);
        var shitty=document.getElementById("chartContent");
        var testText='<div id="yoyoyo"><link rel="stylesheet" href="http://lunch-o-meter.herokuapp.com/451e8702bb68e7a4c40a115faf79c56beb197f10.css?meteor_css_resource=true"><script type="text/javascript">__meteor_runtime_config__ = {"meteorRelease":"0.8.3","ROOT_URL":"http://lunch-o-meter.herokuapp.com/","ROOT_URL_PATH_PREFIX":"","autoupdateVersion":"99ee377755ebe2ae92f07551b136f91a67d9434e"};</script><script type="text/javascript" src="http://lunch-o-meter.herokuapp.com/2d31ff49f9dcbe38ebc42a181ae78153df08998a.js"></script><title>Lunch-o-Meteor</title><link rel="stylesheet" type="text/css" href="http://lunch-o-meter.herokuapp.com/stylesheets/bootstrap.css" /><link rel="stylesheet" type="text/css" href="http://lunch-o-meter.herokuapp.com/stylesheets/bootstrap-theme.css" /><script type="text/javascript" src="http://lunch-o-meter.herokuapp.com/javascripts/jquery-2.1.1.min.js"></script><script type="text/javascript" src="http://lunch-o-meter.herokuapp.com/javascripts/bootstrap.min.js"></script><script type="text/javascript" src="http://lunch-o-meter.herokuapp.com/javascripts/highcharts.min.js"></script><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge" charset="utf-8"><link rel="shortcut icon" sizes="32x32" href="http://lunch-o-meter.herokuapp.com/favicon.ico?v=2"></div>';
        $("#chartContent").append(testText);
        $("#chartContent").trigger('create');
        console.log("Setting innterHTML to: \n"+testText);

        //shitty.trigger('create');
        // set the window.location object correctly so iron-router 
        // and other packages that depend on window.location work correctly
        //window.history.replaceState({}, "", meteorUrl);
        
        // replace the document with the new document/data
        ///document.open();
        ///document.write(data);
        ///document.close();
        // trigger the "loaded" events (it'd be nice to do this AFTER JS has loaded
        ///$(document).trigger('DOMContentLoaded');
        ///$(document).trigger('load');
        ///$(document).trigger('complete');
      }
    });
  }
}
//});

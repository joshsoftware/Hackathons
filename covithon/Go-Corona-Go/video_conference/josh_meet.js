/*
 * JoshMeet.js
 * version: 0.0.1 (25/5/2020)
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2020 - joshsoftware.com
 *
 * Use:
 *
 * const options = {
 *  roomName: 'JitsiMeetAPIExample',
 *  width: 700,
 *  height: 700,
 *  parentNode: document.querySelector('#meet')
 * };
 *
 * const api = new JoshMeet(options);
 */

(function (w,d) {

  'use strict';

  var loader = function () {
    var s = d.createElement("script");
    var tag = d.getElementsByTagName("script")[0];
    s.src = "https://meet.jit.si/external_api.js";
    tag.parentNode.insertBefore(s,tag);
  };

  if(w.addEventListener){
    w.addEventListener("load", loader, false);
  }else if(w.attachEvent){
    w.attachEvent("onload", loader);
  }else{
    w.onload = loader;
  }

  var domain = 'meet.jit.si';

  var JoshMeet = function(options) {
    return new JitsiMeetExternalAPI(domain, options);
  };

  window.JoshMeet = JoshMeet;

})(window, document);
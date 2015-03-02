

(function( w ) {

  var e = w.e = {};
  var onceCounter = true;

  w.task = function( functionToBlob, callback ) {
    var b = new Blob(["onmessage = function(e) { importScripts(window.document.location.origin + '/pubSub.js'); debugger; self.close();}"]);
    var URL = window.URL.createObjectURL(b);
    w[URL] = new Worker(URL);
    w[URL].addEventListener('message', function (e) {
        callback();
    });
    w[URL].postMessage();
    return w;
  };

})( this.worker = {} );




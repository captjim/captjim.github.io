var counter = 0;
var timer = 10;

window.addEventListener("devicemotion", function(event) {
  var qualifies = (event.acceleration.x > 10);
  if (qualifies) {
    counter +=;
    setTimeout(function(){
      if (counter < 3) {
        counter = 0;
      }
    }, 3000);
  }
  if (counter > 2) {
    alert(event.interval);
  }
}, true);

var counter = 0;
var timer = 10;

window.addEventListener("devicemotion", function(event) {
  var qualifies = (event.acceleration.x > 10) && (event.interval < 1000 || counter == 0);
  if (qualifies) {
    counter +=;
  }
  else {
    counter = 0;
  }
  if (counter > 2) {
    alert(event.interval);
  }
  // Process event.acceleration, event.accelerationIncludingGravity,
  // event.rotationRate and event.interval
}, true);

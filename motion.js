var counter = 0;
var timer = 10;

window.addEventListener("devicemotion", function(event) {
  if (event.acceleration.x > 10) {
    counter +=
    setTimeout(function(){
      if (counter < 3) {
        counter = 0;
      }
    }, timer*1000)
  }
  if (counter > 2) {
    alert(event.interval);
  }
  // Process event.acceleration, event.accelerationIncludingGravity,
  // event.rotationRate and event.interval
}, true);

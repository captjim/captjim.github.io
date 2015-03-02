window.addEventListener("devicemotion", function(event) {
  if (event.acceleration.x > 0) {
    alert("accel");
  }
  // Process event.acceleration, event.accelerationIncludingGravity,
  // event.rotationRate and event.interval
}, true);

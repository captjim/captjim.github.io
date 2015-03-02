var array = ['Rock', 'Paper', 'Scissors'];
var counter = 0;
var timer = 10;
var pasuse = false;

window.addEventListener("devicemotion", function(event) {
  if ((event.acceleration.y > 4) || (event.acceleration.x > 4) && !pause) {
    counter = counter + 1;
    pause = true;
    setTimeout(function(){
      pause = false;
    }, 1000)
  }
  if (counter > 2) {
    var n = Math.floor(3*Math.random());
    alert(array[n]);
    counter = 0;
  }
}, true);

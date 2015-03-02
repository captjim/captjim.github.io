var array = ['Rock', 'Paper', 'Scissors'];
var counter = 0;
var timer = 10;
var pasuse = false;

window.addEventListener("devicemotion", function(event) {
  if ((event.acceleration.y > 7) || (event.acceleration.x > 7) && !pause) {
    counter = counter + 1;
    pause = true;
    setTimeout(function(){
      pause = false;
    }, 1000)
    setTimeout(function(){
      if (counter < 3) {
        counter = 0;
      }
    }, 4000);
  }
  if (counter > 2) {
    var n = Math.floor(3*Math.random());
    alert(array[n]);
    counter = 0;
  }
}, true);

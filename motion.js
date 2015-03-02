var array = ['Rock', 'Paper', 'Scissors'];
var counter = 0;
var timer = 10;

window.addEventListener("devicemotion", function(event) {
  if ((event.acceleration.y > 4) || (event.acceleration.x > 4)) {
    counter = counter + 1;
    setTimeout(function(){
      if (counter < 3) {
        counter = 0;
      }
    }, 3000);
  }
  if (counter > 2) {
    var n = Math.floor(3*Math.random());
    alert(array[n]);
    counter = 0;
  }
}, true);

var _output = document.getElementById("output");

if (window.Worker) {
  var _btnSubmit = document.getElementById("btnSubmit");
  var _inputForWorker = document.getElementById("inputForWorker");
  var _killWorker = document.getElementById("killWorker");
  var e = new Event('change1');

  // Instantiating the Worker
  var myHelloWorker = new Worker('/helloworkers_EN.js');

  myHelloWorker.addEventListener("message", function (event) {
    document.getElementById("output").textContent = event.data;
    e.data = event.data;
    document.dispatchEvent(e);
  }, false);

  document.addEventListener("change1", function(e){ getBool(e); }, false);

  getBool = function(e){
    bool = document.getElementById("output3").innerHTML === 'true'
    document.getElementById("output3").textContent = bool && e.data
  }

  var calculateUpperPrime = function(num) {
    var i = Math.ceil(Math.sqrt(num)/2);
    var prime = true;
    while (i < Math.sqrt(num) && prime) {
      a = Math.floor(num/i);
      prime = a*i != num;
      i = i + 1;
    }
    document.getElementById("output2").textContent = prime;
    e.data = prime
    document.dispatchEvent(e);
  }

  var postToBoth = function(val) {
    document.getElementById("output3").textContent = 'true'
    myHelloWorker.postMessage(val);
    calculateUpperPrime(val);
  }

  postToBoth(71);

  _btnSubmit.addEventListener("click", function (event) {
    postToBoth(parseInt(_inputForWorker.value));
  }, false);

  _killWorker.addEventListener("click", function (event) {
    myHelloWorker.terminate();
    _output.textContent = "The worker has been stopped.";
  }, false);
}
else {
  _output.innerHTML = "Web Workers are not supported by your browser. Try with IE10: <a href=\"http://ie.microsoft.com/testdrive\">download the latest IE10 Platform Preview</a>";
}

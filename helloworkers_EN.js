function messageHandler(event) {
  var num = event.data;
  var i = 2;
  var prime = true;
  while (i < Math.sqrt(num)/2 && prime) {
      a = Math.floor(num/i);
      prime = a*i != num;
      i = i + 1;
  }
  this.postMessage(prime);
}

this.addEventListener('message', messageHandler, false);

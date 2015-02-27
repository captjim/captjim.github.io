function messageHandler(event) {
    // // Accessing to the message data sent by the main page
    // var messageSent = event.data;
    // // Preparing the message that we will send back
    // var messageReturned = "Hello " + messageSent + " from a separate thread!";
    // // Posting back the message to the main page
    // this.postMessage(messageReturned);
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

// Defining the callback function raised when the main page will call us
this.addEventListener('message', messageHandler, false);

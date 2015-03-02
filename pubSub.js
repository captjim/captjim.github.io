//
// pubsub usage
//
// To subscribe to an event:
//
// pubsub.subscribe( 'something', function() {
//   data available as event.data
// });
//
// Or, to only subscribe once:
//
// pubsub.once( 'something', function() {
//   data available as event.data
// });
//
// To publish the event:
//
// pubsub.publish( 'something', { some: 'data' });
//
// To unsubscribe:
//
// pubsub.unsubscribe( 'something', function() {
//  data available as event.data
// })
//
// You can also pass in arguments as an array to the function you
// are subscribing by adding a 3rd 'context' argument that gets
// bound to the function you pass in in the 2nd argument.
//


(function( p ) {

  var e = p.e = {};
  var onceCounter = true;

  p.publish = function( name, data ) {
    ( e[ name ] = e[ name ] || new Event( name ) ).data = data;
    if (pubsub.dev) {
      console.log( {
        dispatchedEvent: {
          name: name,
          data: data
        }
      } );
    }
    dispatchEvent( e[ name ] );
    return p;
  };

  p.subscribe = function( name, handler, context ) {
    p["#{handler}"] = function(){
      if (pubsub.dev) {
        console.log( {
          recievedEvent: {
            name: name,
            handler: handler,
            context: context
          }
        } );
      }
      handler.bind(context)();
    }
    addEventListener( name, p["#{handler}"] );
    return p;
  };

  p.once = function( name, handler, context ) {
    p["#{handler}"] = function(){
      if (pubsub.dev) {
        console.log( {
          recievedEvent: {
            name: name,
            handler: handler,
            context: context
          }
        } );
      }
      handler.bind(context)();
      removeEventListener( name, p["#{handler}"] );
    }
    addEventListener( name, p["#{handler}"] );
    return p;
  }

  p.unsubscribe = function( name, handler, context ) {
    removeEventListener( name, p["#{handler}"] );
    return p;
  };

})( this.pubsub = {} );

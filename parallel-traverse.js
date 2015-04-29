// Inputs

function treeFn() {
  return {
    tom: {
      parent: 'tree',
      likes: 'JS',
      dan: {
        parent: 'tom',
        likes: 'Processing',
        ric: {
          parent: 'dan',
          likes: 'teaching'
        }
      },
      amy: {
        a: 'a',
        parent: 'tom',
        likes: 'writing',
        b: {
          c: {
            d: {
              e: {
                f: {
                  g: 'h',
                  i: 'j',
                  k: {
                    l: {
                      m: 'yeyeyyeye!'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

var argCreator = function(arg) {
  arg = arg;
  argFn = new Function("return '" + arg + "';")
  return argFn;
}

var run = function() {
  if (event) {event.preventDefault();}
  resultKey = [];
  resultValue = [];
  document.getElementById('result').innerHTML = "";
  argCreator(document.getElementById('arg').value);
  new Parallel(getKeys(treeFn())).require({fn: treeFn, name: 'treeFn'}, {fn: argFn, name: 'argFn'}).map(traverseValue).then(logValue);
  new Parallel(getKeys(treeFn())).require({fn: treeFn, name: 'treeFn'}, {fn: argFn, name: 'argFn'}).map(traverseKey).then(logKey);
}

// Code

var resultKey = [];
var resultValue = [];

function getKeys(object) {
  var keys = Object.keys(object);
  for (i=0; i < keys.length; i++) {
    var temp = keys[i];
    keys[i] = {};
    keys[i][temp] = object[temp];
  }
  return keys
}

function traverseKey(object) {
  if (typeof(object) == 'object') {
    if (object[argFn()]) {
      return [object[argFn()]];
    }
    var array = Object.keys(object);
    for (i = 0; i < array.length; i++) {
      var tmp = i;
      var res = traverseKey(object[array[tmp]]);
      if (res) {
        res.push(array[tmp]);
        return res;
      }
      if (tmp + 1 == array.length) {
        return res;
      }
      array[tmp] = 'not here';
    }
  }
}

function logKey() {
  if (!arguments[0][0]) {return;}
  for (j = 0; j < arguments[0].length; j++) {
    if (arguments[0][j]) {
      resultKey.push(arguments[0][j]);
    }
  }
  var node1 = document.createElement("LI");
  var node11 = document.createTextNode('Key result stack: [' + resultKey[0] + ']');
  node1.appendChild(node11);
  document.getElementById('result').appendChild(node1);
  obj = treeFn();
  for (k = resultKey[0].length - 1; k > 1; k--) {
    var node = document.createElement("LI");
    var nodep = document.createTextNode(Object.keys(obj));
    node.appendChild(nodep);
    document.getElementById('result').appendChild(node);
    var inter = resultKey[0][k]
    obj = obj[inter];
  }
  var node2 = document.createElement("LI");
  var node21 = document.createTextNode('Key result: ' + JSON.stringify(resultKey[0][0], null, 9));
  node2.appendChild(node21);
  document.getElementById('result').appendChild(node2);
}

function traverseValue(object) {
  if (argFn() == object) {
    return [object];
  }
  else if (typeof(object) == 'object') {
    var array = Object.keys(object);
    for (i = 0; i < array.length; i++) {
      var tmp = i;
      var res = traverseValue(object[array[tmp]]);
      if (res) {
        res.push(array[tmp]);
        return res;
      }
      if (tmp + 1 == array.length) {
        return res;
      }
      array[tmp] = res;
    }
  }
}

function logValue() {
  if (!arguments[0][0]) {return;}
  for (j = 0; j < arguments[0].length; j++) {
    if (arguments[0][j]) {
      resultValue.push(arguments[0][j]);
    }
  }
  var node1 = document.createElement("LI");
  var node11 = document.createTextNode('Value result stack: [' + resultValue[0] + ']');
  node1.appendChild(node11);
  document.getElementById('result').appendChild(node1);
  obj = treeFn();
  for (k = resultValue[0].length - 1; k > 0; k--) {
    var node = document.createElement("LI");
    var nodep = document.createTextNode(Object.keys(obj));
    node.appendChild(nodep);
    document.getElementById('result').appendChild(node);
    var inter = resultValue[0][k]
    obj = obj[inter];
  }
  var node2 = document.createElement("LI");
  var node21 = document.createTextNode('Value result: ' + JSON.stringify(obj,null, 5));
  node2.appendChild(node21);
  document.getElementById('result').appendChild(node2);
}

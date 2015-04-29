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
}

// function argFn() { return 'm'; }
// new Parallel(getKeys(treeFn())).require(treeFn, argFn).map(traverseKey).then(logKey);

function argFn() { return 'j' }
new Parallel(getKeys(treeFn())).require(treeFn, argFn).map(traverseValue).then(logValue);

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
  for (j = 0; j < arguments[0].length; j++) {
    if (arguments[0][j]) {
      resultKey.push(arguments[0][j]);
    }
  }
  console.log('Key result stack:');
  console.log(resultKey[0]);
  obj = treeFn();
  for (k = resultKey[0].length - 1; k > 0; k--) {
    console.log(obj);
    var inter = resultKey[0][k]
    obj = obj[inter];
  }
  console.log('Key result:');
  console.log(obj);
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
  for (j = 0; j < arguments[0].length; j++) {
    if (arguments[0][j]) {
      resultValue.push(arguments[0][j]);
    }
  }
  console.log('Value result stack:');
  console.log(resultValue[0]);
  obj = treeFn();
  for (k = resultValue[0].length - 1; k > 0; k--) {
    console.log(obj);
    var inter = resultValue[0][k]
    obj = obj[inter];
  }
  console.log('Value result:');
  console.log(obj);
  console.log(obj + ' ?= ' + resultValue[0][0] + ' : ' + (resultValue[0][0] == obj));
}

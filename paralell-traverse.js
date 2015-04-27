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
        parent: 'tom',
        likes: 'writing'
      }
    }
  }
}

// function argFn() { return 'amy' }
// new Parallel(getKeys(treeFn())).require(treeFn, argFn).map(traverseKey).then(logKey);

function argFn() { return 'writing' }
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
  if (object[argFn()]) {
    return object[argFn()];
  }
  else if (typeof(object) == "object") {
    var array = Object.keys(object);
    for (i = 0; i < array.length; i++) {
      res = traverseKey(object[array[i]]);
      if (res) {
        return res;
      }
    }
  }
  return false
}

function logKey() {
  for (j = 0; j < arguments[0].length; j++) {
    if (arguments[0][j]) {
      resultKey.push(arguments[0][j]);
    }
  }
  console.log('Key result:');
  console.log(resultKey[0]);
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
  obj = treeFn();
  for (k = resultValue[0].length - 1; k > 0; k--) {
    var inter = resultValue[0][k]
    obj = obj[inter];
  }
  console.log('Value result:');
  console.log(resultValue[0]);
  console.log(obj + ' ?= ' + resultValue[0][0] + ' : ' + (resultValue[0][0] == obj));
}

---
---

MONAD = (modifier) ->
# Each unit constructor has a monad prototype. The prototype will contain an
# is_monad property for classification, as well as all inheritable methods.
  prototype = Object.create(null)
  prototype.is_monad = true

# Each call to MONAD will produce a new unit constructor function.
  unit = (value) ->

# Construct a new monad.
    monad = Object.create(prototype)

# In some mythologies 'bind' is called 'pipe' or '>>='.
# The bind method will deliver the unit's value parameter to a function.
    monad.bind = (func, args) ->

# bind takes a function and an optional array of arguments. It calls that
# function passing the monad's value and bind's optional array of args.
# With ES6, this horrible return statement can be replaced with
# return func(value, ...args);
      return func.apply(
        undefined,
        [value].concat(Array.prototype.slice.apply(args || []))
      )

# If MONAD's modifier parameter is a function, then call it, passing the monad
# and the value.
    if typeof modifier == 'function'
      value = modifier(monad, value)

# Return the shiny new monad.
    return monad

  unit.method = (name, func) ->

# Add a method to the prototype.
    prototype[name] = func
    return unit

  unit.lift_value = (name, func) ->

# Add a method to the prototype that calls bind with the func. This can be
# used for ajax methods that return values other than monads.
    prototype[name] = () ->
      return this.bind(func, arguments)
    return unit

  unit.lift = (name, func) ->

# Add a method to the prototype that calls bind with the func. If the value
# returned by the func is not a monad, then make a monad.
    prototype[name] = () ->
      result = this.bind(func, arguments)
      return result && result.is_monad == true ? result : unit(result)
    return unit
  return unit


# MO_NAD = function(unit, bind){ return mo_nad = { lift: function(name, f){ return mo_nad[name] = function(o){ mo_nad['value'] = f(o.value); return mo_nad } }, value: undefined, val: function(){ return mo_nad.value }, unit: function(x){ mo_nad.value = mo_nad.unit(x); return mo_nad }, bind: bind } }


    # // a maybe with alerting capabilities (or not...)
maybe = MONAD((monad, value) ->
  if value == null || typeof value == 'undefined'
    monad.is_null = true
    monad.bind = () ->
      return monad
    return null
  return value)

  .lift('alert', alert)

    # // a constructor for bindable functions
fVamb = (V) ->
  t = (a) ->
    return maybe(a + V)
  return t

    # // a show stopper
chainBreaker = (a) ->
  return maybe(undefined) #// that's a Nothing



# nothing = maybe(null)

# nothing
#   .bind(fVamb('xxx')) #// --> no crash
#   .alert() #// --> no popup

# some = maybe('some')

# some
#   .bind(fVamb('X'))
#   .bind(fVamb('YZ'))
#   .alert() #// 'someXYZ'

# some
#   .bind(fVamb('X'))
#   .bind(chainBreaker) #// ouch!
#   .alert() #// --> no popup


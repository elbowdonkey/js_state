// ==========================================================================
// Project:  JS State Machine
// Copyright: ©2012 Michael Buffington
// License:   Licensed under MIT license
// ==========================================================================

/**
  This is a simple state machine. Using it looks something like this:

  var DummyClass = function() {};
  var dummyInstance = new DummyClass();

  dummyInstance.stateMachine = new StateMachine();



  dummyInstance.stateMachine.states = {
    StateOne: {
      enter: function() {
        // do stuff when entering this state
      },
      exit: function() {
        // do stuff when exiting a state
      }
    },
    StateTwo: {} // don't do anything when entering or exiting
  }

  dummyInstance.stateMachine.changeState('StateTwo');


*/

/*
  @function

  Enters or exits a state.

  @param {String} eventName
    The name of an event (usually always 'enter' or 'exit')
*/
var StateMachine = function() {};

StateMachine.prototype.handleEvent = function(eventName) {
  var event = this.states[this.state][eventName];

  // change the state for whatever object we've told to change its state)
  this.changeState.apply(this, arguments);
  // Go to that state
  if (typeof(event) == 'function') {
      var result = event.apply(this,
      Array.prototype.slice.call(arguments, 1));
  }
  if (typeof(this.afterEvent) != 'undefined')
  this.afterEvent.call(this, eventName);
  return this;
}

/**
  Changes an object's state in addition to firing before/after state change functions

  @static
  @function
  @param {String} newState
    The name of the state
  @param {String} calledBy
    An optional description (used for logging) that can be used to let us know where changeState was called

*/
StateMachine.prototype.changeState = function(newState, calledBy) {
  var oldState = this.state;
  this.calledBy = calledBy;
  if ((typeof(this.beforeStateChange) != 'undefined') && (this.beforeStateChange.call(this, newState, oldState, calledBy) == false)) {
    return false;
  }

  if (oldState == newState) return this;

  // already there, not going to change to it
  if (!this.states[newState]) return false;
  if (oldState) this.handleEvent('exit');
  // silent, since im considering exit optional
  this.state = newState;
  this.handleEvent('enter');
  // silent, since im considering enter optional
  if (typeof(this.afterStateChange) != 'undefined')
  this.afterStateChange.call(this, newState, oldState);
  return this;
}

/**
  Triggered before an event is handled. The utility of this is dubious - basically it means when handleEvent is called
  beforeEvent will get called. Maybe good for logging or for making sure that globally defined requirements are
  met before the event can be handled.

  Maybe it'll be useful someday, but for now, it does nothing.

  @static
  @function
  @param {String} eventName
    The name of the event (usually 'enter' or 'exit')

*/
StateMachine.prototype.beforeEvent = function(eventName){}

/**
  Triggered after an event is handled. See beforeEvent for more details.

  Maybe it'll be useful someday, but for now, it does nothing.

  @static
  @function
  @param {String} eventName
    The name of the event (usually 'enter' or 'exit')

*/
StateMachine.prototype.afterEvent = function(eventName){}


/**
  Kicks off anything defined in the enter property of a defined state in an object's state machine.

  @static
  @function
  @param {String} to
    The name of the event that we're changing to
  @param {String} from
    The name of the event that we're changing from
  @param {String} calledBy
    An optional description (used for logging) that can be used to let us know where changeState was called

*/
StateMachine.prototype.beforeStateChange = function(to, from, calledBy){
  if (this.debug && to != "enter" && to != "exit" && typeof(to) != 'undefined') {
    // an undefined 'to' means we're simply in the same state we were before entering it again
    if (from == to){
      return false;
    } else {
      logger(this, from, to, calledBy);
    }
    return true;
  } else {
    return true;
  }
}

/**
  Kicks off anything defined in the exit property of a defined state in an object's state machine.

  @static
  @function
  @param {String} to
    The name of the event that we're changing to
  @param {String} from
    The name of the event that we're changing from
  @param {String} calledBy
    An optional description (used for logging) that can be used to let us know where changeState was called

*/
StateMachine.prototype.afterStateChange = function(to, from){
  //if (this.debug && to != "enter" && to != "exit") {
  //  var message = pad(this.name) + pad(' exiting ') + pad(from + '',25);
  //  var ms = new Date().getNanoseconds();
  //
  //  console.log(ms, this, message);
  //  this.eventLog.push(message);
  //}
}
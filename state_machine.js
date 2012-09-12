var StateMachine = (function() {
  function StateMachine(object, states) {
    console.log(states);
    object.stateMachine     = this;
    object.changeState      = this.changeState;
    object.state            = this.state;
    object.transition       = this.transition;
    object.states           = states;

    return object;
  };

  StateMachine.prototype.changeState = function(newState) {
    if (this.state == newState) return;            // avoid exit() and enter() if old state is the same as new
    if (!this.states[newState]) return;            // avoid changing to an undefined state
    if (this.state) this.transition('exit'); // if we were in another state, kick off its exit()

    this.state = newState;
    this.transition('enter');

    return;
  }

  StateMachine.prototype.transition = function(eventName) {
    var eventFunc = this.states[this.state][eventName];

    if (typeof(eventFunc) == 'function') eventFunc.apply(this);  // kick off enter() and exit() for a state
  }

  return StateMachine;
})();
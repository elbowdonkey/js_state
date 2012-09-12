var StateMachine = (function() {
  function sm() {};

  sm.prototype.changeState = function(newState) {
    if (this.state == newState) return this;       // avoid exit() and enter() if old state is the same as new
    if (!this.states[newState]) return false;      // avoid changing to an undefined state
    if (this.state) this.handleTransition('exit'); // if we were in another state, kick off its exit()

    this.state = newState;
    this.handleTransition('enter');

    return this;
  }

  sm.prototype.handleTransition = function(eventName) {
    var eventFunc = this.states[this.state][eventName];

    if (typeof(eventFunc) == 'function') eventFunc.apply(this);  // kick off enter() and exit() for a state

    return this;
  }

  return sm;
})();
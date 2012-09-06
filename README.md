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
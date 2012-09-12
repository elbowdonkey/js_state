Screw.Unit(function(c) { with(c) {
  describe("State Machine", function() {
  	describe("creation", function() {
	  	var DummyClass;
	  	var dummyInstance;
	  	var objectForStateMachine;

	  	before(function() {
	      DummyClass = function() {};
	      dummyInstance = new DummyClass();
	    });

	    it("can be applied to an object", function() {
	      expect(dummyInstance.stateMachine).to(be_undefined);
	      dummyInstance.stateMachine = new StateMachine();
	      expect(dummyInstance.stateMachine).to(be_an_instance_of, StateMachine);
	    });
	  });

	  describe("use", function(){
	  	var DummyClass;
	  	var dummyInstance;
	  	var objectForStateMachine;

	  	before(function() {
	      DummyClass = function() {};
	      dummyInstance = new DummyClass();
	      dummyInstance.stateMachine = new StateMachine();
	      dummyInstance.stateMachine.dummyProperty = [];
				dummyInstance.stateMachine.states = {
					StateOne: {
						enter: function() {
							this.dummyProperty.push('entered StateOne');
						},
						exit: function() {
							this.dummyProperty.push('exited StateOne');
						}
					},
					StateTwo: {
						enter: function() {
							this.dummyProperty.push('entered StateTwo');
						},
						exit: function() {
							this.dummyProperty.push('exited StateTwo');
						}
					}
				}
	    });

	  	it("enters states", function() {
	      expect(dummyInstance.stateMachine.state).to(be_undefined);
	      expect(dummyInstance.stateMachine.dummyProperty).to(equal, []);

	      dummyInstance.stateMachine.changeState('StateOne');
	      expect(dummyInstance.stateMachine.state).to(equal, 'StateOne');
	      expect(dummyInstance.stateMachine.dummyProperty[0]).to(equal, 'entered StateOne');
	    });

	    it("exits states", function() {
	      dummyInstance.stateMachine.changeState('StateOne');
	      dummyInstance.stateMachine.changeState('StateTwo');
	      expect(dummyInstance.stateMachine.state).to(equal, 'StateTwo');

	      expect(dummyInstance.stateMachine.dummyProperty[0]).to(equal, 'entered StateOne');
	      expect(dummyInstance.stateMachine.dummyProperty[1]).to(equal, 'exited StateOne');
	      expect(dummyInstance.stateMachine.dummyProperty[2]).to(equal, 'entered StateTwo');
	    });

	    it("avoids transitions when remaining in the same state", function(){
	    	dummyInstance.stateMachine.changeState('StateOne');
	    	dummyInstance.stateMachine.changeState('StateOne');
	    	expect(dummyInstance.stateMachine.dummyProperty.length).to(equal, 1);
	    });

			it("isn't fooled by undefined states", function(){
	    	dummyInstance.stateMachine.changeState('StateOne');
	    	dummyInstance.stateMachine.changeState('TotallyNotThereState');
	    	expect(dummyInstance.stateMachine.state).to(equal, 'StateOne');
	    });
	  });
  });
}});
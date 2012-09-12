Screw.Unit(function(c) { with(c) {
  describe("State Machine", function() {
  	describe("creation", function() {
	  	var DummyClass;
	  	var dummyInstance;
	  	var stateDefinitions;

	  	before(function() {
	      DummyClass = function() {};
	      dummyInstance = new DummyClass();
	      stateDefinitions = {
	      	One: {
	      		enter: function() {},
	      		exit: function() {}
	      	},
	      	Two: {
	      		enter: function() {},
	      		exit: function() {}
	      	}
	      };

	      new StateMachine(dummyInstance, stateDefinitions);
	    });

	    it("can be applied to an object", function() {
	      expect(typeof(dummyInstance.changeState) == 'function').to(be_true);
	    });

	    it("can have states", function() {
	      expect(dummyInstance.states).to(equal, stateDefinitions);
	    });

		  it("can change states", function() {
		  	expect(dummyInstance.state).to(equal, undefined);
		  	dummyInstance.changeState("One");
		  	expect(dummyInstance.state).to(equal, "One");
		  });

		  it("runs enter and exit functions", function() {
		  	dummyInstance.enterCounter = 0;
		  	dummyInstance.exitCounter = 0;
		    dummyInstance.states = {
		    	One: {
		    		enter: function() {
		    			this.enterCounter += 1;
		    		},
		    		exit: function() {
		    			this.exitCounter += 1;
		    		}
		    	},
		    	Two: {
		    		enter: function() {
		    			this.enterCounter += 1;
		    		},
		    		exit: function() {
		    			this.exitCounter += 1;
		    		}
		    	}
		    }

		    dummyInstance.changeState("One");
		    expect(dummyInstance.enterCounter).to(equal, 1);
		    expect(dummyInstance.exitCounter).to(equal, 0);

		    dummyInstance.changeState("Two");
		    expect(dummyInstance.enterCounter).to(equal, 2);
		    expect(dummyInstance.exitCounter).to(equal, 1);
		  });
	  });
  });
}});
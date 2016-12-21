"use strict";

{ //Test that the gameLoop function is called 60 times per seconds. 
	//We delay the test in order to let the environment some time to initialize.
	//The framerate will be below 60 fps otherwise.
	setTimeout( () => {
		let util = Util.create();
		let scheduler = Scheduler.create(Time.create());	
		let counter = 0;
		scheduler.callByInterval( () => { counter++; } , 1000.0 / 60.0);
		setTimeout( () => { util.assert(counter >= 60); }, 1050 )
	}, 5000 /* Delay to let the time to the debuger to initialize. */);
}

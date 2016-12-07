"use strict";

{ //Test that the gameLoop function is called 60 times per seconds. 
	let util = Util.create();
	let gameUpdater = GameUpdater.create(Time.create());	
	let counter = 0;
	gameUpdater.callByInterval( () => { counter++; } , 1000.0 / 60.0);
	setTimeout( () => { util.assert(counter > 60); }, 1050 )
}

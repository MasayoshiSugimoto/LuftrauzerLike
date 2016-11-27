const TEST_SHAPES = {
	testRectangle1: {
		//Position is the middle of the screen
		position:		{x:400,y:300},
		size:       {x:10,y:100},
		direction:  Math.PI / 4,
		type:				"Rectangle",
		color:			"green",
	},
	testDrawObjectTreeRoot: {
		//Position is the middle of the screen
		position:		{x:400,y:300},
		size:       {x:10,y:100},
		direction:  0,
		type:				"Rectangle",
		children:		[
			{
				position:		{x:100,y:0},
				size:       {x:10,y:100},
				direction:  Math.PI / 4,
				type:				"Rectangle"
			},
			{
				position:		{x:0,y:100},
				size:       {x:10,y:100},
				direction:  -Math.PI / 4,
				type:				"Rectangle"
			}
		]
	},
	testShip: {
		position:		{x:0,y:0},
		size:       {x:0,y:0},
		direction:  0,
		type:				"Rectangle",
	},
};

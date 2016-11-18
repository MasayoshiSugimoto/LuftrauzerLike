"use strict";

const SHAPES = {
	ship: {
		position:		{x:400,y:300},
		size:       {x:60,y:10},
		direction:  0,
		type:				"Rectangle",
		children:		[
			{
				position:		{x:10,y:0},
				size:       {x:10,y:70},
				direction:  0,
				type:				"Rectangle"
			},
			{
				position:		{x:-25,y:0},
				size:       {x:10,y:30},
				direction:  0,
				type:				"Rectangle"
			}
		]
	},
	ship2: {
		position:		{x:400,y:300},
		size:       {x:60,y:10},
		direction:  0,
		type:				"Rectangle",
		children:		[
			{
				position:		{x:10,y:0},
				size:       {x:10,y:40},
				direction:  0,
				type:				"Rectangle"
			},
			{
				position:		{x:-25,y:0},
				size:       {x:10,y:60},
				direction:  0,
				type:				"Rectangle"
			}
		]
	}
};

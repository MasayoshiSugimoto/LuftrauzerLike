"use strict";

const DrawObjectTreeComposite = (drawObject) => ({

	getChildren() {
		return this.children;
	},

	addDrawObject(drawObject) {
		this.children.push(drawObject);
	},

	draw(canvasContext) {

		//Draw the node object
		canvasContext.save();	
		this.placeOn(canvasContext);
		this.draw(canvasContext);
		//Draw the children inside the context of the parent:
		//the children position are relative to the parent object.
		this.children.forEach( function(item,index) {
			item.draw(canvasContext);
		} )
		canvasContext.restore();

	}

})

"use strict";

const DrawObjectTreeNodeComposite = (drawObject) => ({

	getChildrenNodes() {
		return this.childrenNodes;
	},

	addDrawObject(drawObject) {
		this.childrenNodes.push(drawObject);
	},

	draw(canvasContext) {

		//Draw the node object
		canvasContext.save();	
		this.placeOn(canvasContext);
		this.draw(canvasContext);
		//Draw the children inside the context of the parent:
		//the children position are relative to the parent object.
		this.childrenNodes.forEach( function(item,index) {
			item.draw(canvasContext);
		} )
		canvasContext.restore();

	}

})

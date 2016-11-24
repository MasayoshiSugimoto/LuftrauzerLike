"use strict";

//Rename the file, not the same as object

//Tree node of draw object tree.
const DrawObjectTreeNode = {

	create(drawObject) {
		let node = Object.create(this.template);
		node.drawObject = drawObject;
		node.childrenDrawObjects = []; //TODO: Change the name to childrenNodes
		return node;
	},

	template: {

		getPosition() {
			return this.drawObject.getPosition();
		},

		getSize() {
			return this.drawObject.getSize();
		},

		getDirection() {
			return this.drawObject.getDirection();
		},

		getChildren() {
			return this.childrenDrawObjects;
		},

		getGeometryType() {
			return this.drawObject.getGeometryType();
		},

		setDrawObjects(childrenDrawObjects) {
			this.childrenDrawObjects = childrenDrawObjects;
		},

		addDrawObject(drawObject) {
			this.childrenDrawObjects.push(drawObject);
		},

		draw(canvasContext) {

			//Draw the node object
			canvasContext.save();	
			this.drawObject.placeOn(canvasContext);
			this.drawObject.draw(canvasContext);
			//Draw the children inside the context of the parent:
			//the children position are relative to the parent object.
			this.childrenDrawObjects.forEach( function(item,index) {
				item.draw(canvasContext);
			} )
			canvasContext.restore();

		}

	}
};

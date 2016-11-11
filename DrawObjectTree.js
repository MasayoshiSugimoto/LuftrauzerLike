"use strict";

const DrawObjectTreeNodeMaker = {
	create(drawObject) {
		let node = Object.create(this.DrawObjectTreeNode);
		node.drawObject = drawObject;
		node.childrenDrawObjects = [];
		return node;
	},

	DrawObjectTreeNode: {

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

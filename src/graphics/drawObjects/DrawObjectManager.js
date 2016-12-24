"use strict";

const DrawObjectManager = {
	
	create() {

		return Object.assign(
			{
				drawObjects: []
			},
			{

				add(drawObject) {
					this.drawObjects.push(drawObject);
					return this;
				},

				length() {
					return this.drawObjects.length;
				},

				get(index) {
					return this.drawObjects[index];
				},

				remove(drawObject) {
					this.drawObjects = this.drawObjects.filter( function(element) {
						return element != drawObject;
					} );
					return this;
				},

				draw(canvasContext) {
					this.drawObjects.forEach( function(drawObject) {
						canvasContext.save();
						drawObject.placeOn(canvasContext);
						drawObject.draw(canvasContext);
						canvasContext.restore();
					} );
					return this;
				}
				
			}

		);
	}

};

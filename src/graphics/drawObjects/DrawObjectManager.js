"use strict";

const DrawObjectManager = {
	
	create() {
		let state = {
			drawObjects: []
		};

		let proto = {

			add(drawObject) {
				this.drawObjects.push(drawObject);
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
			},

			draw(canvasContext) {
				this.drawObjects.forEach( function(drawObject) {
					drawObject.draw(canvasContext);
				} );
			}
		};

		return Object.assign(state, proto);
	}

};

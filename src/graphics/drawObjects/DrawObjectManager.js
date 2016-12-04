"use strict";

const DrawObjectManager = {
	
	create() {
		let state = {
			drawObjects: []
		};
		return Object.assign(state, this.template);
	},

	template: {

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

	}

};

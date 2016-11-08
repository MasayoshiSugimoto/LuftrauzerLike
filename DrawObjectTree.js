const DrawObjectTreeNode = {
	create() {
		return Object.create(this.template);
	},

	template: {
		drawObjects: [],

		setDrawObjects(drawObjects) {
			this.drawObjects = drawObjects;
		},

		draw(canvasContext) {
			for (index = 0; index < this.drawObject.length; index++) {
				canvasContext.save();	
				this.drawObjects[index].draw();
				canvasContext.restore();
			}
		}

	}
};

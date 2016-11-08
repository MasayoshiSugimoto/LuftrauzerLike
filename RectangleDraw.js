const RectangleDrawObject = {
	create(rectangle) {
		let rectangleDrawObject = Object.create(this.template);
		rectangleDrawObject.rectangle = rectangle;
		return rectangleDrawObject;
	},

	template: {
		rectangle: Rectangle.create(),
		
		draw(canvasContext) {
			canvasContext.rotate(this.rectangle.direction)
			canvasContext.translate(
				this.rectangle.getPosition().getX(),
				this.rectangle.getPosition().getY());
			canvasContext.fillRect(
				-this.rectangle.getSize().getX()/2,
				this.rectangle.getSize().getY()/2,
				this.rectangle.getSize().getX(),
				this.rectangle.getSize().getY());
		}

	}
};

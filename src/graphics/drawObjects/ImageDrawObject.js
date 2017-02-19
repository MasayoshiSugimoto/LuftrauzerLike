"use strict";

const ImageDrawObject = {

	create(image) {

		return Object.assign(

			{
				position: Vector2D.zero(), //Screen coordinates
				direction: 0,
				scale: 1.0,
				opacity: 1.0,
				image: image
			},

			{
				getPosition() {
					return this.position;
				},

				setPosition(position) {
					this.position = position;
					return this;
				},

				getDirection() {
					return this.direction;
				},

				setDirection(direction) {
					this.direction = direction;
					return this;
				},

				setScale(scale) {
					this.scale = scale;
					return this;
				},

				getSize() {
					return Vector2D.create(this.image.width * this.scale, this.image.height * this.scale);
				},

				setOpacity(opacity) {
					this.opacity = opacity;
					return this;
				},

				placeOn(canvasContext) {
					canvasContext.translate(
						this.getPosition().getX(),
						this.getPosition().getY());
					canvasContext.rotate(this.getDirection());
					return this;
				},

				draw(canvasContext) {
					let size = this.getSize();
					let previousOpacity = canvasContext.globalAlpha;
					canvasContext.globalAlpha = this.opacity;
					canvasContext.drawImage(
						image, 
						-size.getX() / 2,		//x coordinate
						-size.getY() / 2,		//y coordinate
						size.getX(),				//width
						size.getY());				//height
					canvasContext.globalAlpha = previousOpacity;
					return this;
				},

			}

		);

	}
};

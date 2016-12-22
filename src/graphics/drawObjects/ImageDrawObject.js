"use strict";

const ImageDrawObject = {

	create(image) {

		return Object.assign(

			{
				position: Vector2D.zero(),
				direction: 0,
				image: image
			},

			{
				getPosition() {
					return this.position;
				},

				setPosition(position) {
					this.position = position;
				},

				getDirection() {
					return this.direction;
				},

				setDirection(direction) {
					this.direction = direction;
				},

				placeOn(canvasContext) {
					canvasContext.translate(
						this.getPosition().getX(),
						this.getPosition().getY());
					canvasContext.rotate(this.getDirection());
				},

				draw(canvasContext) {
					canvasContext.drawImage(image, this.image.width / 2, this.image.height / 2);
				}

			}

		);

	}
};

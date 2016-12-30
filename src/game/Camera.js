"use strict";

const CAMERA_LIMIT_FROM_BORDER_METER = ScreenConversion.pixel2Meter(100);

const Camera = {

	create(canvas, subject) {
		return {

			position	: Vector2D.zero(),
			canvas		: canvas,
			subject		: subject,

			getPosition() {
				return this.position;
			},

			setPosition(position) {
				this.position = position;
				return this;
			},

			update() {
				let newX 		= this.position.getX();
				let newY 		= this.position.getY();
				let left 		= this.position.getX();
				let top 		= this.position.getY();
				let right 	= left + canvas.getGameSpaceWidth();
				let bottom 	= top + canvas.getGameSpaceHeight();
				let shipX 	= this.subject.getPosition().getX();
				let shipY 	= this.subject.getPosition().getY();

				if (shipX - left < CAMERA_LIMIT_FROM_BORDER_METER) {
					newX = shipX - CAMERA_LIMIT_FROM_BORDER_METER;
				}

				if (right - shipX < CAMERA_LIMIT_FROM_BORDER_METER) {
					newX = shipX + CAMERA_LIMIT_FROM_BORDER_METER - canvas.getGameSpaceWidth();
				}

				if (shipY - top < CAMERA_LIMIT_FROM_BORDER_METER) {
					newY = shipY - CAMERA_LIMIT_FROM_BORDER_METER;
				}

				if (bottom - shipY < CAMERA_LIMIT_FROM_BORDER_METER) {
					newY = shipY + CAMERA_LIMIT_FROM_BORDER_METER - canvas.getGameSpaceHeight();
				}

				this.position = Vector2D.create(newX, newY);

				return this;
			},

			toCameraCoordinates(drawObject) {
				return drawObject.getPosition().substract(this.position);
			}

		};
	}

};

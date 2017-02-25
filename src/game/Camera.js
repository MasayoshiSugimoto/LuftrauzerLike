"use strict";

/********************************************************************************
Center the subject inside the canvas.
********************************************************************************/
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

			getCanvasTranslation() {
				return ScreenConversion.vectorMeter2Pixel(this.getPosition()).minus();
			},

			getCanvas() {
				return this.canvas;
			},

			update() {
        this.position = this.subject.getPosition().substract(this.canvas.getGameSpaceCenter());
				return this;
			},

			toCameraCoordinates(drawObject) {
				return drawObject.getPosition().substract(this.position);
			}

		};
	}

};

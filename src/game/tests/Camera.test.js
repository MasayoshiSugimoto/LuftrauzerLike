"use strict";

{ //Test update

	let util = Util.create();

	let canvas = {
		getGameSpaceWidth() {
			return ScreenConversion.pixel2Meter(800);
		},
		getGameSpaceHeight() {
			return ScreenConversion.pixel2Meter(600);
		}
	};

	let createCameraForTestUpdate = (shipX, shipY) => {

		let subject = {
			getPosition() {
				return Vector2D.create(shipX, shipY);
			}
		};

		return Camera.create(canvas, subject).update();

	};

	let midCameraX = ScreenConversion.pixel2Meter(800 / 2.0);
	let midCameraY = ScreenConversion.pixel2Meter(600 / 2.0);

	{ //subject on the left
		let camera = createCameraForTestUpdate(
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1,
				midCameraY);
		util.assertEqualFloat(-0.1, camera.getPosition().getX());
		util.assertEqualFloat(0.0, camera.getPosition().getY());
	}
	
	{ //subject on top-left
		let camera = createCameraForTestUpdate(
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1,
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1);
		util.assertEqualFloat(-0.1, camera.getPosition().getX());
		util.assertEqualFloat(-0.1, camera.getPosition().getY());
	}

	{ //subject on top
		let camera = createCameraForTestUpdate(
				midCameraX,
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1);
		util.assertEqualFloat(0.0, camera.getPosition().getX());
		util.assertEqualFloat(-0.1, camera.getPosition().getY());
	}

	{ //subject on top-right
		let camera = createCameraForTestUpdate(
				canvas.getGameSpaceWidth() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1,
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1);
		util.assertEqualFloat(0.1, camera.getPosition().getX());
		util.assertEqualFloat(-0.1, camera.getPosition().getY());
	}

	{ //subject on right
		let camera = createCameraForTestUpdate(
				canvas.getGameSpaceWidth() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1,
				midCameraY);
		util.assertEqualFloat(0.1, camera.getPosition().getX());
		util.assertEqualFloat(0.0, camera.getPosition().getY());
	}

	{ //subject on bottom-right
		let camera = createCameraForTestUpdate(
				canvas.getGameSpaceWidth() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1,
				canvas.getGameSpaceHeight() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1);
		util.assertEqualFloat(0.1, camera.getPosition().getX());
		util.assertEqualFloat(0.1, camera.getPosition().getY());
	}

	{ //subject on bottom
		let camera = createCameraForTestUpdate(
				midCameraX,
				canvas.getGameSpaceHeight() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1);
		util.assertEqualFloat(0.0, camera.getPosition().getX());
		util.assertEqualFloat(0.1, camera.getPosition().getY());
	}

	{ //subject on bottom-left
		let camera = createCameraForTestUpdate(
				CAMERA_LIMIT_FROM_BORDER_METER - 0.1,
				canvas.getGameSpaceHeight() - CAMERA_LIMIT_FROM_BORDER_METER + 0.1);
		util.assertEqualFloat(-0.1, camera.getPosition().getX());
		util.assertEqualFloat(0.1, camera.getPosition().getY());
	}

	{ //subject on center
		let camera = createCameraForTestUpdate(
				midCameraX,
				midCameraY);
		util.assertEqualFloat(0.0, camera.getPosition().getX());
		util.assertEqualFloat(0.0, camera.getPosition().getY());
	}

}


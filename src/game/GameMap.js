"use strict";

const GAME_MAP_BLOCK_SIZE_PIXEL = 3000;
const GAME_MAP_X_SIZE_PIXEL = 3 * GAME_MAP_BLOCK_SIZE_PIXEL;
const GAME_MAP_BLOCK_SIZE_METER = ScreenConversion.pixel2Meter(GAME_MAP_BLOCK_SIZE_PIXEL);
const GAME_MAP_MAP_X_SIZE_METER = ScreenConversion.pixel2Meter(GAME_MAP_X_SIZE_PIXEL);

/**
* This is an implementation of a circular map on X axis and bounded on y axis.
* The map is divided in 3 blocks. The block are reordered to maintain the camera always
* the middle block.
**/
const GameMap = {
	create(gameObjectManager, camera) {
		return {

			gameObjectManager	: gameObjectManager,
			camera						: camera,

			projectAllOnMap() {
				this.gameObjectManager.forEach( (gameObject) => {
					gameObject.setPosition(
						GameMap.projectCoordinatesOnMap(gameObject.getPosition()));
				} );
				return this;
			},

			//Return the map translation for a game object
			getXTranslation(gameObject) {

				let cameraCurrentBlock = Math.floor(this.camera.getPosition().getX() / GAME_MAP_BLOCK_SIZE_METER);

				//Reorder the block to keep the camera in the block in the middle.
				if (cameraCurrentBlock == 0
						&& gameObject.getPosition().getX() >= 2 * GAME_MAP_BLOCK_SIZE_METER) {
					return  - GAME_MAP_X_SIZE_PIXEL;	
				} else if (cameraCurrentBlock == 2
						&& gameObject.getPosition().getX() < GAME_MAP_BLOCK_SIZE_METER) {
					return  + GAME_MAP_X_SIZE_PIXEL;	
				}

				return 0.0;
			},

		};
	}
};

//Keep the coordinates inside the map.
GameMap.projectCoordinatesOnMap = (vector2DMeter) => {
	return Vector2D.create(
		//Add one block and remove it later to do the % modulo calculation on positive values
		(vector2DMeter.getX() + GAME_MAP_MAP_X_SIZE_METER) % GAME_MAP_MAP_X_SIZE_METER,
		MathUtil.clamp(0, vector2DMeter.getY(), GAME_MAP_BLOCK_SIZE_METER)
	);
}

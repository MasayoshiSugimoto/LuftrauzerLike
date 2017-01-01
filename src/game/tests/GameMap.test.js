"use strict";

{ //Test projectCoordinatesOnMap
	let util = Util.create();

	//Test zero
	util.assert(GameMap.projectCoordinatesOnMap(Vector2D.create(0.0, 0.0))
		.equals(Vector2D.create(0.0, 0.0)));
	//Test the center of the map
	let mapCenter = Vector2D.create(GAME_MAP_MAP_X_SIZE_METER / 2.0, GAME_MAP_BLOCK_SIZE_METER / 2.0);
	util.assert(GameMap.projectCoordinatesOnMap(mapCenter).equals(mapCenter));
	//Test a point on the left
	util.assert(GameMap.projectCoordinatesOnMap(Vector2D.create(-1.0, 0.0))
		.equals(Vector2D.create(GAME_MAP_MAP_X_SIZE_METER - 1.0, 0.0)));
	//Test a point on the right	
	util.assert(GameMap.projectCoordinatesOnMap(Vector2D.create(GAME_MAP_MAP_X_SIZE_METER + 1.0, 0.0))
		.equals(Vector2D.create(1.0, 0.0)));
	//Test a point above the map
	util.assert(GameMap.projectCoordinatesOnMap(Vector2D.create(0.0, -1.0))
		.equals(Vector2D.create(0.0, 0.0)));
	//Test a point below the map
	util.assert(GameMap.projectCoordinatesOnMap(Vector2D.create(0.0, GAME_MAP_BLOCK_SIZE_METER + 1.0))
		.equals(Vector2D.create(0.0, GAME_MAP_BLOCK_SIZE_METER)));
}

{ //Test projectAllOnMap
	let util = Util.create();

	let gameObjectManager = new Array(
		{
			position: Vector2D.create(0.0, -1.0),
			setPosition(position) {
				this.position = position;
			},
			getPosition() {
				return this.position;
			}
		},
		{
			position: Vector2D.create(0.0, -1.0),
			setPosition(position) {
				this.position = position;
			},
			getPosition() {
				return this.position;
			}
		}
	);

	let gameMap = GameMap.create(gameObjectManager, { });
	util.assert(gameMap.projectAllOnMap() == gameMap);

	gameObjectManager.forEach( (gameObject) => {
		util.assertEqualFloat(0.0, gameObject.getPosition().getY());
	} );
}

{ //Test getTranslation
	let util = Util.create();
	let gameObjectManager = {};
	let camera = {
		position: Vector2D.create(0.0, 0.0),
		getPosition() {
			return this.position;
		},
		setPosition(newPosition) {
			this.position = newPosition;
			return this;
		}
	};

	let gameMap = GameMap.create(gameObjectManager, camera);

	let gameObjectFactory = (blockIndex) => {
		return {
			position: Vector2D.create(GAME_MAP_BLOCK_SIZE_METER * blockIndex + 1.0, 0.0),
			getPosition() {
				return this.position;
			},
			setPosition(newPosition) {
				this.position = newPosition;
				return this;
			}
		};
	};

	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(0)));
	util.assertEqualFloat(0.0 , gameMap.getXTranslation(gameObjectFactory(1)));
	util.assertEqualFloat(-GAME_MAP_X_SIZE_PIXEL, gameMap.getXTranslation(gameObjectFactory(2)));

	//Move the camera in the middle block
	camera.setPosition(Vector2D.create(GAME_MAP_BLOCK_SIZE_METER, 0.0));
	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(0)));
	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(1)));
	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(2)));

	//Move the camera in the right block
	camera.setPosition(Vector2D.create(GAME_MAP_BLOCK_SIZE_METER * 2.0, 0.0));
	util.assertEqualFloat(GAME_MAP_X_SIZE_PIXEL, gameMap.getXTranslation(gameObjectFactory(0)));
	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(1)));
	util.assertEqualFloat(0.0, gameMap.getXTranslation(gameObjectFactory(2)));
}

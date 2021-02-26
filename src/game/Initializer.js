"use strict"

// This class declare lazy getters to chain object creations
// Set getters of 'appContext' if you want to test with mocks
function Initializer(images, appContext = {}) {

	const lazy = f => {
		let instance = null
		return () => {
			if (!instance) instance = f()
			return instance
		}
	}

	appContext.images = images

	appContext.getDrawObjectManager = lazy(() => DrawObjectManager.create())

	appContext.getGameObjectManager = lazy(() => GameObjectManager.create())

	appContext.getShipKeyboardController = lazy(() => BorderController(
		ShipKeyboardController(window),
		GameMap())
	)

	appContext.getShip = lazy(() => {
		const ship = ShipFactory(appContext.getShipKeyboardController()).createShip()
		appContext.getShipKeyboardController().setShip(ship)
		return ship
	})

	appContext.getShipComposite = lazy(() =>
		ShipCompositeFactory(
				appContext.getShip(),
				ImageDrawObject,
				appContext.getGameObjectDrawObjectFactory(),
				appContext.getGameObjectManager(),
				appContext.getDrawObjectManager(),
				appContext.getFaction(),
				appContext.images)
		.create()
	)

	appContext.getCanvas = lazy(() => Canvas.create(document.createElement("canvas"), window))

	appContext.getCamera = lazy(() => Camera.create(appContext.getCanvas(), appContext.getShip()))

	appContext.getCollisionManager = lazy(() => CollisionManager.create(
		appContext.getGameObjectManager(),
		appContext.getFaction()
	))

	appContext.getMachineGun = lazy(() => {
		const machineGun = MachineGunFactory.create(
				appContext.getBulletCompositeFactory(),
				window
			)
			.createMachineGun(appContext.getShip())
		//Resolve circular dependency on ShipKeyboardController
		appContext.getShipKeyboardController().setOnFireStartCallback( () => { machineGun.onFireStart(); } )
		appContext.getShipKeyboardController().setOnFireStopCallback( () => { machineGun.onFireStop(); } )
		return machineGun
	})

	appContext.getSimpleEnemyFactory = lazy(() => SimpleEnemyFactory(appContext.getGameObjectManager(), appContext.getShip()))

	appContext.getSimpleEnemyCompositeFactory = lazy(() => SimpleEnemyCompositeFactory(
		appContext.getSimpleEnemyFactory(),
		ImageDrawObject,
		appContext.getGameObjectDrawObjectFactory(),
		appContext.images,
		appContext.getDrawObjectManager()
	))

	appContext.getGameObjectDrawObjectFactory = lazy(() => GameObjectDrawObjectFactory(
		ExplosionDrawObjectFactory(appContext.images),
		EmptyGameObject
	))

	appContext.getBulletFactory = lazy(() => Bullet)

	appContext.getBulletCompositeFactory = lazy(() => BulletCompositeFactory(
		appContext.getBulletFactory(),
		ExplosionDrawObjectFactory(appContext.images),
		appContext.getGameObjectDrawObjectFactory(),
		appContext.getGameObjectManager(),
		appContext.getDrawObjectManager(),
		appContext.getFaction()
	))

	appContext.getFaction = lazy(() => Faction.create())

	return appContext
}

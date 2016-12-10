"use strict";

const MACHINE_GUN_FIRE_RATE = 0.05; //Time between bullets in seconds

const MachineGun = {

	create(ship, bulletFactory, drawObjectManager) {

		let proto = {

			getBulletsLength() {
				return this.bullets.length;
			},

			getFireTimer() {
				return this.fireTimer;
			},

			fire(elapsedTimeSecond) {
				this.fireTimer += elapsedTimeSecond;
				
				if (this.fireTimer < MACHINE_GUN_FIRE_RATE) {
					return;
				}

				this.fireTimer = 0.0;
				let bullet = this.bulletFactory.fromData(
					this.ship.getPosition(), this.ship.getDirection());

				//Add bullets
				this.bullets.push(bullet);
				this.drawObjectManager.add(bullet);

				//Set an event to delete the bullets after some time
				let that = this;
				setTimeout(
					() => {
						that.bullets = that.bullets.filter( (b) => { return b != bullet; } );
						that.drawObjectManager.remove(bullet);
					},
					5000 /*Life time of the bullet created in millisecond.*/
				);
			},

			clear(elapsedTime) {
				this.fireTimer = 0.0;
			},

			onFireStart() {
				this.updateFunction = this.fire;
			},

			onFireStop() {
				this.updateFunction = this.clear;
			},

			update(elapsedTimeSecond) {
				this.updateFunction(elapsedTimeSecond);

				this.bullets.forEach( function(bullet) {
					bullet.updatePosition(elapsedTimeSecond);
				} );
			}

		};

		let state = {
			fireTimer      		: 0.0,
			bullets        		: [],
			ship           		: ship,
			bulletFactory  		: bulletFactory,
			drawObjectManager	: drawObjectManager,
			updateFunction		: proto.clear
		};

		return Object.assign(state, proto);
	}

};

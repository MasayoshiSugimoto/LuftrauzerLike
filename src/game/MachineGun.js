"use strict";

const MACHINE_GUN_FIRE_RATE = 1.0; //Bullet per second

const MachineGun = {

	create(ship, bulletFactory, drawObjectManager) {
		let state = {
			fireTimer      		: 0.0,
			bullets        		: [],
			ship           		: ship,
			bulletFactory  		: bulletFactory,
			drawObjectManager	: drawObjectManager
		};

		return Object.assign(state, this.proto);
	},

	proto: {

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
			this.drawObjectManager.addDrawObject(bullet.getDrawObject());

			//Set an event to delete the bullets after some time
			let that = this;
			setTimeout(
				() => {
					that.bullets = that.bullets.filter( (b) => { b != bullet; } );
					that.drawObjectManager.remove(bullet.getDrawObject());
				},
				5000 /*Life time of the bullet created in millisecond.*/
			);
		},

		clear() {
			this.fireTimer = 0.0;
		}

	}

};

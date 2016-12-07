"use strict";

const Scheduler = {

	create(time) {
		return Object.assign(
			{
				time: time,
				lastTimeMillisecond: time.getCurrentTimeMillisecond(),
				frameCounter: 0,
				frameCounterTimerMillisecond: 0
			},
			{
				callByInterval(gameLoopFunction, intervalMilliseconds) {
					//First thing to do on a frame update is to update the current time.
					//Calculate the elapsed time
					let frameStartTimeMillisecond = time.getCurrentTimeMillisecond();
					let elapsedTimeSecond = Math.min(
							(frameStartTimeMillisecond - lastTimeMillisecond) / 1000,
							intervalMilliseconds / 1000.0); //Interval in seconds
					lastTimeMillisecond = frameStartTimeMillisecond;

					//Update frame counter
					frameCounter++;
					frameCounterTimerMillisecond = frameCounterTimerMillisecond + elapsedTimeSecond * 1000.0;

					if (frameCounterTimerMillisecond >= 1000 /* 1 second */) {
						//Update frame counter display
						let debugDiv = document.getElementById("debug");
						debugDiv.textContent = "Frame per second = " + frameCounter;
						//Reset frame counter
						frameCounterTimerMillisecond = frameCounterTimerMillisecond - 1000;
						frameCounter = 0
					}

					gameLoopFunction();

					let scheduler = this;
					window.setTimeout(
						() => { scheduler.callByInterval(gameLoopFunction); },
						//Remaining time before frame update in millisecond
						intervalMilliseconds -
							(time.getCurrentTimeMillisecond() - frameStartTimeMillisecond)
					);
				}
			}
		);
	}
};


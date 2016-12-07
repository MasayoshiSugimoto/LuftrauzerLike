"use strict";

const Time = {
	create() {
		return Object.create(
			{
				getCurrentTimeMillisecond() {
					return (new Date()).getTime();
				}
			}
		);
	}
};

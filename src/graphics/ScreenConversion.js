"use strict";

const PIXEL_PER_METER = 200;

function meter2Pixel(distanceInMeter) {
	return distanceInMeter * PIXEL_PER_METER;
}

function pixel2Meter(distanceInPixel) {
	return distanceInPixel / PIXEL_PER_METER;
}

function vectorMeter2Pixel(v) {
	return v.scalarMultiply(PIXEL_PER_METER);
}

function vectorPixel2Meter(v) {
	return v.scalarMultiply(1 / PIXEL_PER_METER);
}

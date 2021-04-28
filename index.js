/***********************************************************************
 *                                                                   _
 *       _____  _                           ____  _                 |_|
 *      |  _  |/ \   ____  ____ __ ___     / ___\/ \   __   _  ____  _
 *      | |_| || |  / __ \/ __ \\ '_  \ _ / /    | |___\ \ | |/ __ \| |
 *      |  _  || |__. ___/. ___/| | | ||_|\ \___ |  _  | |_| |. ___/| |
 *      |_/ \_|\___/\____|\____||_| |_|    \____/|_| |_|_____|\____||_|
 *
 *      ================================================================
 *                 More than a coder, More than a designer
 *      ================================================================
 *
 *
 *      - Document: index.js
 *      - Author: aleen42
 *      - Description: main entry
 *      - Create Time: Apr 28th, 2021
 *      - Update Time: Apr 28th, 2021
 *
 *
 **********************************************************************/

// Based on Canvas to operate by pixels
const {createCanvas} = require('canvas');

// Constructing an array to iterate
const times = n => Array(n).fill('');

module.exports = ch => {
	if (!ch) throw Error('You must specified a word to calculate.');

	const FONT_STYLE = '30px Consolas'; // Fixed-width Font
	// For aligning to the center position
	const [width, height] = (() => {
		const measure = createCanvas(50, 50);
		const measureContext = measure.getContext('2d');
		measureContext.font = FONT_STYLE;
		const {width, actualBoundingBoxAscent} = measureContext.measureText(ch);
		return [width, actualBoundingBoxAscent || width];
	})();

	// Using a 50 x 50n to calculate intensity of text
	const HEIGHT = 50, WIDTH = HEIGHT * ch.length;
	const canvas = createCanvas(WIDTH, HEIGHT);
	const canvasContext = canvas.getContext('2d');
	canvasContext.font = FONT_STYLE;
	canvasContext.fillText(ch, WIDTH / 2 - width / 2, HEIGHT / 2  + height / 2);

	// For testing
	// canvas.toDataURL((err, png) => require('child_process').spawnSync('chrome', [png]));

	// Sum by alpha value
	return times(WIDTH).reduce((sum, ignore, i) => sum + times(HEIGHT).reduce(
		(sum, ignore, j) => sum + /* alpha = */canvasContext.getImageData(i, j, 1, 1).data[3] / 255, 0
	), 0) / WIDTH / HEIGHT;
};

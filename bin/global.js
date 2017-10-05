#!/usr/bin/env node

'use strict';

const fs = require('fs');
const youto = require('../lib/index');


const usage = () => {
	console.log('Usage:\n' +
		'\tyouto [INPUT URL]\n' +
		'\tyouto https://www.youtube.com/watch?v=sdL7bE6b6AM\n' +
		'\tyouto [INPUT URL] [OUTPUT FILE]\n' +
		'\tyouto https://www.youtube.com/watch?v=sdL7bE6b6AM "Songs/Sweet Baby James.mp3"\n' +
		'\tyouto [INPUT URL] [OUTPUT FILE] [FORMAT]\n' +
		'\tyouto https://www.youtube.com/watch?v=sdL7bE6b6AM "Sweet Baby James" flv\n');
}


if (!process.argv[2] || process.argv[2] == '--h' || process.argv[2] == '-help') {
	usage();
	process.exit();
}


const url = process.argv[2];
const filename = process.argv[3];
const format = process.argv[4];

let promise;

if (format) {
	promise = youto(url, {filename, format});
}
else if (filename) {
	promise = youto(url, {filename});
}
else {
	promise = youto(url);
}

promise.then(() => console.log('Done!'))
	.catch((err) => console.log(err));


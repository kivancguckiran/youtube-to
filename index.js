'use strict';

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const binaries = require('ffmpeg-binaries');


module.exports = (url, stream, format) => {
	return new Promise((resolve, reject) => {
		if (!url) reject('URL must be provided.');
		if (!stream) reject('Writable stream must be provided.');
		if (!format) format = 'mp3';

		ffmpeg(ytdl(url))
				.setFfmpegPath(binaries.ffmpegPath())
				.format(format)
				.output(stream)
				.on('error', (err) => reject(err))
				.on('end', () => resolve())
				.run();
	});
}

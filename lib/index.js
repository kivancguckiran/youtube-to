'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('youto');
const mkdirp = require('mkdirp');
const sanitize = require('sanitize-filename');
const extension = require('file-extension');
const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const binaries = require('ffmpeg-binaries');


const convertAndSave = (url, stream, format) => {
	return new Promise((resolve, reject) => {
		ffmpeg(ytdl(url))
			.setFfmpegPath(binaries.ffmpegPath())
			.format(format)
			.output(stream)
			.on('start', (commandLine) => debug(commandLine))
			.on('stderr', (stderrLine) => debug(stderrLine))
			.on('error', (err) => reject(err))
			.on('end', () => resolve())
			.run();
	});
}

const getTitle = (url) => {
	return new Promise((resolve, reject) => {
		ytdl.getInfo(url)
			.then((info) => resolve(info.title))
			.catch((err) => reject(err));
	});
}

const mkdir = (folder) => {
	return new Promise((resolve, reject) => {
		mkdirp(folder, (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
}

module.exports = (url, options) => {
	if (!url) return Promise.reject('URL must be provided');

	options = options || {};

	if (!options.stream) {
		let promise;
		let folder;

		if (!options.filename) {
			options.format = options.format || 'mp3';
			folder = '.';

			promise = getTitle(url)
				.then((title) => sanitize(title + '.' + options.format));
		}
		else {
			options.format = options.format || extension(options.filename);
			folder = path.dirname(options.filename);

			promise = Promise.resolve(sanitize(options.filename));
		}

		return mkdir(folder)
			.then(() => promise)
			.then((filename) => convertAndSave(url, fs.createWriteStream(path.join(folder, filename)), options.format));
	}
	else {
		options.format = options.format || 'mp3';

		return convertAndSave(url, options.stream, options.format);		
	}
}

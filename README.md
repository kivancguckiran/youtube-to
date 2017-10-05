# youtube-to
Converts youtube links to audio/video formats using ffmpeg and ytdl libraries. Downloads `ffmpeg` with npm install, no need to specify path. Returns a promise.

```
npm install youtube-to
```

# Usage

```js
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw')
    .then(() => console.log('Done!'))
    .catch((err) => console.log(err));
```

# API
### youto(url[, options])

Downloads the specified `url` with the `options` provided.

#### options

JSON structure with the options below:

```js
{stream: fs.createWriteStream('file'), filename: 'folder/test.mp3', format: 'mp3'}
```

# Examples

### To mp3
```js
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw');
```

Converts the video to mp3, gets the title of the video and saves it as `[TITLE].mp3`.

### To FLV
```js
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw', {format: 'flv'});
```

### Provide a writable stream
```js
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw', {stream: fs.createWriteStream('zoo.flv'), format: 'flv'});
```

It is required to specify format if it is not mp3.

### Without stream
```js
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw', {filename: 'folder/zoo.flv'});
```

Format is derived from filename.

# Global installation

```
npm install youtube-to -g
```

### Example

```
> youto

Usage:
        youto [INPUT URL]
        youto "https://www.youtube.com/watch?v=sdL7bE6b6AM"
        youto [INPUT URL] [OUTPUT FILE]
        youto "https://www.youtube.com/watch?v=sdL7bE6b6AM" "Songs/Sweet Baby James.mp3"
        youto [INPUT URL] [OUTPUT FILE] [FORMAT]
        youto "https://www.youtube.com/watch?v=sdL7bE6b6AM" "Sweet Baby James" "flv"

```


```
> youto 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
```

Gets video's title and converts to mp3 as `[TITLE].mp3`.

```
> youto 'https://www.youtube.com/watch?v=jNQXAC9IVRw' 'video/zoo.ogg'
```

Saves the video to `video/zoo.ogg` with `ogg` type.

```
> youto 'https://www.youtube.com/watch?v=jNQXAC9IVRw' 'video/zoo' 'flv'
```

Converts the video to `flv` and saves it to `video/zoo`


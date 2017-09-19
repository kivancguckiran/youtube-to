# youtube-to
Converts youtube links to audio/video formats using ffmpeg and ytdl libraries. Downloads `ffmpeg` with npm install, no need to specify path.

```
npm install youtube-to
```

# Usage

```js
const fs = require('fs');
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw', fs.createWriteStream('me_at_the_zoo.flv'), 'flv');
```

# API
### youto(url, stream, [format])

Downloads the specified `url` into the writable `stream` provided. Default for `format` is 'mp3'.

# Examples

### To mp3
```js
const fs = require('fs');
const youto = require('youtube-to');

youto('https://www.youtube.com/watch?v=jNQXAC9IVRw', fs.createWriteStream('me_at_the_zoo.mp3'));
```

Converts the video to mp3 and saves it as `me_at_the_zoo.mp3`. Since the default format is 'mp3', you do not need to enter format.

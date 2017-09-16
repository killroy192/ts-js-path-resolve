# TS-JS-PATH-RESOLVE

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

> Use the "NODE_PATH hack" to add new path from tsconfig.json where nodejs should search for modules. **Works with `typescript@>=2.0`**.

## Installation

```sh
npm install ts-js-path-resolve --save-dev
```

## Usage

```sh
rootDir
|
/src
   |
   /lib
       |
       main.ts
   |
   /lib2
       |
       /lib3
           |
           index.ts
```

```js
// ts-config.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "baseUrl": "./src",
    "paths": {
      "*": [
        "./li/*"
      ],
      "lib/*": ["./lib/*"]
    }
  },
}

// now can require some modules as:
// src/main.ts
import * as http from 'http';
import * as path from 'path';
import resolve from 'ts-js-path-resolve';
const configPath = path.join(__dirname, '..', 'tsconfig.json'); //add absolute path to tsconfig.json
resolve(configPath);

import module1 from 'lib/main';
import module2 from 'lib2/lib3/'; // now import currectly work after compiling
```

## flags

* **--logs, -LG** Get a logs display how change NODE_PATH

## License

MIT

[npm-image]: https://img.shields.io/badge/npm-3.0.0-blue.svg
[npm-url]: https://npmjs.org/package/ts-js-path-resolve
[downloads-image]: https://img.shields.io/badge/downloads-1%2Fday-yellow.svg
[downloads-url]: https://npmjs.org/package/ts-js-path-resolve

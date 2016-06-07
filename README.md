# Zoo

[![Build Status](https://travis-ci.org/jsonmaur/zoo.svg?branch=master)](https://travis-ci.org/jsonmaur/zoo)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/zoo/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/zoo?branch=master)

Zoo is a combination of two great libraries, [cross-env](https://github.com/kentcdodds/cross-env) and [dotenv](https://github.com/motdotla/dotenv). It loads environment variables from a `.env` file and injects them directly into the Node process. You can also specify variables with the command itself.

## Getting Started

```bash
npm install zoo --save
```

###### .env
```
NAME=Tyrion Lannister
STRONGHOLD=Casterly Rock
```

###### package.json
```json
{
  "scripts": {
    "start": "zoo node index.js"
  }
}
```

###### index.js
```javascript
console.log(process.env)
/*
  {
    ...
    NAME: "Tyrion Lannister",
    STRONGHOLD: "Casterly Rock"
  }
*/
```

You can also specify variables by appending to the `zoo` command.

```json
{
  "scripts": {
    "start": "zoo NODE_ENV=production node index.js"
  }
}
```

You can also require into your app as a module. This will register the environment variables for everything after the require statement.

```javascript
require('zoo') // loads from .env in CWD
```

Any variables you specify will be appended to the existing environment variables. If you specify a variable that already exists, it will be replaced.

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)

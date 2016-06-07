# Zoo

[![Build Status](https://travis-ci.org/jsonmaur/zoo.svg?branch=master)](https://travis-ci.org/jsonmaur/zoo)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/zoo/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/zoo?branch=master)

Zoo is the easiest way to set cross-platform environment variables for your app. It is a combination of two great libraries, [cross-env](https://github.com/kentcdodds/cross-env) and [dotenv](https://github.com/motdotla/dotenv), and lets you load variables from a `.env` file or passed as arguments.

Since it runs your commands as a spawned processes, your environment variables are injected directly into the process and are guaranteed to be there when you need them.

> Warning: It's never a good idea to commit your `.env` files to source control!

## Getting Started

```bash
# use globally
npm install zoo -g
# or keep it project specific
npm install zoo --save-dev
```

To get started, simply run `zoo` followed by your command. For example, running `zoo node index.js` will take the environment variables from `.env` and inject them into the Node process, giving you access to them with `process.env.*`.

## Examples

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
console.log(process.env.NAME) // Tyrion Lannister
console.log(process.env.STRONGHOLD) // Casterly Rock
```

You can also specify variables by appending to the `zoo` command.

```json
{
  "scripts": {
    "start": "zoo NODE_ENV=production node index.js"
  }
}
```

If you require `zoo` into your app as a module, it will register the environment variables, but this method is not recommended.

```javascript
require('zoo') // loads from .env in CWD
```

Any variables you specify will be appended to the existing environment variables. If you specify a variable that already exists, it will be replaced.

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)

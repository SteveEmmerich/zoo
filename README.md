# Zoo

[![Build Status](https://travis-ci.org/jsonmaur/zoo.svg?branch=master)](https://travis-ci.org/jsonmaur/zoo)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/zoo/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/zoo?branch=master)

Zoo is the easiest way to set cross-platform environment variables for your app. It is a combination of two great libraries, [cross-env](https://github.com/kentcdodds/cross-env) and [dotenv](https://github.com/motdotla/dotenv), and lets you load variables from a `.env` file or passed as arguments. It is built in and runs on Node, but `zoo` can be used to set environment variables in any subcommand (such as BASH).

When `zoo` is run, your environment variables are injected directly into a spawned process and your variables are guaranteed to be there when you need them. Works on both unix and windows machines.

> Warning: It's never a good idea to commit your `.env` files to source control!

## Getting Started

```bash
# use globally
npm install zoo -g
# or keep it project specific
npm install zoo --save-dev
```

To get started, simply run `zoo` followed by your command. For example, running `zoo node index.js` will take the environment variables from `.env` and inject them into the Node process, giving you access to them with `process.env.*`.

Any variables you specify will be appended to existing environment variables. If you specify a variable that already exists, it will be replaced.

## Usage

Your `.env` file should be in the form of `NAME=VALUE` with one variable per line, and should be in the root directory of your project. It should also be ignored from your source control.

###### .env
```
NAME=Tyrion Lannister
STRONGHOLD=Casterly Rock
```

If you specify variables command-style, simply put them after the `zoo` command with a space between multiple variables.

```
zoo NODE_ENV=production NAME=Tyrion Lannister node index.js
```

If you use `require('zoo')` in your app instead of using the CLI, it will register the environment variables as early as possible, but this method is not recommended.

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)

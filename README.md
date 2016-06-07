# Zoo

[![Build Status](https://travis-ci.org/jsonmaur/zoo.svg?branch=master)](https://travis-ci.org/jsonmaur/zoo)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/zoo/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/zoo?branch=master)

Zoo is the easiest way to set cross-platform environment variables for your app. It is a combination of two great libraries, [cross-env](https://github.com/kentcdodds/cross-env) and [dotenv](https://github.com/motdotla/dotenv), and lets you load variables from a `.env` file or passed as arguments. It is built in and runs on Node, but it can be used to set environment variables in any subprogram (such as BASH).

When `zoo` is run, your environment variables are injected directly into a spawned process, and your variables are guaranteed to be there when you need them. Works on both unix and windows machines.

> Warning: It's never a good idea to commit your `.env` files to source control!

## Why?

As part of the [Twelve-Factor App](http://12factor.net/config) methodology, you should be using environment variables. Setting them in your production app is easy if you're using [Heroku](https://www.heroku.com) or similar services, but it can be a pain to deal with on your local machine.

Zoo lets you set up all your variables for dev/testing in a simple and consistent way throughout your team. It can also be great if you are using something like [transform-inline-environment-variables](https://babeljs.io/docs/plugins/transform-inline-environment-variables)  to inline values for AWS Lambda functions or similar.

## Getting Started

```bash
# use globally
npm install zoo -g
# or keep it local
npm install zoo --save-dev
```

To get started, simply run `zoo` followed by your command. For example, running `zoo node index.js` will take the environment variables from `.env` and inject them into the Node process, giving you access to them with `process.env`.

Any variables you specify will be appended to the existing environment variables. If you specify a variable that already exists, it will be skipped. This can be overridden with the `--force` flag (e.g. `zoo PWD=/ --force node index.js`).

## Usage

Your `.env` file should be in the form of `NAME=VALUE` with one variable per line, and should be in the root directory of your project. It should be ignored from your source control.

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

## Custom Environment File

If you want to specify a custom location for your environment file, you can do so with the `--env` flag. Note that an error will be thrown and the process will exit if the custom file is not found.

`zoo --env ../.environment-vars node index.js`

## API

### .parse(vars)

  - **vars** - Variables in the format specified above that you want to parse into an object manually.

    > Type: `string/buffer`  
    > Default: `''`

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)

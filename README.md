# Zoo

[![Build Status](https://travis-ci.org/jsonmaur/zoo.svg?branch=master)](https://travis-ci.org/jsonmaur/zoo)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/zoo/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/zoo?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

## Usage

Your `.env` file should be in the form of `NAME=VALUE` with one variable per line, and should be in the root directory of your project. It should be ignored from your source control.

###### .env
```
NAME=Tyrion Lannister
STRONGHOLD=Casterly Rock
```

If you specify variables command-style, simply put them after the `zoo` command with a space between multiple variables. Variables with spaces or special characters should be enclosed in quotes.

```
zoo NODE_ENV=production NAME="Tyrion Lannister" node index.js
```

If you use `require('zoo')` in your app instead of using the CLI, it will register the environment variables as early as possible. This method works but is *not* recommended.

## Existing Variables

All existing environment variables will be preserved. If you specify a variable that already exists in the environment, it will be skipped. This can be overridden with the `--force` flag as seen below.

```
zoo PWD=/ --force node index.js
```

## Custom Environment File

If you want to specify a custom location for your environment file, you can do so with the `--zoofile` flag. Note that an error will be thrown and the process will exit if the custom file is not found.

`zoo --zoofile ../.environment-vars node index.js`

## Javascript API

#### .get (file)

  Get the variables from a file without modifying the environment.

  - **file** - The filename of your environment variables file.

    > Type: `string`  

#### .parse (vars)

  Parses variables in the `NAME=VALUE` format.

  - **vars** - Variables in above format that you want to parse into a javascript object.

    > Type: `string/buffer`  
    > Default: `''`

#### .stringify (obj)

  Converts a javascript object into `KEY=VALUE` format. Deep objects and arrays are converted into stringified paths. e.g. `{ deep: { object: 'value' } }` gets converted to `deep.object=value`, and `{ arr: ['hi', 'hey'] }`gets converted to `arr.0=hi` and `arr.1=hey`.

  - **obj** - The javascript object you want to convert.

    > Type: `object`  

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)

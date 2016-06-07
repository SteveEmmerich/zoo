import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import spawn from 'cross-spawn'
import parse from './parse'

module.exports = () => {
  let argv = minimist(process.argv.slice(2))

  /* require a subcommand to inject variables into */
  if (process.argv.length <= 2) {
    throw new Error('No program specified! Run "zoo" followed by your command.')
  }

  /* path to environment file */
  const envFile = path.resolve(process.cwd(), argv.env || '.env')

  /* require file if it is specified */
  if (argv.env && !fs.existsSync(envFile)) {
    throw new Error(`"${envFile}" was not found!`)
  }

  /* load variables from file if it exists */
  const customEnv = fs.existsSync(envFile)
    ? parse(fs.readFileSync(envFile)) : {}

  /* load variables from command, and remove them from argv */
  argv._ = argv._.map((arg) => {
    const match = arg.match(/(\w+)=('(.+)'|"(.+)"|(.+))/)
    if (match) {
      customEnv[match[1]] = match[3] || match[4] || match[5]
    } else {
      return arg
    }
  }).filter(Boolean)

  /* spawn subprocess with new environment variables */
  return spawn(argv._[0], argv._.slice(1, argv._.length), {
    stdio: 'inherit',
    env: process.env = { ...customEnv, ...process.env },
  }).on('exit', process.exit)
}

module.exports.parse = parse

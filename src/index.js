import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import spawn from 'cross-spawn'
import parse from './parse'

module.exports = () => {
  const config = minimist(process.argv.slice(2), { boolean: ['force'] })

  /* require a subcommand to inject variables into */
  if (process.argv.length <= 2) {
    throw new Error('No program specified! Run "zoo" followed by your command.')
  }

  /* path to environment file */
  const envFile = path.resolve(process.cwd(), config.zoofile || '.env')

  /* require file if it is specified */
  if (config.zoofile && !fs.existsSync(envFile)) {
    throw new Error(`"${envFile}" was not found!`)
  }

  /* load variables from file if it exists */
  const customEnv = fs.existsSync(envFile)
    ? parse(fs.readFileSync(envFile)) : {}

  /* load variables from command, and remove them from argv */
  let argv = process.argv.map((arg) => {
    const match = arg.match(/(\w+)=('(.+)'|"(.+)"|(.+))/)
    if (match) {
      customEnv[match[1]] = match[3] || match[4] || match[5]
    } else {
      return arg
    }
  }).filter(Boolean)

  /* set environment vars, overwriting if forced */
  const env = process.env = config.force
    ? { ...process.env, ...customEnv }
    : { ...customEnv, ...process.env }

  /* remove --zoofile arg (this feels hacky...) */
  const zooFileArg = argv.indexOf('--zoofile')
  if (zooFileArg > -1) argv.splice(zooFileArg, 2)

  /* spawn subprocess with new environment variables */
  return spawn(argv[2], argv.slice(3, argv.length), {
    stdio: 'inherit',
    env
  }).on('exit', process.exit)
}

function get (file) {
  const data = fs.readFileSync(file)
  return parse(data)
}

module.exports.get = get
module.exports.parse = parse

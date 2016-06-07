import fs from 'fs'
import path from 'path'
import spawn from 'cross-spawn'
import parse from './parse'

module.exports = () => {
  const envFile = path.resolve('.env')
  if (!fs.existsSync(envFile)) {
    throw new Error(`"${path.basename(envFile)}" does not exist!`)
  }

  const env = parse(fs.readFileSync(envFile))

  const argv = process.argv.map((arg) => {
    const match = arg.match(/(\w+)=('(.+)'|"(.+)"|(.+))/)
    if (match) {
      env[match[1]] = match[3] || match[4] || match[5]
    } else {
      return arg
    }
  }).filter(Boolean)

  const customEnv = {
    APPDATA: process.env.APPDATA,
    ...process.env,
    ...env,
  }

  process.env = customEnv
  return spawn(argv[2], argv.slice(3, argv.length), {
    stdio: 'inherit',
    env: customEnv,
  }).on('exit', process.exit)
}

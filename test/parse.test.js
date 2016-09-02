import fs from 'fs'
import test from 'ava'
import parse from '../src/parse'

test('parses environment variables correctly', (t) => {
  const env = parse(fs.readFileSync('.env'))
  t.is(env.NAME, 'Tyrion Lannister')
  t.is(env.STRONGHOLD, 'Casterly Rock')
  t.is(env.DEEP.VALUE, 'Hello')
})

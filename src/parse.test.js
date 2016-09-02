import test from 'ava'
import parse from '../src/parse'

const envStr = `
NAME=Tyrion Lannister
STRONGHOLD=Casterly Rock
DEEP.VALUE=Hello
ARR.0=hey
ARR.1=hi
`

test('parses environment variables correctly', (t) => {
  const env = parse(envStr)
  t.is(env.NAME, 'Tyrion Lannister')
  t.is(env.STRONGHOLD, 'Casterly Rock')
  t.is(env.DEEP.VALUE, 'Hello')
  t.is(env.ARR[0], 'hey')
  t.is(env.ARR[1], 'hi')
})

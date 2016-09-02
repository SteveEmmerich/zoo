import test from 'ava'
import stringify from '../src/stringify'

test('converts object to stringed variables', (t) => {
  t.is(stringify({ one: '1', two: 2, three: 'three' }), 'one=1\ntwo=2\nthree=three')
  t.is(stringify({ one: '1', two: 2, three: { four: 'four' } }), 'one=1\ntwo=2\nthree.four=four')
  t.is(stringify({ one: '1', two: 2, three: { four: 'four', hey: { whatup: 'yo' } } }), 'one=1\ntwo=2\nthree.four=four\nthree.hey.whatup=yo')
  t.is(stringify({ one: '1', two: 2, three: ['hi', 'hey'] }), 'one=1\ntwo=2\nthree.0=hi\nthree.1=hey')
})

import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

const spawned = { on: sinon.spy() }
const spy = sinon.spy(() => spawned)

const zoo = proxyquire('../src', {
  'cross-spawn': spy,
})

test('sets environment variables from file and cli', (t) => {
  process.argv = ['node', 'zoo', 'NODE_ENV=westeros', 'hello', 'world']
  zoo()
  t.is(process.env.NAME, 'Tyrion Lannister')
  t.is(process.env.STRONGHOLD, 'Casterly Rock')
  t.is(process.env.NODE_ENV, 'westeros')
  t.true(spy.calledOnce)
  t.true(spy.calledWith('hello', ['world'], {
    stdio: 'inherit',
    env: { ...process.env },
  }))
})

test.todo('skips existing variables')
test.todo('load from custom file')
test.todo('nonexistant custom file')

// *** TESTS FROM OTHER LIBRARIES TO IMPLEMENT ***

//   it(`should set environment variables and run the remaining command`, () => {
//     testEnvSetting({
//       FOO_ENV: 'production'
//     }, 'FOO_ENV=production');
//   });
//
//   it(`should handle multiple env variables`, () => {
//     testEnvSetting({
//       FOO_ENV: 'production',
//       BAR_ENV: 'dev'
//     }, 'FOO_ENV=production', 'BAR_ENV=dev');
//   });
//
//   it(`should handle special characters`, () => {
//     testEnvSetting({
//       FOO_ENV: './!?'
//     }, 'FOO_ENV=./!?');
//   });
//
//   it(`should handle single-quoted strings`, () => {
//     testEnvSetting({
//       FOO_ENV: 'bar env'
//     }, 'FOO_ENV=\'bar env\'');
//   });
//
//   it(`should handle double-quoted strings`, () => {
//     testEnvSetting({
//       FOO_ENV: 'bar env'
//     }, 'FOO_ENV="bar env"');
//   });
//
//   it(`should handle equality signs in quoted strings`, () => {
//     testEnvSetting({
//       FOO_ENV: 'foo=bar'
//     }, 'FOO_ENV="foo=bar"');
//   });
//
//   it(`should do nothing given no command`, () => {
//     crossEnv([]);
//     expect(proxied['cross-spawn'].spawn).to.have.not.been.called;
//   });
//
//   function testEnvSetting(expected, ...envSettings) {
//     const ret = crossEnv([...envSettings, 'echo', 'hello world']);
//     const env = {[getPathVar()]: process.env[getPathVar()]};
//     env.APPDATA = process.env.APPDATA;
//     assign(env, expected);
//
//     expect(ret, 'returns what spawn returns').to.equal(spawned);
//     expect(proxied['cross-spawn'].spawn).to.have.been.calledOnce;
//     expect(proxied['cross-spawn'].spawn).to.have.been.calledWith(
//       'echo', ['hello world'], {
//         stdio: 'inherit',
//         env: assign({}, process.env, env)
//       }
//     );
//
//     expect(spawned.on).to.have.been.calledOnce;
//     expect(spawned.on).to.have.been.calledWith('exit');
//   }

//   describe('config', function () {
//     var readFileSyncStub, parseStub
//
//     beforeEach(function (done) {
//       readFileSyncStub = s.stub(fs, 'readFileSync').returns('test=val')
//       parseStub = s.stub(dotenv, 'parse').returns({test: 'val'})
//       done()
//     })
//
//     it('takes option for path', function (done) {
//       var testPath = 'test/.env'
//       dotenv.config({path: testPath})
//
//       readFileSyncStub.args[0][0].should.eql(testPath)
//       done()
//     })
//
//     it('takes option for encoding', function (done) {
//       var testEncoding = 'base64'
//       dotenv.config({encoding: testEncoding})
//
//       readFileSyncStub.args[0][1].should.have.property('encoding', testEncoding)
//       done()
//     })
//
//     it('reads path with encoding, parsing output to process.env', function (done) {
//       dotenv.config()
//
//       readFileSyncStub.callCount.should.eql(1)
//       parseStub.callCount.should.eql(1)
//       done()
//     })
//
//     it('makes load a synonym of config', function (done) {
//       dotenv.load()
//
//       readFileSyncStub.callCount.should.eql(1)
//       parseStub.callCount.should.eql(1)
//       done()
//     })
//
//     it('does not write over keys already in process.env', function (done) {
//       process.env.test = 'test'
//       // 'val' returned as value in `beforeEach`. should keep this 'test'
//       dotenv.config()
//
//       process.env.test.should.eql('test')
//       done()
//     })
//
//     it('catches any errors thrown from reading file or parsing', function (done) {
//       var errorStub = s.stub(console, 'error')
//       readFileSyncStub.throws()
//
//       dotenv.config().should.eql(false)
//       errorStub.callCount.should.eql(1)
//       done()
//     })
//
//     it('takes option for silencing errors', function (done) {
//       var errorStub = s.stub(console, 'error')
//       readFileSyncStub.throws()
//
//       dotenv.config({silent: true}).should.eql(false)
//       errorStub.called.should.be.false
//       done()
//     })
//   })
//
//   describe('parse', function () {
//     var parsed
//     before(function (done) {
//       process.env.TEST = 'test'
//       parsed = dotenv.parse(fs.readFileSync('test/.env', {encoding: 'utf8'}))
//       done()
//     })
//
//     it('should return an object', function (done) {
//       parsed.should.be.an.instanceOf(Object)
//       done()
//     })
//
//     it('should parse a buffer from a file into an object', function (done) {
//       var buffer = new Buffer('BASIC=basic')
//
//       var payload = dotenv.parse(buffer)
//       payload.should.have.property('BASIC', 'basic')
//       done()
//     })
//
//     it('sets basic environment variable', function (done) {
//       parsed.BASIC.should.eql('basic')
//       done()
//     })
//
//     it('reads after a skipped line', function (done) {
//       parsed.AFTER_LINE.should.eql('after_line')
//       done()
//     })
//
//     it('defaults empty values to empty string', function (done) {
//       parsed.EMPTY.should.eql('')
//       done()
//     })
//
//     it('escapes double quoted values', function (done) {
//       parsed.DOUBLE_QUOTES.should.eql('double_quotes')
//       done()
//     })
//
//     it('escapes single quoted values', function (done) {
//       parsed.SINGLE_QUOTES.should.eql('single_quotes')
//       done()
//     })
//
//     it('expands newlines but only if double quoted', function (done) {
//       parsed.EXPAND_NEWLINES.should.eql('expand\nnewlines')
//       parsed.DONT_EXPAND_NEWLINES_1.should.eql('dontexpand\\nnewlines')
//       parsed.DONT_EXPAND_NEWLINES_2.should.eql('dontexpand\\nnewlines')
//       done()
//     })
//
//     it('ignores commented lines', function (done) {
//       parsed.should.not.have.property('COMMENTS')
//       done()
//     })
//
//     it('respects equals signs in values', function (done) {
//       parsed.EQUAL_SIGNS.should.eql('equals==')
//       done()
//     })
//
//     it('retains inner quotes', function (done) {
//       parsed.RETAIN_INNER_QUOTES.should.eql('{\"foo\": \"bar\"}')
//       parsed.RETAIN_INNER_QUOTES_AS_STRING.should.eql('{\"foo\": \"bar\"}')
//       done()
//     })
//
//     it('retains spaces in string', function (done) {
//       parsed.INCLUDE_SPACE.should.eql('some spaced out string')
//       done()
//     })
//
//     it('parses email addresses completely', function (done) {
//       parsed.should.have.property('USERNAME', 'therealnerdybeast@example.tld')
//       done()
//     })
//   })

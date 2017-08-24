/* eslint no-console: 0*/

const _require = require;

process.once('loaded', () => {
  console.log('Making copy of electron require method. Can be found as _require().');
  global._require = _require;
  global.__appPath = __dirname;
});

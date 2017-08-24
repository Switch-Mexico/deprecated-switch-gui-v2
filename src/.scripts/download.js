////////////////////////////////////////////////////////////////////////////////
// Download Resources for build
////////////////////////////////////////////////////////////////////////////////

/* eslint-env shelljs */
/* eslint no-sync: 0 */
/* eslint no-console: 0 */

'use strict';

require('shelljs/global');
require('colors');

const tar = require('tar');
const path = require('path');
const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const gunzip = require('gunzip-maybe');
const pjson = require('../package.json');

const mongoVersion = pjson.mongo_version;

// Auto-exit on errors
config.fatal = true;

echo('-----> Download resources for build...'.yellow);

// -- Determine the platform and arch running ----------------------------------

const args = require('minimist')(process.argv.slice(2));

const platform = args.platform;
const arch = args.arch;

if (!platform) {
  throw new Error('Platform not specified...'.bold.red);
}

if (!arch) {
  throw new Error('Architecture not specified...'.bold.red);
}

console.log('Target platform: '.bold.white, platform);
console.log('Target architecture: '.bold.white, arch);

// -- Set up some paths --------------------------------------------------------

const dir = __dirname;
const base = path.normalize(path.join(dir, '..'));

// -- Helpers ------------------------------------------------------------------

const removeExtension = function (fileName) {
  let charsToSlice = 0;
  if (fileName.indexOf('.tar.gz') !== -1) {
    charsToSlice = 7;
  } else {
    // .tgz, .zip
    charsToSlice = 4;
  }

  return fileName.slice(0, -(charsToSlice));
};

const unzip = function (file, unzipPath, message, zip) {
  if (zip) {
    const z = new AdmZip(file);
    z.extractAllTo('./', true);
  } else {
    fs.createReadStream(base + '/.cache/' + file)
    .pipe(gunzip())
    .pipe(tar.Extract({ path: unzipPath, strip: 1 }))
    .on('error', function (er) { echo(er); })
    .on('end', function () { echo(message); });
  }
};

// -- Determine the files to fetch ---------------------------------------------

let mongoFile = '';

if (platform === 'win32') {
  const archName = (arch === 'x86') ? '-i386-' : '-x86_64-2008plus-';

  mongoFile = 'mongodb-' + platform + archName + mongoVersion + '.zip';
} else {
  const archName = (arch === 'x86') ? '-i686-' : '-x86_64-';

  mongoFile = 'mongodb-' + platform + archName + mongoVersion + '.tgz';

  if (platform === 'darwin') {
    mongoFile = 'mongodb-osx-x86_64-' + mongoVersion + '.tgz';
  }
}

// -- Create cache folder if it do not exists ----------------------------------

cd(base);

if (!test('-d', '.cache')) {
  mkdir('.cache');
}

cd('.cache');

// -- Download MongoDB ---------------------------------------------------------

if (!test('-f', mongoFile)) {

  echo('-----> Downloading MongoDB...'.yellow + ' (version: ' + mongoVersion + ')');

  const os = platform === 'darwin' ? 'osx' : platform;
  const mongoCurl = 'curl -L -o ' +
    mongoFile +
    ' https://fastdl.mongodb.org/' +
    os + '/' +
    mongoFile;

  exec(mongoCurl);
  echo('-----> Unzipping MongoDB...'.yellow);

  const p = 'mongodb-' + platform + '-' + arch;
  if (!test('-d', p)) {
    mkdir(p);
  }

  if (platform === 'win32') {
    unzip(mongoFile, p, 'MongoDB unzipped.'.green, true);
    const outDir = removeExtension(mongoFile);
    mv(base + '/.cache/' + outDir + '/*', base + '/.cache/' + p);
    fs.removeSync(base + '/.cache/' + outDir);

  } else {
    unzip(mongoFile, p, 'MongoDB unzipped.'.green);
  }

} else {
  echo('MongoDB already downloaded.');
}

echo('Finished downloading!'.green);

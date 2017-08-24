////////////////////////////////////////////////////////////////////////////////
// Prepare the app for dist
////////////////////////////////////////////////////////////////////////////////

/* eslint-env shelljs */
/* eslint no-sync: 0 */
/* eslint no-console: 0 */

'use strict';

require('shelljs/global');
require('colors');

const path = require('path');
const fs = require('fs-extra');
const pjson = require('../package.json');
// Auto-exit on errors
config.fatal = true; // eslint-disable-line

echo('-----> Preparing for build...'.yellow);

// -- Determine the platform and arch running ----------------------------------

const args = require('minimist')(process.argv.slice(2));

const currentPlatform = process.platform;
const platform = args.platform;
const arch = args.arch;

if (!platform) {
  throw new Error('Platform not specified...'.bold.red);
}

if (!arch) {
  throw new Error('Architecture not specified...'.bold.red);
}

const onWindows = currentPlatform === 'win32';

console.log('Target platform: '.bold.white, platform);
console.log('Target architecture: '.bold.white, arch);

// -- Set up some paths --------------------------------------------------------

const dir = __dirname;
const base = path.normalize(path.join(dir, '..'));
const appPath = '.app';

// -- Build the meteor app -----------------------------------------------------

echo('-----> Building bundle from Meteor app, this may take a few minutes...'.yellow);

cd(base);

const meteorCommand = (onWindows === true) ? 'meteor.bat' : 'meteor';
exec(meteorCommand + ' build --directory .bundle');


// -- Remove node_modules inside meteor bundle -----------------------------------------------------

cd(base + '/.bundle/bundle/programs/server');

fs.removeSync('node_modules');

echo('-----> Bundle created :)\n'.green);

cd(base);

// -- Copy all necessary stuff into ./app directory ----------------------------

fs.removeSync(appPath);

mkdir(appPath);

function copyMeteorBundle(os) {
  const appBundlePath = path.join(appPath, 'bundle');
  switch (os) {

    case 'win32':
    case 'linux':
    case 'darwin':
      mkdir(appBundlePath);
      cp('-R', '.bundle/bundle/*', appBundlePath);
      break;

    default:
      throw new Error('Unrecognized Operating System. Exiting...'.bold.red);
  }
}

function copyStartupFiles(os) {
  // Remove unnecessary fields in package.json
  delete pjson.devDependencies;
  delete pjson.scripts;
  delete pjson.private;
  delete pjson.mongo_version;

  const rebuildPath = path.join('..', 'node_modules', '.bin', 'electron-rebuild');
  pjson.scripts = {
    postinstall: `${rebuildPath} --arch ${arch === 'x64' ? arch : 'ia32'} --version ${pjson.electron_version} --module-dir ./`
  };

  const bundlePjson = require('../.bundle/bundle/programs/server/package.json');
  const bundleDependencies = bundlePjson.dependencies;

  // Add meteor dependencies like fibers and so on
  Object.keys(bundleDependencies).forEach((key) => {
    pjson.dependencies[key] = bundleDependencies[key];
  });

  // Write the new package.json file
  fs.writeFile(path.join(appPath, 'package.json'), JSON.stringify(pjson), 'utf8', (error) => {
    if (error) {
      throw new Error('Could not create package.json file. Exiting...'.bold.red);
    }

    switch (os) {
      case 'win32':
      case 'linux':
      case 'darwin':
        cp('.index.js', appPath);
        cp('.preload.js', appPath);
        cp('.splash.html', appPath);
        cp('packager.json', appPath);
        cp('settings.json', appPath);
        break;

      default:
        throw new Error('Unrecognized Operating System. Exiting...'.bold.red);
    }
  });
}

function copyBinaryFiles(os, architecture) {
  switch (os) {

    case 'win32':
    case 'linux':
    case 'darwin':
      const resourceDir = path.join(appPath, 'resources');
      mkdir(resourceDir);

      const mongodbPostfix = (os === 'win32') ? 'mongod.exe' : 'mongod';
      const mp = path.join('.cache', `mongodb-${os}-${architecture}`);

      cp(path.join(mp, 'bin', mongodbPostfix), resourceDir);
      cp(path.join(mp, 'GNU-AGPL-3.0'), resourceDir);
      break;

    default:
      throw new Error('Unrecognized Operating System. Exiting...'.bold.red);
  }
}

// Copy necessary files
echo('-----> Copying Meteor bundle into .app directory...'.yellow);
copyMeteorBundle(platform, arch);

echo('-----> Copying startup files into .app directory...'.yellow);
copyStartupFiles(platform, arch);

echo('-----> Copying binary files into .app directory...'.yellow);
copyBinaryFiles(platform, arch);
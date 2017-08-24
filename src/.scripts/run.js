////////////////////////////////////////////////////////////////////////////////
// Run ElectronMeteor App in development mode
////////////////////////////////////////////////////////////////////////////////

/* eslint-env shelljs */
/* eslint no-sync: 0 */
/* eslint no-console: 0 */

'use strict';

require('shelljs/global');
require('colors');

const spawn = require('child_process').spawn;
const path = require('path');

// Make sure we don't try to run in production
process.env.NODE_ENV = 'development';

// -- Set up some paths --------------------------------------------------------

const dir = __dirname;
const base = path.normalize(path.join(dir, '..'));

// -- Determine the platform and arch running ----------------------------------

const platform = process.platform;
const arch = process.arch;
const onWindows = platform === 'win32';
let meteorStarted = false;

console.log('Detected platform: '.bold.white, platform);
console.log('Detected architecture: '.bold.white, arch);

cd(base);

// -- Starting Meteor ----------------------------------------------------------

console.log('-----> Starting Meteor...'.yellow);

const meteorCommand = (onWindows === true) ? 'meteor.bat' : 'meteor';
const meteor = spawn(meteorCommand);
let electron;

// -- Output Meteor and Electron messages to the console -----------------------

meteor.stdout.setEncoding('utf8');
meteor.stdout.on('data', function (data) {
  console.log(data);
  if (data.indexOf('Meteor app started.') !== -1) {
    if (!meteorStarted) {
      startElectron();
      meteorStarted = true;
    }
  }
});

meteor.stderr.setEncoding('utf8');
meteor.stderr.on('data', function (data) {
  console.log('stderr: ', data);
});

meteor.stdout.on('close', function () {
  killElectron();
});

// -- Starting Electron --------------------------------------------------------

function startElectron() {
  console.log('-----> Starting Electron...'.yellow);

  let electronPath = path.join(base, 'node_modules', '.bin', 'electron');

  electron = exec(electronPath + ' ' + base, { async: true });

  electron.stdout.setEncoding('utf8');
  electron.stdout.on('data', function (data) {
    if (!data === 'Cleaning up children.') {
      console.log(data);
    }
  });

  electron.stdout.on('close', function () {
    killMeteor();
  });
}


// -- Clean up -----------------------------------------------------------------

function killMeteor() {
  if (onWindows) {
    spawn('taskkill', [ '/pid', meteor.pid, '/f', '/t' ]);
  } else {
    meteor.kill('SIGINT');
  }
}

function killElectron() {
  if (onWindows) {
    spawn('taskkill', [ '/pid', electron.pid, '/f', '/t' ]);
  } else {
    electron.kill('SIGINT');
  }
}

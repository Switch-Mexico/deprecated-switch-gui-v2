## Requirements: 

- Node (https://nodejs.org/en/download/)
- Meteor (https://www.meteor.com/install)
- Yarn (https://yarnpkg.com/en/docs/install)

## Install app and run in dev mode

Install dependencies:
``` bash
$ meteor npm i -g yarn
$ yarn install
$ yarn run config
```

Run the App in dev mode:
``` bash
$ yarn run dev
```

## Build and pack the App
To build for Linux platform do:
``` bash
$ yarn run build:linux:x64 # others: linux:x64, linux:x86
```
To build for Win platform do:
``` bash
$ yarn run build:win:x64 # others: win:x64, win:x86
```
To build for OS X platform do:
``` bash
$ yarn run build:osx
```

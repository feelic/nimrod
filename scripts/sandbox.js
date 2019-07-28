/* eslint-disable no-process-env */
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const nodemon = require('nodemon');

nodemon('--exec babel-node sandbox');

nodemon
  .on('start', () => {
    //console.log('Esme sandbox start');
  })
  .on('quit', err => {
    if (err) {
      throw err;
    }

    console.log('esme-scripts exiting sandbox');
  })
  .on('restart', files => {
    console.log('esme-scripts restarting sandbox due to change in file(s) : ', files);
  });

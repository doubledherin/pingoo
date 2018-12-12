'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ host: 'localhost', port: 4000 });

server.register([
  { register: require('vision') },
  { register: require('./plugins/database'),
    options: {
      dbName: 'pingoo',
      dbTable: 'pings'
    }
  },
  { register: require('./plugins/portal') },
  { register: require('./plugins/receive') }
], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        helpersPath: 'templates/helpers',
        partialsPath: 'templates/partials',
        path: 'templates',
        layout: true,
        isCached: false
    });
});

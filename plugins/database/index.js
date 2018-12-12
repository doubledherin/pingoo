const R = require('rethinkdb')

exports.register = function (server, options, next) {

  R.connect({ db: 'pingoo' }, (err, conn) => {

      if (err) {
          throw err;
      }

      server.app.db = conn;

      server.start((err) => {

          if (err) {
              throw err;
          }
          console.log('Server started at: ' + server.info.uri);
      });
  });

  server.method({
      name: 'database.getRecent',
      method: function (callback) {

          R
          .table('pings')
          .orderBy(R.desc('timestamp'))
          .run(server.app.db, (err, cursor) => {

              if (err) {
                  throw err;
              }

              cursor.toArray(callback);
          });
      }
  });

  server.method({
      name: 'database.getFlight',
      method: function (code, callback) {

          R
          .table('pings')
          .filter({ code: code })
          .orderBy(R.desc('timestamp'))
          .run(server.app.db, (err, cursor) => {

              if (err) {
                  throw err;
              }

              cursor.toArray(callback);
          });
      }
  });

  server.method({
      name: 'database.addPing',
      method: function (payload, callback) {

          R
          .table('pings')
          .insert(payload)
          .run(server.app.db, (err) => {

              if (err) {
                  throw err;
              }

              callback();
          });
      }
  });
};

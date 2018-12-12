exports.register = function (server, options, next) {

  server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {

          server.methods.database.getRecent((err, pings) => {

              if (err) {
                  throw err;
              }

              reply.view('home', {
                  pings: pings
              });
          });
      }
  });

  server.route({
      method: 'GET',
      path: '/flight/{code}',
      handler: function (request, reply) {

          const code = request.params.code;

          server.methods.database.getFlight(code, (err, pings) => {

              if (err) {
                  throw err;
              }

              reply.view('flight', {
                  pings: pings,
                  code: code
              });
          });
      }
  });
};

exports.register.attributes = {
    pkg: require('./package')
};

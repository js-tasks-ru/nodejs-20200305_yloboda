const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':

      fs.unlink(filepath, (error) => {
        if (!error) {
          res.writeHead(200);
          res.end('Deleted');
        };
        if (error) {
          console.log(error);
          if (error.code == 'ENOENT' && pathname.indexOf('/') < 0) {
            res.writeHead(404);
            res.end('Not found');
          } else {
            res.writeHead(400);
            res.end('Bad request');
          }
        }
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;

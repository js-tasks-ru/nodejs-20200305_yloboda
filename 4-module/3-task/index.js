const server = require('./server');

server.listen(3001, 'localhost', () => {
  console.log('Server is listening on http://localhost:3000');
});

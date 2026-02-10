const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello Node!\n');
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);

  // Self-test request
  http.get(`http://localhost:${port}`, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (data.includes('Hello Node')) {
        console.log('CI test passed');
        server.close(() => process.exit(0));
      } else {
        console.error('CI test failed');
        server.close(() => process.exit(1));
      }
    });
  }).on('error', (err) => {
    console.error('Request failed:', err.message);
    server.close(() => process.exit(1));
  });
});

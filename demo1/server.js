const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  const hello_response = `<h1>Hello from ${os.hostname}</h1>`;

  res.end(hello_response);
});

server.listen(3000, () => {
  console.log("Started server on port 3000");
});

const express = require("express");
const os = require("os");

const app = express();

app.get("/",(req,res)=> {
  const hello_response = `<h1>Hello from ${os.hostname}</h1>`;

  res.send(hello_response);
})

const server = app.listen(3000, () => {
  console.log("Started server on port 3000");
});

process.on('SIGINT', () => {
  console.log("Received SIGINT, closing server");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

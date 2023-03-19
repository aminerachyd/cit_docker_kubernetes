const express = require("express");
const os = require("os");

const app = express();

app.get("/",(req,res)=> {
  const hello_response = `<h1>Hello from ${os.hostname}</h1>`;

  res.send(hello_response);
})

app.listen(3000, () => {
  console.log("Started server on port 3000");
});

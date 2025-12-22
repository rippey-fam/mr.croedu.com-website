const server = require("http"); // Import the built-in HTTP module
const fs = require("fs");

const port = 3000; // Port to listen on

// Create an HTTP server
const app = server.createServer();

app.on("request", (req, res) => {
  // const myPage = fs.createReadStream("./testing.html");
  // myPage.pipe(res);
  let obj = "no data";
  fs.readFile("./data.json", "utf8", function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    let list = "<ul>";
    for (let i = 0; i < obj.users.length; i++) {
      list += `<li> ${obj.users[i].name} -- ${obj.users[i].email} -- ${obj.users[i].role}</li>`;
    }
    list += "</ul>";
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page</title>
</head>
<body>
    ${list}
</body>
</html>
  `);
  });
});

app.listen(port);

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User Connected: ${id}`);
    socket.on("chat message", ({ nickname, msg }) => {
      io.emit("chat message", { nickname, msg });
    });
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
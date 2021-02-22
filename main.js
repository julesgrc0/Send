const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require('path');
const __appdir = path.resolve(__dirname,"Send");

let userList = [];
let GlobalId = 0;

setInterval(() => {
  io.emit("ping:ms", new Date().getMilliseconds());
}, 10000);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    userList = userList.filter((user) => user.client != socket);
    let users = [];
    userList.map((user) => {
      users.push(user.user);
    });
    io.emit("user:out", users);
  });

  socket.on("user:in", (res) => {
    GlobalId++;
    let user = {
      username: res.username,
      color: res.color,
      image: res.image,
      id: GlobalId,
    };
    let data = {
      user: user,
      id: GlobalId,
      client: socket,
    };

    userList.push(data);

    let users = [];
    userList.map((user) => {
      users.push(user.user);
    });
    socket.emit("user:info", user.id);
    io.emit("user:out", users);
  });

  socket.on("msg:in", (msg) => {
    io.emit("msg:out", msg);
  });
});

// app.get('*.*', express.static(__appdir, {maxAge: '1y'}));

// app.all('*', (req, res) => {
//     res.status(200).sendFile(`/`, {root:__appdir});
// });

http.listen(process.env.PORT || 3000, ()=>{});

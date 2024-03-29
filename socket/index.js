const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});
console.log("socket up and running");
let activeUsers = [];

io.on("connection", (socket) => {
  // add new user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("A user joined");
    console.log("Number of connected users", activeUsers.length);
    console.log("connected user details", activeUsers);

    io.emit("get-users", activeUsers);
  });

  // send message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to : ", receiverId);
    console.log("Data", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  // like notification
  socket.on("send-notifications", (data) => {
    let { postOwnerId, ...notification } = data;
    const receiver = activeUsers.find((user) => user.userId === postOwnerId);
    if (receiver) {
      io.to(receiver.socketId).emit("receive-notification", notification);
      console.log("notification", notification);
    }
  });
  // comment notification

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("A user left");
    console.log("Number of users connected", activeUsers.length);
    console.log("connected user details", activeUsers);
    io.emit("get-users", activeUsers);
  });
});

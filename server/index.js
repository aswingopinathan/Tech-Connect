const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

const morgan = require("morgan");

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(":method:status:url"));

//routing
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

//error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

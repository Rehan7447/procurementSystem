const express = require("express");
const connectDB = require("./config/connectDB.js");
const userRouter = require("./routes/userRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const merchRouter = require("./routes/merchRoutes.js");
const dotenv = require("dotenv");
const app = express();
const path = require("path");

dotenv.config();
connectDB();

app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/merch", merchRouter);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 8080, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);

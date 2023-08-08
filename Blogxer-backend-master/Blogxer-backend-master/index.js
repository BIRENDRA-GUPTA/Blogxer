const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/blog", require("./routes/Blog"));
app.use("/api/auth", require("./routes/User"));



app.listen(PORT, () => {
  console.log(`server started at PORT : ${PORT}`);
});

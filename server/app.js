const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const db = require("./app/models");
db.mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

require("./app/routes/user.route")(app);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server run port ${process.env.PORT}`);
});

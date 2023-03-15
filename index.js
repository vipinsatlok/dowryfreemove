require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server start at port ", port);
});

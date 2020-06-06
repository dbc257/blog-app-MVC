const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const indexRoutes = require("./routes/index");
app.use(express.urlencoded());
// tell express to use mustache templating engine
app.engine("mustache", mustacheExpress());
// the pages are located in views directory
app.set("views", "./views");
// extension will be .mustache
app.set("view engine", "mustache");

app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("Server is up and running...");
});

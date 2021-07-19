const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// set default port value
const port = process.env.PORT || 5000;
// assign exact path to variable for ease of use if needed several times
const publicDir = path.resolve("./client/public");
const restaurantDir = path.resolve("./api");
// set static
app.use(express.static("client/public"));
// used to fetch requested single restaurant information
app.get("/api/:restaurantId", (req, res) => {
  // get full path for json file using path.join and restaurantId param
  let filePath = path.join(restaurantDir, req.params.restaurantId + ".json");
  // send json to frontend for use 
  res.sendFile(filePath);
});
//  used to fetch the whole list of json restaurants
app.get("/api", (req, res) => {
  // get all restaurant info and save in variable
  let rests = allRestaurants();
  // stringify object to make sure it's a json string
  let data = JSON.stringify(rests);
  // set content type of json
  res.type("text/json").send(data);
});
// catchall route to send home page
app.get("*", (req, res) => {
  res.sendFile(publicDir + "/index.html");
});
// function for gathering all restaurant files for api
function allRestaurants() {
  return fs
    // read all files in api directory
    .readdirSync(restaurantDir)
    // filter returned array to make sure files ends with json
    .filter((file) => file.endsWith(".json"))
    // map over filtered array and parse each file to json
    .map((file) => JSON.parse(fs.readFileSync(path.join(restaurantDir, file))));
}
// open up listening port
app.listen(port, () => {
  console.log("short kings represent");
});

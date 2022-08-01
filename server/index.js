const express = require("express");
const cors = require("cors"); //Cross Origin Resource Sharing

// https://www.bezkoder.com/node-js-rest-api-express-mysql/

const app = express();

var mysql = require('mysql');
// For using mysql in terminal use command `sudo service mysql start`

var corsOptions = {
  origin: ["https://mini-project-ywkjy.run-ap-south1.goorm.io","http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/movie.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
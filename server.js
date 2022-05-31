const express  = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./models/index");
require('dotenv').config({
  path: './.env'
})

const MONGODBURL = process.env.MONGODBURL;
const Role = db.role;

// connection params
const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

// Connect to the MongoDB cluster
try {
     mongoose.connect(
      MONGODBURL,
      connectionParams,
      () => console.log(" Connected to DB")
    );
  } 
catch (e) {
    console.log("could not connect to DB");
  }

// add roles to the database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });

    }
  });

}

initial();

app = express();

app.get("/", (req, res) => {
    res.json({msg: "Hello world"});
})

// setup the CORS
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// set a port to run server on
const PORT = process.env.PORT || 8000;
// listen for incoming connections on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


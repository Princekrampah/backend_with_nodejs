const express  = require("express");
const cors = require("cors");
require('dotenv').config({
  path: './.env'
})


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
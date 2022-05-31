const mongoose = require('mongoose');
const user = require("./users");


mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./roles");

db.ROLES = ["user", "admin"];

module.exports = db;
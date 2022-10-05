"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cookie_parser_1 = require("cookie-parser");
require('dotenv').config();
var uri = process.env.MONGODB_URI;
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(uri)
    .then(function () {
    console.log('connected to Mongoose');
})
    .catch(function (err) {
    console.log('Failed to connect to Mongoose:');
    console.log(err.message);
});
// app.post('/show-user'), async (req, res) => {
// }
var userRoutes_1 = require("../routes/userRoutes");
app.use('/users', userRoutes_1.default);
var taskRoutes_1 = require("../routes/taskRoutes");
app.use('/tasks', taskRoutes_1.default);
app.listen(port, function () {
    return console.log("Server is listening at http://localhost:".concat(port));
});

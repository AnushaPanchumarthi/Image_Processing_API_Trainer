"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//code for Main API route
var express_1 = __importDefault(require("express"));
var indexRoute_1 = __importDefault(require("./routes/indexRoute"));
var app = (0, express_1.default)();
var port = 3000;
//stratin point for the route api
app.use('/api', indexRoute_1.default);
app.get('/', function (req, res) {
    res.send('Image Processor API');
});
//start the express server
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
exports.default = app;

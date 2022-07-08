"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageLoader_1 = __importDefault(require("./api/imageLoader"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('sending main api route');
});
routes.use('/images', imageLoader_1.default);
console.log('Serving the route Images');
exports.default = routes;

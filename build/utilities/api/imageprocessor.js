"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var imageprocessor = express_1.default.Router();
var filePath = path_1.default.join(__dirname, '../../../assetts/full/');
var thumbFilePath = path_1.default.join(__dirname, '../../../assetts/thumb/');
//Basic testing of API route
imageprocessor.get('/', function (req, res) {
    var fileName = req.query.filename;
    console.log('Image Processing in Progess');
    console.log(fs_1.default.readdirSync(filePath).toString().includes(fileName));
    console.log(filePath + fileName + ".jpeg");
    res.sendFile(filePath + fileName + ".jpeg");
});
//Step 1 process the folder and show the thumb nail on the frontend
exports.default = imageprocessor;

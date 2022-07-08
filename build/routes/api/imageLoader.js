"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var imageProcessor_1 = __importDefault(require("../../utilities/imageProcessor"));
var fs_2 = __importDefault(require("fs"));
var imageLoader = express_1.default.Router();
var filePath = imageProcessor_1.default.imageFilepaths.filePath;
var thumbFilePath = imageProcessor_1.default.imageFilepaths.thumbFilePath;
imageLoader.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, width, height, fileNames, fileNamesnoExtn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req.query.filename;
                width = req.query.width;
                height = req.query.height;
                return [4 /*yield*/, fs_1.promises.readdir(filePath)];
            case 1:
                fileNames = _a.sent();
                fileNamesnoExtn = fileNames.map(function (file) {
                    return file.replace(/\.[^/.]+$/, '');
                });
                //Run Basic checks on the input
                //format of the input http://localhost:3000/api/images?filename=GoldenWords&width=800&height=800
                if (fileName == null ||
                    fileName == undefined ||
                    fileName.length === 0 ||
                    width == null ||
                    width == undefined ||
                    width.length === 0 ||
                    height == null ||
                    height == undefined ||
                    height.length === 0) { //check for defined input params
                    res.status(403).send('Missing Filename or Width or Height in the URL');
                }
                else if (!(parseInt(width) > 0 && parseInt(height) > 0)) {
                    res.status(401).send('Invalid input for width and height');
                }
                else if (fileNames.length === 0) {
                    //check if file exists in the directory
                    console.log('directory is empty');
                    res.sendStatus(404).end();
                }
                else if (!(fileNames.length > 0 && fileNamesnoExtn.includes(fileName))) {
                    //validate the files without extensions
                    res.sendStatus(404).end();
                }
                else {
                    console.log('Image Processing in Progess');
                    //create the directory for thumbnails if doesn't exist
                    if (!fs_2.default.existsSync(thumbFilePath)) {
                        try {
                            fs_1.promises.mkdir(thumbFilePath);
                        }
                        catch (e) {
                            console.log('Error while creating directory');
                        }
                    }
                    //invoke the imageprocessor to resize the image
                    //replace the image if thumb folder already contains image with same width and height
                    imageProcessor_1.default.imageProcessor(fileName, width, height).then(function () {
                        res.sendFile("".concat(thumbFilePath + fileName + width + height, ".jpeg"));
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = imageLoader;

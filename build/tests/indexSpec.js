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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
var request = (0, supertest_1.default)(index_1.default);
var testFilePath = path_1.default.join(__dirname, '../../assetts/full/');
var testFileName = 'GoldenWords';
var exTnsn = '.jpeg';
var sourcePath = path_1.default.join(__dirname, '../../assetts/');
describe('Test for the primary images endpoint', function () {
    it('gets the processing statement', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the images endpoint with resized images', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api/images?filename=".concat(testFileName, "&width=800&height=800"))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('image resize not to throw any error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var testWidth, testHeight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testWidth = '700';
                    testHeight = '700';
                    return [4 /*yield*/, expectAsync(imageProcessor_1.default.imageProcessor(testFileName, testWidth, testHeight)).toBeResolved()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send the response that given filename is not found in the directory', function () { return __awaiter(void 0, void 0, void 0, function () {
        var inputUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputUrl = '/api/images?filename=Goldenverbs&width=800&height=800';
                    return [4 /*yield*/, request.get(inputUrl)];
                case 1:
                    response = _a.sent();
                    expect(response.status).not.toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test for the error scenarios', function () {
    //remove the files
    beforeAll(function () {
        var procssdFile = path_1.default.join(testFilePath, testFileName + exTnsn);
        console.log('processed file' + procssdFile);
        fs_1.promises
            .unlink(procssdFile)
            .then(function () {
            console.log('File Deleted');
        })
            .catch(function (error) {
            console.log(error);
        });
    });
    it('should send the response that no files found and directory is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename=GoldenWords&width=800&height=800')];
                case 1:
                    response = _a.sent();
                    expect(response.status).not.toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send the response that input URL is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images&&filename=GoldenWordswidth=800height=800')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send the response that input URL is Missing filename', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/images?filename&swidth=800&height=800')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(403);
                    return [2 /*return*/];
            }
        });
    }); });
    //copy the files to full directory
    afterAll(function () {
        var sourceFile = path_1.default.join(sourcePath, testFileName + exTnsn);
        var targetFile = path_1.default.join(testFilePath, testFileName + exTnsn);
        fs_1.promises
            .copyFile(sourceFile, targetFile)
            .then(function () {
            console.log('File Copied');
        })
            .catch(function (error) {
            console.log(error);
        });
    });
});

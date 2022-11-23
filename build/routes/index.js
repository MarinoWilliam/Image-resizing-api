"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var sharp = require('sharp');
var path = require('node:path');
var fs = require('fs');
var getquery = function (req) {
    var _a = req.query, filename = _a.filename, width = _a.width, height = _a.height;
    var stringFilename = filename;
    var widthNumber = parseInt(width);
    var heightNumber = parseInt(height);
    return {
        filename: stringFilename,
        width: widthNumber,
        height: heightNumber,
    };
};
var resize = function (filename, width, height) {
    var finalPath = path.join(__dirname, '/..', "/../thumb/".concat(filename, ".jpg"));
    var resize = sharp(path.join(__dirname, '/..', "/../full/".concat(filename, ".jpg")))
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(path.join(__dirname, '/..', "/../thumb/".concat(filename, ".jpg")));
    return finalPath;
};
router.get('/images', function (req, res) {
    var _a = getquery(req), filename = _a.filename, width = _a.width, height = _a.height;
    var finalPath = resize(filename, width, height);
    var img = fs.readFileSync(finalPath);
    res.writeHead(200);
    res.end(img, 'binary');
});
exports.default = router;

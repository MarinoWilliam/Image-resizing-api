import express, { Request } from 'express';
const router = express.Router();
const sharp = require('sharp');
const path = require('node:path');
var fs = require('fs');

const getquery = (
    req: Request
): { filename: string; width: number; height: number } => {
    const { filename, width, height } = req.query;
    let stringFilename = filename as string;
    let widthNumber = parseInt(width as string);
    let heightNumber = parseInt(height as string);
    return {
        filename: stringFilename,
        width: widthNumber,
        height: heightNumber,
    };
};

const resize = (filename: string, width: number, height: number): string => {
    const finalPath = path.join(__dirname, '/..', `/../thumb/${filename}.jpg`);
    const resize = sharp(
        path.join(__dirname, '/..', `/../full/${filename}.jpg`)
    )
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(path.join(__dirname, '/..', `/../thumb/${filename}.jpg`));
    return finalPath;
};

router.get('/images', (req, res) => {
    const { filename, width, height } = getquery(req);
    const finalPath = resize(filename, width, height);
    var img = fs.readFileSync(finalPath);
    res.writeHead(200);
    res.end(img, 'binary');
});

export default router;

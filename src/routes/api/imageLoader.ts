import express from 'express';
import { promises as fspromises } from 'fs';
import imageProcessor from '../../utilities/imageProcessor';
import fs from 'fs';

const imageLoader = express.Router();
const filePath = imageProcessor.imageFilepaths.filePath;
const thumbFilePath = imageProcessor.imageFilepaths.thumbFilePath;

imageLoader.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    //fetch the params from the url
    const fileName = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const fileNames = await fspromises.readdir(filePath);
    //trim the file extension from the filenames array
    const fileNamesnoExtn = fileNames.map((file: string): string => {
      return file.replace(/\.[^/.]+$/, '');
    });

    //Run Basic checks on the input
    //format of the input http://localhost:3000/api/images?filename=GoldenWords&width=800&height=800
    if (
      fileName == null ||
      fileName == undefined ||
      fileName.length === 0 ||
      width == null ||
      width == undefined ||
      width.length === 0 ||
      height == null ||
      height == undefined ||
      height.length === 0
    ) {
      //check for defined input params
      res.status(403).send('Missing Filename or Width or Height in the URL');
    } else if (!(parseInt(width) > 0 && parseInt(height) > 0)) {
      res.status(401).send('Invalid input for width and height');
    } else if (fileNames.length === 0) {
      //check if file exists in the directory
      console.log('directory is empty');
      res.sendStatus(404).end();
    } else if (!(fileNames.length > 0 && fileNamesnoExtn.includes(fileName))) {
      //validate the files without extensions
      res.sendStatus(404).end();
    } else {
      console.log('Image Processing in Progess');
      //create the directory for thumb if doesn't exist
      if (!fs.existsSync(thumbFilePath)) {
        try {
          fspromises.mkdir(thumbFilePath);
        } catch (e) {
          console.log('Error while creating directory');
        }
      }
      //check if the resized image exists with the same dimensions.
      //if so serve the cached image
      if (
        fs
          .readdirSync(thumbFilePath)
          .toString()
          .includes(`${fileName + width + height}.jpeg`)
      ) {
        console.log('serving the cached image');
        res.sendFile(`${thumbFilePath + fileName + width + height}.jpeg`);
      } else {
        //invoke the imageprocessor to resize the image
        //replace the image if thumb folder already contains image with same width and height
        imageProcessor
          .imageProcessor(fileName, width, height)
          .then(function (): void {
            res.sendFile(`${thumbFilePath + fileName + width + height}.jpeg`);
          });
      }
    }
  }
);
export default imageLoader;

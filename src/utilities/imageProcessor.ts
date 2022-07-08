import path from 'path';
import sharp from 'sharp';

const imageFilepaths = {
  filePath: path.join(__dirname, '../../assetts/full/'),
  thumbFilePath: path.join(__dirname, '../../assetts/thumb/')
};

async function imageProcessor(
  fileName: string,
  width: string,
  height: string
): Promise<void> {
  //call the sharp instance to process and resize the image
  const image = sharp(`${imageFilepaths.filePath + fileName}.jpeg`);
  try {
    await image.metadata().then(async function () {
      return await image
        .rotate()
        .resize(parseInt(width), parseInt(height))
        .webp()
        .toFile(
          `${imageFilepaths.thumbFilePath + fileName + width + height}.jpeg`
        );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  imageProcessor,
  imageFilepaths
};

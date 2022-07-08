import supertest from 'supertest';
import app from '../index';
import { promises as fsPromises } from 'fs';
import path from 'path';
import imageProcessor from '../utilities/imageProcessor';

const request = supertest(app);
const testFilePath = path.join(__dirname, '../../assetts/full/');
const testFileName = 'GoldenWords';
const exTnsn = '.jpeg';
const sourcePath = path.join(__dirname, '../../assetts/');

describe('Test for the primary images endpoint', () => {
  it('gets the processing statement', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('gets the images endpoint with resized images', async () => {
    const response = await request.get(
      `/api/images?filename=${testFileName}&width=800&height=800`
    );
    expect(response.status).toBe(200);
  });

  it('image resize not to throw any error', async () => {
    const testWidth = '700';
    const testHeight = '700';
    await expectAsync(
      imageProcessor.imageProcessor(testFileName, testWidth, testHeight)
    ).toBeResolved();
  });

  it('should send the response that given filename is not found in the directory', async () => {
    const inputUrl = '/api/images?filename=Goldenverbs&width=800&height=800';
    const response = await request.get(inputUrl);
    expect(response.status).not.toEqual(200);
  });
});

describe('Test for the error scenarios', () => {
  //remove the files
  beforeAll(() => {
    const procssdFile = path.join(testFilePath, testFileName + exTnsn);
    console.log('processed file' + procssdFile);
    fsPromises
      .unlink(procssdFile)
      .then(function () {
        console.log('File Deleted');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  it('should send the response that no files found and directory is empty', async () => {
    const response = await request.get(
      '/api/images?filename=GoldenWords&width=800&height=800'
    );
    expect(response.status).not.toEqual(200);
  });
  it('should send the response that input URL is invalid', async () => {
    const response = await request.get(
      '/api/images&&filename=GoldenWordswidth=800height=800'
    );
    expect(response.status).toEqual(404);
  });
  it('should send the response that input URL is Missing filename', async () => {
    const response = await request.get(
      '/api/images?filename&swidth=800&height=800'
    );
    expect(response.status).toEqual(403);
  });
  //copy the files to full directory
  afterAll(() => {
    const sourceFile = path.join(sourcePath, testFileName + exTnsn);
    const targetFile = path.join(testFilePath, testFileName + exTnsn);
    fsPromises
      .copyFile(sourceFile, targetFile)
      .then(function () {
        console.log('File Copied');
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});

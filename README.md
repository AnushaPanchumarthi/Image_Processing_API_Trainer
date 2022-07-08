# Image_Processing_API_Trainer
A simple placeholder API, that allows to place images into the frontend with the size set via URL parameters for rapid prototyping. The API serves properly scaled versions of the images to the front end to reduce page load size. The API  will handle resizing and serving stored images.

# Scripts needed to test the application
npm run test

# Scripts need to build the application
npm run build

# Scripts need to start the application
npm build/.

# Endpoints
server : http:/localhost:3000 
/api : Displays the serving message in the front end
/api/images : Displays the processing message in the front end

For the image to get processed and resize to appropriate height and width, upload the image into Image_Processing_API_Trainer/assetts/full directory.

Access the /api/images endpoint passing approprate values for the filename,width and height
Format of the URL: http://localhost:3000/api/images?filename=GoldenWords&width=800&height=800

Successful processing results the resized image in the Image_Processing_API_Trainer/assetts/thumb directory

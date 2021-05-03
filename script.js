// script.js

const img = new Image(); // used to load image from <input> and draw to canvas


// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {

  // Find and select canvas element and colors it black
  console.log('Image loaded');
  const c = document.getElementById("user-image");
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,c.width,c.height)
  var dim = getDimmensions(c.width,c.height,img.naturalWidth,img.naturalHeight);
  ctx.drawImage(img, dim['startX'],dim['startY'],dim['width'],dim['height']);
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

//Loading Image
const fileInput =  document.getElementById('image-input');
fileInput.onchange = () => {
  const file = fileInput.files[0];
  img.src = URL.createObjectURL(file);
  img.alt = 'fileName'
}

//Loading Top and Bottom Text and Drawing
// alert(document.querySelector('form'));
var form = document.querySelector('form');
form.addEventListener('submit',function(event) {

    //gets the top and bottom text
    alert('submitted');
    event.preventDefault();
    var top = document.getElementById("text-top").value;
    var bottom = document.getElementById("text-bottom").value;
    //draws text on image
    var c = document.getElementById("user-image");
    var ctx = c.getContext('2d');
    ctx.font="50px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText(top,c.width/2,0);
    ctx.fillText(bottom,c.width/2,c.height);
    //enable clear and reset 


});

// const 
// const 




/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}

function logSubmit(event) {
  //gets the top and bottom text
  var top = document.getElementById("text-top").value
  var bottom = document.getElementById("text-bottom").value
  //draws text on image
  var c = document.getElementById("user-image");
  var ctx = c.getContext('2d');
  ctx.textAlign = 'center'
  ctx.strokeText(top,c.width/2,0)
  ctx.strokeText(bottom,c.width/2,c.height)
  //enable clear and reset 

}
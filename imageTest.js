const sharp = require("sharp");
const download = require('image-downloader');

const imagePath = "images/schnell.jpeg";

async function getMetadata(imgPath) {
  try {
    const metadata = await sharp(imgPath).metadata();
    console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

async function resizeImage(imgPath, fw, fh) {
	try {
		let img = await sharp(imgPath);
		let newPath = `${imgPath.split(".")[0]}_resized${imgPath.split(".")[1]}`;
		let metadata = await img.metadata();
		console.log(metadata);
		await img.resize(metadata.width * fw, metadata.height * fh, {
		  fit: "fill"
		})
		.toFile(`${imgPath.split(".")[0]}_resized.${imgPath.split(".")[1]}`);
	} catch (error) {
	  console.log(error);
	}
}

let url = "https://cdn.discordapp.com/attachments/261874496040861707/1041408618525900810/image.png";
let fileEnding = url.split(".")[url.split(".").length-1];

function downloadImage(url, filepath) {
    return download.image({
       url: url,
       dest: filepath 
    }).then(({ filename }) => {
		console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
	  })
	  .catch((err) => console.error(err));
}

downloadImage(url, `../../images/test.${fileEnding}`);
resizeImage("images/test.png", 2, 1);
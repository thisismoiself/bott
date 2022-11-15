const crypto = require('crypto');
const download = require('image-downloader');
const sharp = require("sharp");

const usageString = `Usage:
~stretch [WIDTH_FACTOR] [HEIGHT_FACTOR]
~stretch [FACTOR]`;
const helpString = `${usageString}
Stretch or compress an image by a certain FACTOR (=WIDTH_FACTOR / HEIGHT_FACTOR).`


function addIntoURL(fileURL, ins) {
	let parts = fileURL.split(".");
	let fileEnding = parts[parts.length-1];
	return `${parts[0]}_${ins}.${fileEnding}`;
} 

async function downloadImage(url, filepath) {
    return download.image({
       url: url,
       dest: filepath 
    }).then(({ filename }) => {
		console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
	  })
	  .catch((err) => console.error(err));
}

async function resizeImage(imgPath, newPath, factor) {
	try {
		let img = await sharp(imgPath);
		let metadata = await img.metadata();
		let fw = 1;
		let fh = 1;

		if(factor > 1) {
			fw = factor;
		} else if(factor < 1) {
			fh = 1/factor;
		} else {
			return;
		}
		await img.resize(Math.round(metadata.width * fw), Math.round(metadata.height * fh), {
		  fit: "fill"
		})
		.toFile(newPath);
	} catch (error) {
	  console.log(error);
	}
}

module.exports = {
    name: 'stretch',
    description: "Stretch any image",
	help: helpString,
    execute(message, args) {
		if(args.length >= 1 && args[0] === "help") {
			message.channel.send(helpString);
			return;
		}
		
		let img = message.attachments.first();
		if(!img) {
			message.channel.send('You need to attach an image.');
			return;
		}
		
		let fileEnding = img.proxyURL.split(".")[img.proxyURL.split(".").length-1];
		let newPath = `${crypto.randomBytes(4).toString('hex')}.${fileEnding}`;
		let newTotalPath = `images/${addIntoURL(newPath, "resized")}`;

		if(args.length != 1 && args.length != 2) {
			message.channel.send(usageString);
            return;
		}

		const MAX_ASPECT_RATIO = 20;
		
		let factor = 1.0;

		if(args.length == 1) {
			factor = parseFloat(args[0]);
		} else if(args.length == 2) {
			factor = parseFloat(args[0]) / parseFloat(args[1]);
		}

		if(!(factor >= (1 / MAX_ASPECT_RATIO) && factor <= MAX_ASPECT_RATIO)) {
			message.channel.send(`Factor must be in range [${1 / MAX_ASPECT_RATIO},${MAX_ASPECT_RATIO}].`);
			return;
		}

		downloadImage(img.proxyURL, `../../images/${newPath}`).then(x => {
			resizeImage(`images/${newPath}`, newTotalPath, factor).then(xx => {
				message.channel.send({ files: [{ attachment: newTotalPath }] }).catch(e => {message.channel.send("Failed to process your image :(")});
			}); 	
		});
    }
}
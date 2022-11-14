const crypto = require('crypto');
const download = require('image-downloader');
const sharp = require("sharp");

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

async function resizeImage(imgPath, newPath, fw, fh) {
	try {
		let img = await sharp(imgPath);
		let metadata = await img.metadata();
		//console.log(metadata);
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
    execute(message, args) {
		let img = message.attachments.first();
		if(!img) {
			message.channel.send('You need to attach an image.');
			return;
		}
		
		let fileEnding = img.proxyURL.split(".")[img.proxyURL.split(".").length-1];
		let newPath = `${crypto.randomBytes(4).toString('hex')}.${fileEnding}`;
		let newTotalPath = `images/${addIntoURL(newPath, "resized")}`;

		if(args.length == 1) {
			let f = parseFloat(args[0]);
			if(f > 10) {
				message.channel.send("Factor too high.");
				return;
			}
			//console.log(`Factor: ${f}`);
			downloadImage(img.proxyURL, `../../images/${newPath}`)
			.then(x => {
			resizeImage(`images/${newPath}`, newTotalPath, f, f).then(xx => {
				message.channel.send({ files: [{ attachment: newTotalPath }] });
			});
			
			});
		} else if(args.length == 2) {
			let fw = parseFloat(args[0]);
			let fh = parseFloat(args[1]);
			if(fw > 10 || fh > 10) {
				message.channel.send("Factor too high.");
				return;
			}
			//console.log(`x-Factor: ${fw} | y-Factor: ${fh}`);
			downloadImage(img.proxyURL, `../../images/${newPath}`)
			.then(x => {
			resizeImage(`images/${newPath}`, newTotalPath, fw, fh).then(xx => {
				message.channel.send({ files: [{ attachment: newTotalPath }] });
			})
			});
			
		} else {
            message.channel.send('Usage: \n *~stretch [WIDTH_FACTOR] [HEIGHT_FACTOR] \n~stretch [FACTOR]*');
            return;
        }

		
	
		
    }
}
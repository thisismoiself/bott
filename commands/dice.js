const usageString = `Usage:
~dice (returns number in [1;6])
~dice [MAX] (returns number in [0;MAX])
~dice [MIN] [MAX] (returns number in [MIN;MAX])`;
const helpString = `${usageString}\n Roll the dice for a random number.`

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    name: 'dice',
    description: "Roll the dice and get a number from 1 to 6",
	help: helpString,
    execute(message, args) {
		let number = 1;
		let min = 1;
		let max = 6;
		if(args.length == 0) {
			number = randomInt(1, 6);
		} else if(args.length == 1) {
			max = parseInt(args[0]);
		} else if(args.length >= 2) {
			min = parseInt(args[0]);
			max = parseInt(args[1]);
		}
		if(isNaN(min) || isNaN(max)) {
			message.channel.send("Invalid arguments.");
			return;
		}
		number = randomInt(min, max);
		message.channel.send(`You rolled a ${number}.`);
		if(number == 42 || number == 420 || number == 69) {
			message.channel.send("Nice B)");
		}
    }
}
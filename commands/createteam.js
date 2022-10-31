module.exports = {
    name: 'createteam',
    description: "Create a team on your Discord Server",
    execute(message, args) {
        
        console.log(`Attempting to create team. \n Command: ${message}`);
		console.log(args);
        if(args.length != 1) {
            message.channel.send('Usage: ~createteam [TEAM_NAME]');
            return;
        }
        if(!message.guild.available) {
            return;
        }
        nameString = args[0]; 
        //message.guild.roles.cache.forEach((r, k, m) => {console.log(`${r.name} : ${k}`)});
        if(message.guild.roles.cache.some((r, k, m) => {return r.name === nameString;})) {
            message.channel.send("This role/team already exists. Please choose another name.");
            return;
        } else {
            message.channel.send(`Creating new channel "${nameString}".`);
            let categoryPromise = message.guild.channels.create(nameString, {type: 'category'});
            //let voicePromise = message.guild.channels.create(nameString + '-v', {type: 'voice'});
            //let textPromise = message.guild.channels.create(nameString + '-t', {type: 'text'});
            //let categoryChannel;
            categoryPromise.then((v) => {
                message.guild.channels.create(nameString, {type: 'voice', parent: v.id});
                message.guild.channels.create(nameString, {type: 'text', parent: v.id});
            });
        }
    }
}
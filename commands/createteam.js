module.exports = {
    name: 'createteam',
    description: "Create a team on your Discord Server",
    help: "NOT WORKING",
    execute(message, args) {
        
        return;
        
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
        if(message.guild.roles.cache.some((r, k, m) => {return r.name === nameString;})) {
            message.channel.send("This role/team already exists. Please choose another name.");
            return;
        } else {
            message.channel.send(`Creating new channel "${nameString}".`);
            let categoryPromise = message.guild.channels.create(nameString, {type: 'category'});
            categoryPromise.then((v) => {
                message.guild.channels.create(nameString, {type: 'voice', parent: v.id});
                message.guild.channels.create(nameString, {type: 'text', parent: v.id});
            });
        }
    }
}
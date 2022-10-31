const Discord = require('discord.js');

const fetch = require("fetch")

const client = new Discord.Client();

const prefix = '~';

const fs = require('fs');

const Endb = require('endb');

const separatorString = "-------------------------------";

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(separatorString)
    console.log('>> DDD-Bot Mk.1 is online.');
    console.log(separatorString)
    console.log(`Currently handled servers: (${client.guilds.cache.size})`)
    console.log(separatorString)
    client.guilds.cache.forEach((g, k, m) => {console.log(`${g.name} : ${k}`)})
    console.log(separatorString)
    console.log("Now listening for events...")
    console.log(separatorString)
});

client.on('message', message => {
    
    //Console.log's every incoming chat message
    console.log(`${message.author.username} (${message.author.id}) : "${message.content}" | ${message.channel.name} on ${message.guild.name}`);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //For dev, enables only users with a certain role to use the bot.
    if(!message.member.roles.cache.has('1036698873919459408')) {
        message.channel.send("No permission.");
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    switch(command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'youtube':
        	client.commands.get('youtube').execute(message, args);
            break;
        case 'test':
            client.commands.get('test').execute(message, args);
            break;
        case 'createteam':
            client.commands.get('createteam').execute(message, args);            
            break;
        default:
            console.log(`Received non-existing command: ${message}`);
    }
});

var file_content = fs.readFileSync('./resources/credentials.json');
const token = JSON.parse(file_content).token;

client.login(token).then((val => {console.log("Successful login.");}), err => {console.log("Invalid token.")});


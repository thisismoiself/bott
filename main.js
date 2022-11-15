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

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const botCommand = client.commands.get(command);
    if(!botCommand) {
        console.log(`Invalid command: ${message}`);
        message.channel.send("Invalid command.");
        return;
    }
    if(args.length > 0 && args[0].toLowerCase() == 'help') {
        message.channel
        .send(botCommand.help).then(x => {})
        .catch(e => {
            console.log(`No help for "${botCommand.name}" available.`);
            message.channel.send("No help is coming :( (Not available)");
        });
        return;
    }
    botCommand.execute(message, args);
});

var file_content = fs.readFileSync('./resources/credentials.json');
const token = JSON.parse(file_content).token;

client.login(token).then((val => {console.log("Successful login.");}), err => {console.log("Invalid token or issue with connection.")});


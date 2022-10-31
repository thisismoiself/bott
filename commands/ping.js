module.exports = {
    name: 'ping',
    description: "This is a ping command",
    execute(message, args) {

        message.channel.send("Pong");
        console.log(message.channel.guild.roles.cache);
    }
}
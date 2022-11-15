module.exports = {
    name: 'ping',
    description: "This is a ping command",
    help: 'Ping the bot, maybe it will answer :)',
    execute(message, args) {
        message.channel.send("Pong");
    }
}
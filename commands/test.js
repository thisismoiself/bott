module.exports = {
    name: 'test',
    description: "This is a test command",
    help: "STOP TESTING.",
    execute(message, args) {
        message.channel.send("STOP TESTING.");

    }
}
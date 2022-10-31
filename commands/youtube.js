module.exports = {
    name: 'youtube',
    description: 'Sends a link to the YouTube main page',
    execute(message, args) {
        message.channel.send('https://www.youtube.com/');
    }
}
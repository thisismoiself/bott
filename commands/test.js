module.exports = {
    name: 'test',
    description: "This is a test command",
    execute(message, args) {

        if (message.member.roles.cache.has('786261071299739659')) {
            message.channel.send('You no longer have the "Development" role :slight_smile:');
            message.member.roles.remove('786261071299739659').catch(console.error);
        }
        else {
            message.channel.send('You now have the "Development" role :slight_smile:');
            message.member.roles.add('786261071299739659').catch(console.error);
        }

    }
}
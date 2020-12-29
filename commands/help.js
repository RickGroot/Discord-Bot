module.exports = {
    name: 'help',
    description: 'this command gives basic information about the bot',
    execute(message, args) {
        const Discord = require('discord.js')
        const text = new Discord.MessageEmbed()
            .attachFiles(['./utils/logo.png'])
            .setTitle('Hi, I\'m Foxy!') // puts variables in message (embedded message)
            .setColor('#f58b00')
            .addField('Useful information', 'I really like cats and randomness, and I would like to share that with everyone. You can always ask me to send an interesting fact or memes!', false)
            .addFields({
                name: 'Cool commands',
                value: '//meme\n//cat\n//nature\n//fact\n//catfact',
                inline: true
            },
            {
                name: 'Mod commands',
                value: '//mute (playertag)\n//unmute\n//deaf (playertag)\n//unmute\n//undeaf',
                inline: true
            })
            .setFooter('https://github.com/Rickert41/Discord-Bot', 'https://raw.githubusercontent.com/Rickert41/Discord-Bot/main/utils/logo.png')
            .setTimestamp()
            .setThumbnail('attachment://logo.png');


        message.channel.send(text);
    }
}
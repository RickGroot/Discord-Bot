module.exports = {
    name: 'update',
    description: 'this command gives last update information',
    execute(message, args) {
        const Discord = require('discord.js')
        const text = new Discord.MessageEmbed()
            .attachFiles(['./utils/logo.png'])
            .setTitle('My last updates') // puts variables in message (embedded message)
            .setColor('#f58b00')
            .addField('1.1', 'Update 1.1 is now online and running! This update contains better image content and improved image filtering.', false)
            .addFields({
                name: 'New commands',
                value: '//update',
                inline: true
            },
            {
                name: 'Others',
                value: 'Better API calls',
                inline: true
            })
            .setFooter('Code: https://github.com/rickgroot/Discord-Bot', 'https://raw.githubusercontent.com/rickgroot/Discord-Bot/main/utils/logo.png')
            .setTimestamp()
            .setThumbnail('attachment://logo.png');


        message.channel.send(text);
    }
}
module.exports = {
    name: 'meme',
    description: 'sends a random meme in the chat, useless but cool',
    execute(message, args) {
        const Discord = require('discord.js')
        const got = require('got')

        message.channel.send('Loading perfect meme...');

        const embed = new Discord.MessageEmbed()

        function createPost() {

            const subReddits = [
                'dankmemes',
                'HolUp',
                'blursedimages',
                'Unexpected'
            ];

            const link = subReddits[Math.floor(Math.random() * subReddits.length)];

            got('https://www.reddit.com/r/' + link + '/random/.json').then(response => {
                let content = JSON.parse(response.body); // gets data from random reddit post

                if (!content[0]) { // reloads when there is no content
                    createPost();
                }

                let permalink = content[0].data.children[0].data.permalink; // create message variables
                let postUrl = `https://reddit.com${permalink}`;
                let postImage = content[0].data.children[0].data.url;
                let postTitle = content[0].data.children[0].data.title;
                let postUpvotes = content[0].data.children[0].data.ups;
                let postNumComments = content[0].data.children[0].data.num_comments;
                let isVideo = content[0].data.children[0].data.is_video;
                embed.setTitle(`${postTitle}`); // puts variables in message (embed)
                embed.setURL(`${postUrl}`);
                embed.setImage(postImage);
                embed.setColor('RANDOM');
                embed.setFooter(`👍 ${postUpvotes}    💬 ${postNumComments}`);

                if (postUpvotes < 1000 || isVideo === true) { // reloads if needed
                    createPost();
                } else {
                    message.channel.send(embed); // sends message to chat
                }
            })
        }

        createPost(); // runs function above

    }
}
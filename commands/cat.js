module.exports = {
    name: 'cat',
    description: 'sends a random kitty in the chat, useless but cool',
    execute(message, args) {
        const Discord = require('discord.js')
        const got = require('got')

        message.channel.send('Loading cat, this could take some time...');

        const embed = new Discord.MessageEmbed()

        function createPost() {

            const subReddits = [
                'CatsAreAssholes',
                'tuckedinkitties',
                'MEOW_IRL',
                'cats',
                'kittens',
                'blurrypicturesofcats'
            ];

            const link = subReddits[Math.floor(Math.random() * subReddits.length)];

            got('https://www.reddit.com/r/' + link + '/random/.json').then(response => {
                let content = JSON.parse(response.body); // gets data from random reddit post

                if (!content[0] || !content[0].data || content.is_video || content.media) { // reloads when there is no content
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

                if (content[0].data.children[0].data.url.toLowerCase().includes('v.redd.it') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('gallery') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('youtu') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('comments') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('insta') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('preview') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('www') ||
                    content[0].data.children[0].data.url.toLowerCase().includes('imgur')) { // reloads if needed
                    createPost();
                } else if (postUpvotes < 500) {
                    createPost()
                } else {
                    message.channel.send(embed); // sends message to chat
                }
            })
        }

        createPost(); // runs function above

    }
}
module.exports = {
    name: 'unmute',
    description: 'this is a voice channel unmute command',
    execute(message, args) {

        let voiceChannel = message.member.voice.channel; //gets voice channel of user that sent command

        if (args.length < 1) { //calls appropriate function
            noArgs();
        } else if (args) {
            withArgs();
        }

        function noArgs() { //function for when there are no arguments
            if (!message.member.roles.cache.some(r => r.name === 'Moderator')) { //checks roles
                message.channel.send('You do not have the permissions to do that');

            } else if (!voiceChannel) {
                message.channel.send('You must be in a voice channel!'); //if user is not in a voice channel

            } else {
                message.channel.send(':microphone2::white_check_mark: Microphones are back online!'); //optional text for undeafening command

                for (let member of voiceChannel.members) { //for every voice channel member
                    member[1].voice.setMute(false);         // sets everyone unmuted
                }
            }
        }

        function withArgs() { //function for when there are arguments
            if (args && message.mentions.users.size) {

                if (!message.member.roles.cache.some(r => r.name === 'Moderator')) {    //checks role
                    message.channel.send('You do not have the permissions to do that'); //sends message if role is incorrect
    
                } else if (message.mentions.members.first().voice.serverMute === false) { //checks if mentioned user is already unmuted
                    message.channel.send(args + ' is already unmuted');     //sends message if user is already unmuted

                } else {
                    message.mentions.members.first().voice.setMute(false); //sets mentioned member on mute

                    message.channel.send('Unmuted ' + args + ' :microphone2::white_check_mark:'); //mutes player message
                }
            }
        }
    }
}
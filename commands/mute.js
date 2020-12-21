module.exports = {
    name: 'mute',
    description: 'this is a voice channel mute command',
    execute(message, args) {

        let voiceChannel = message.member.voice.channel; //gets voice channel of user that sent command

        if (args.length < 1) {      //calls appropriate function
            noArgs();
        } else if (args) {
            withArgs();
        }

        function noArgs() {                 //function for when there are no arguments
            if (!message.member.roles.cache.some(r => r.name === 'Moderator')) { //checks roles
                message.channel.send('You do not have the permissions to do that');

            } else if (!voiceChannel) {
                message.channel.send('You must be in a voice channel!'); //if user is not in a voice channel

            } else {
                message.channel.send(':microphone2::no_entry_sign: Everyone is muted! Don\'t leave if you want your voice back :smiling_imp:'); //if user is in a voice channel

                for (let member of voiceChannel.members) { //for every voice channel member
                    member[1].voice.setMute(true);
                }
            }
        }

        function withArgs() {               //function for when there are arguments
            if (!message.member.roles.cache.some(r => r.name === 'Moderator')) {    //checks role
                message.channel.send('You do not have the permissions to do that'); //sends message if role is incorrect

            } else if (args && message.mentions.users.size) {

                if (message.mentions.members.first().voice.serverMute === true) { //checks if mentioned user is already muted
                    message.channel.send(args + ' is already muted');     //sends message if user is already muted

                } else {
                    message.mentions.members.first().voice.setMute(true); //sets mentioned member muted

                    message.channel.send('Muted ' + args + ' :microphone2::no_entry_sign:'); //muted player message
                }
            }
        }
    }
}
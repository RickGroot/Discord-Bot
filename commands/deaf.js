module.exports = {
    name: 'deaf',
    description: 'this is a voice channel deafen command',
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
                message.channel.send(':ear::no_entry_sign: Everyone is deafened! Don\'t leave if you want your hearing back :smiling_imp:'); //if user is in a voice channel

                for (let member of voiceChannel.members) { //for every voice channel member
                    member[1].voice.setDeaf(true);
                }
            }
        }

        function withArgs() {               //function for when there are arguments
            if (args && message.mentions.users.size) {

                if (!message.member.roles.cache.some(r => r.name === 'Moderator')) {    //checks role
                    message.channel.send('You do not have the permissions to do that'); //sends message if role is incorrect
    
                } else if (message.mentions.members.first().voice.serverDeaf === true) { //checks if mentioned user is already deafened
                    message.channel.send(args + ' is already deafened');     //sends message if user is already deafened

                } else {
                    message.mentions.members.first().voice.setDeaf(true); //sets mentioned member deafened

                    message.channel.send('Deafened ' + args + ' :ear::no_entry_sign:'); //deafened player message
                }
            }
        }
    }
}
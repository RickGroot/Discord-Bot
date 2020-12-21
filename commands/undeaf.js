module.exports = {
    name: 'undeaf',
    description: 'this is a voice channel undeafen command',
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
                message.channel.send(':ear::white_check_mark: Headphones are turned on again!');         //optional text for undeafening command

                for (let member of voiceChannel.members) { //for every voice channel member
                    member[1].voice.setDeaf(false);
                }
            }
        }

        function withArgs() {               //function for when there are arguments
            if (args && message.mentions.users.size) {

                if (!message.member.roles.cache.some(r => r.name === 'Moderator')) {    //checks role
                    message.channel.send('You do not have the permissions to do that'); //sends message if role is incorrect
    
                } else if (message.mentions.members.first().voice.serverDeaf === false) { //checks if mentioned user is already undeafened
                    message.channel.send(args + ' is already undeafened');     //sends message if user is already undeafened

                } else {
                    message.mentions.members.first().voice.setDeaf(false); //sets mentioned member undeafened

                    message.channel.send('Undeafened ' + args + ' :ear::white_check_mark:'); //undeafened player message
                }
            }
        }
    }
}
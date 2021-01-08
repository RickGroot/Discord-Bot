/* Field options
1 2 3
4 5 6
7 8 9
*/
module.exports = {
    name: 'rps',
    description: 'this is a rock paper scissors command',
    execute(message, args) {
        const Discord = require('discord.js');
        const fs = require("fs");
        let data = JSON.parse(fs.readFileSync("./commands/data/ttt.json", "utf8"));

        if (!args.length) { //calls appropriate function
            explainttt();
        } else if (args) {
            ttt(args);
        }

        function explainttt() 
        {

        }

        function ttt(args) 
        {
            if (!data[message.author.id])
            {
                firstplay();
            }
            let userdata = data[message.author.id];
            var move = args[0];
            if (move > 0 && move < 4) {
                var row = 0;
            }else if (move > 3 && move < 7){
                var row = 1;
            }else if (move > 6 && move < 10){
                var row = 2;
            }else {
                explainttt();
            }
            move = move % 3;
            if (move == 1){
                userdata.field[row][0] = 'X';
            } else if (move == 2){
                userdata.field[row][1] = 'X';
            } else if (move == 0){
                userdata.field[row][2] = 'X';
            }else {
                explainttt();
            }
            //als 2 speler dan niet dit stuk

        }

        function checkWin(userdata)
        {
            var row = 0;
            /*
                x x x OR o o o
 
                x        o
                  x   OR   o
                    x        o
  
                    x        o
                  x   OR   o 
                x        o    
            */

            
        }

        function firstplay()
        {   
            let user = message.author.tag.toString();
            firstround = false;
            /* 

            TWO PLAYER YET TO BE DEVELOPED

            if (args.length == 2){
                var user2 = args[1];
            }
            */
            data[message.author.id] = { //checks if user is in datasheet
                name: user,
                ttt_win: 0,
                ttt_lost: 0,
                field: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ]
            };
        }

        function userDraw(answer) { //gets called when there is a draw
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Let\'s try again!"), 800);
        }

        function userWin(answer, num_wins) { //gets called when the user wins
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Congrats, you won!"), 800);
            addWin(num_wins);
        }

        function userLost(answer, num_lost) { //gets called when a user loses
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Better luck next time!"), 800);
            addLost(num_lost);
        }

        function addWin(num_wins) { //adds a win to userdata
            let user = message.author.tag.toString();

            if (!score[message.author.id]) score[message.author.id] = { //checks if user is in datasheet
                name: user,
                ttt_win: 0,
                ttt_lost: 0
            };
            let userData = score[message.author.id]; //adds a win
            userData.ttt_win += num_wins;
        }

        function addLost(num_lost) { //adds lost to userdata
            let user = message.author.tag.toString();

            if (!score[message.author.id]) score[message.author.id] = {
                name: user,
                rps_win: 0,
                rps_lost: 0
            };
            let userData = score[message.author.id];
            userData.ttt_lost += num_lost;

        }

        function userScore() { //sends your score to the chat
            let userData = score[message.author.id];

            if (!userData) { //checks if user has data stored
                message.channel.send("Play some games to see your scores!");
            } else {
                sendScore(userData);
            }

            function sendScore(userData) {
                const text = new Discord.MessageEmbed()
                    .setTitle("Your score") //puts variables in message (embedded message)
                    .setColor('#03fcf4')
                    .addField('Won', userData.ttt_win, true)
                    .addField('Lost', userData.ttt_lost, true)
                    .addField('Scores will be reset', 'Every once in a while scores will be reset', false)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL());

                message.channel.send(text); //sends message to chat
            }
        }


        fs.writeFile("./commands/data/rps.json", JSON.stringify(score), (err) => {
            if (err) console.error(err)
        });

    }
}
module.exports = {
    name: 'rps',
    description: 'this is a rock paper scissors command',
    execute(message, args) {

        const Discord = require('discord.js');
        const fs = require("fs");
        let score = JSON.parse(fs.readFileSync("./commands/data/rps.json", "utf8"));

        if (!args.length) { //calls appropriate function
            noArgs();
        } else if (args) {
            withArgs(args);
        }

        function noArgs() { //function for when there are no arguments
            const text = new Discord.MessageEmbed()
                .setTitle('Play rock paper scissors with me!') // puts variables in message (embedded message)
                .setColor('#03fcf4')
                .addField('How to play', '//rps rock \n //rps paper \n //rps scissors', true)
                .addField('Check your score', '//rps score', true)
                .setTimestamp();

            message.channel.send(text); //sends information message to chat
        }

        function withArgs(args) { //function for when there are arguments
            var num_wins = 0;
            var num_lost = 0;
            for (var i = 0; i < args.length; i++){
                let options = ["rock", "paper", "scissors"]; //gets a random answer
                let answer = options[Math.floor(Math.random() * options.length)];
                var win = 0;

                if (args[i] == answer) { //all available options for rock paper scissors
                    win = 0;
                } else if ((args[i] == "rock" && answer == "paper") || (args[i] == "paper" && answer == "scissors") || (args[i] == "scissors" && answer == "rock")) {
                    win = 1;
                    num_lost++;
                } else if ((args[i] == "rock" && answer == "scissors") || (args[i] == "paper" && answer == "rock") || (args[i] == "scissors" && answer == "paper")) {
                    win = 2;
                    num_wins++;
                }  else if (args[i] == "score") {
                    userScore(); //shows score
                } else {
                    noArgs(); //sends game information because argument is invalid
                }
                if (args.length > 1){
                    if ((i + 1) == args.length){
                        userWin(answer, num_wins);
                        userLost(answer, num_lost);
                    }
                } else {
                    switch(win){
                        case 0:
                            userDraw(answer);
                        case 1:
                            userLost(answer, num_lost);
                        case 2:
                            userWin(answer, num_wins);
                    }
                }
            }
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
                rps_win: 0,
                rps_lost: 0
            };
            let userData = score[message.author.id]; //adds a win
            userData.rps_win += num_wins;
        }

        function addLost(num_lost) { //adds lost to userdata
            let user = message.author.tag.toString();

            if (!score[message.author.id]) score[message.author.id] = {
                name: user,
                rps_win: 0,
                rps_lost: 0
            };
            let userData = score[message.author.id];
            userData.rps_lost += num_lost;

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
                    .addField('Won', userData.rps_win, true)
                    .addField('Lost', userData.rps_lost, true)
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
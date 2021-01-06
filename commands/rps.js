module.exports = {
    name: 'rps',
    description: 'this is a rock paper scissors command',
    execute(message, args) {

        const Discord = require('discord.js');
        const fs = require("fs");
        let score = JSON.parse(fs.readFileSync("./commands/data/rps.json", "utf8"));

        if (args.length < 1) { //calls appropriate function
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

            let options = ["rock", "paper", "scissors"]; //gets a random answer
            let answer = options[Math.floor(Math.random() * options.length)];

            if (args == answer) { //all available options for rock paper scissors
                userDraw(answer);
            } else if (args == "rock" && answer == "paper") {
                userLost(answer);
            } else if (args == "rock" && answer == "scissors") {
                userWin(answer);
            } else if (args == "paper" && answer == "scissors") {
                userLost(answer);
            } else if (args == "paper" && answer == "rock") {
                userWin(answer);
            } else if (args == "scissors" && answer == "rock") {
                userLost(answer);
            } else if (args == "scissors" && answer == "paper") {
                userWin(answer);
            } else if (args == "score") {
                userScore(); //shows score
            }
        }

        function userDraw(answer) { //gets called when there is a draw
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Let\'s try again!"), 800);
        }

        function userWin(answer) { //gets called when the user wins
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Congrats, you won!"), 800);
            addWin();
        }

        function userLost(answer) { //gets called when a user loses
            message.channel.send(answer);
            setTimeout(() => message.channel.send("Better luck next time!"), 800);
            addLost();
        }

        function addWin() { //adds a win to userdata
            let user = message.author.tag.toString();

            if (!score[message.author.id]) score[message.author.id] = { //checks if user is in datasheet
                name: user,
                rps_win: 0,
                rps_lost: 0
            };
            let userData = score[message.author.id]; //adds a win
            userData.rps_win++;
        }

        function addLost() { //adds lost to userdata
            let user = message.author.tag.toString();

            if (!score[message.author.id]) score[message.author.id] = {
                name: user,
                rps_win: 0,
                rps_lost: 0
            };
            let userData = score[message.author.id];
            userData.rps_lost++;

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
                    .addField('Still in developent', 'This functionality is still in development phase', false)
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
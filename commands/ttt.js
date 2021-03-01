/* Field options
1 2 3
4 5 6
7 8 9
*/
module.exports = {
    name: 'ttt',
    description: 'this is a ttt command',
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
            const text = new Discord.MessageEmbed() //puts variables in message (embedded message)
            .setColor('#03fcf4')
            .addField('Tic Tac Toe', '| 1 | 2 | 3 |\n━━━━\n| 4 | 5 | 6 |\n━━━━\n| 7 | 8 | 9 |', false)
            .addField('How to play', 'Choose a field with "//ttt 1-9", where 1-9 are places in the field like \n shown above. \n Example: //ttt 1', false)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL());

            message.channel.send(text); //sends message to chat
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
            }else if(move == "score"){
                userScore();
                return;
            }else {
                explainttt();
                return;
            }
            move = move % 3;
            if (move == 1 && userdata.field[row][0] == " - "){
                userdata.field[row][0] = 'X';
            } else if (move == 2 && userdata.field[row][1] == " - "){
                userdata.field[row][1] = 'X';
            } else if (move == 0 && userdata.field[row][2] == " - "){
                userdata.field[row][2] = 'X';
            }else {
                explainttt();
                return;
            }
            userdata.turn++;
            checkWin(userdata);
            if (userdata.win == true){
                drawttt(userdata);
                userWin();
                reset(userdata);
                return;
            }
            //als 2 speler dan niet dit stuk
            var validResponse = false 
            while (validResponse == false){
                var botmove =  Math.floor(Math.random() * 10); 
                if (botmove > 0 && botmove < 4) {
                    var row = 0;
                }else if (botmove > 3 && botmove < 7){
                    var row = 1;
                }else if (botmove > 6 && botmove < 10){
                    var row = 2;
                }else {
                    explainttt();
                }
                botmove = botmove % 3;
                if (botmove == 1 && (userdata.field[row][0] == " - ")){
                    userdata.field[row][0] = 'O';
                    validResponse = true;
                } else if (botmove == 2 && (userdata.field[row][1] == " - ")){
                    userdata.field[row][1] = 'O';
                    validResponse = true;
                } else if (botmove == 0 && (userdata.field[row][2] == " - ")){
                    userdata.field[row][2] = 'O';
                    validResponse = true;
                }else if(userdata.turn >= 9){
                    userDraw();
                    drawttt(userdata);
                    reset(userdata);
                    return;
                }
            }
            userdata.turn++;
            checkWin(userdata);
            if (userdata.win == true){
                drawttt(userdata);
                userLost();
                reset(userdata);
                return;
            }
            drawttt(userdata);
        }

        function reset(userdata){
            for (var i = 0; i < 3; i++){
                for (var j = 0; j < 3; j++){
                    userdata.field[i][j] = " ";
                }
            }
            userdata.win = false;
            userdata.turn = 0;
        }

        function checkWin(userdata)
        {
            /*
                x x x OR o o o
 
                x        o
                  x   OR   o
                    x        o
  
                    x        o
                  x   OR   o 
                x        o    
            */
            for(var i = 0; i < 3; i++){
                if((userdata.field[i][0] == "X") && (userdata.field[i][1] == "X") && (userdata.field[i][2] =="X")){
                    userdata.win = true;
                    return;
                }
            }
            for(var i = 0; i < 3; i++){
                if((userdata.field[i][0] == "O") && (userdata.field[i][1] == "O") && (userdata.field[i][2] =="O")){
                    userdata.win = true;
                    return;
                }
            }
            for(var i = 0; i < 3; i++){
                if((userdata.field[0][i] == "O") && (userdata.field[1][i] == "O") && (userdata.field[2][i] =="O")){
                    userdata.win = true;
                    return;
                }
            }
            for(var i = 0; i < 3; i++){
                if((userdata.field[0][i] == "X") && (userdata.field[1][i] == "X") && (userdata.field[2][i] =="X")){
                    userdata.win = true;
                    return;
                }
            }
            if((userdata.field[0][0] == "X") && (userdata.field[1][1] == "X") && (userdata.field[2][2] == "X")){
                userdata.win = true;
            } else if((userdata.field[0][0] == "O") && (userdata.field[1][1] == "O") && (userdata.field[2][2] == "O")) {
                userdata.win = true;
            } else if((userdata.field[0][2] == "X") && (userdata.field[1][1] == "X") && (userdata.field[2][0] == "X")){
                userdata.win = true;
            } else if((userdata.field[0][2] == "O") && (userdata.field[1][1] == "O") && (userdata.field[2][0] == "O")){
                userdata.win = true;
            }else {
                userdata.win = false;
            }     
        }

        function drawttt(userdata)
        {
            var toprint =   userdata.field[0][0] + " | " + userdata.field[0][1] + " | " + userdata.field[0][2] + "\n" +
                            userdata.field[1][0] + " | " + userdata.field[1][1] + " | " + userdata.field[1][2] + "\n" +
                            userdata.field[2][0] + " | " + userdata.field[2][1] + " | " + userdata.field[2][2]
            
            message.channel.send(toprint);
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
                win: false,
                ttt_wins: 0,
                ttt_lost: 0,
                turn: 0,
                field: [
                    [' - ', ' - ', ' - '],
                    [' - ', ' - ', ' - '],
                    [' - ', ' - ', ' - ']
                ]
            };
        }

        function userDraw() { //gets called when there is a draw
            setTimeout(() => message.channel.send("Let\'s try again!"), 800);
        }

        function userWin() { //gets called when the user wins
            setTimeout(() => message.channel.send("Congrats, you won!"), 800);
            addWin();
        }

        function userLost() { //gets called when a user loses
            setTimeout(() => message.channel.send("Better luck next time!"), 800);
            addLost();
        }

        function addWin() { //adds a win to userdata
            let user = message.author.tag.toString();

            if (!data[message.author.id]) data[message.author.id] = { //checks if user is in datasheet
                name: user,
                ttt_wins: 0,
                ttt_lost: 0
            };
            let userData = data[message.author.id]; //adds a win
            userData.ttt_wins++;
        }

        function addLost(num_lost) { //adds lost to userdata
            let user = message.author.tag.toString();

            if (!data[message.author.id]) data[message.author.id] = {
                name: user,
                ttt_wins: 0,
                ttt_lost: 0
            };
            let userData = data[message.author.id];
            userData.ttt_lost++;

        }

        function userScore() { //sends your score to the chat
            let userData = data[message.author.id];

            if (!userData) { //checks if user has data stored
                message.channel.send("Play some games to see your scores!");
            } else {
                sendScore(userData);
            }

            function sendScore(userData) {
                let datarps = JSON.parse(fs.readFileSync("./commands/data/rps.json", "utf8"));
                let userDatarps = datarps[message.author.id]

                const text = new Discord.MessageEmbed()
                    .setTitle("Your scores") //puts variables in message (embedded message)
                    .setColor('#03fcf4')
                    .addField('Tic Tac Toe','Wins: ' + userData.ttt_wins + '\n' + 'Lost: ' +userData.ttt_lost, true)
                    .addField('Rock Paper Scissors','Wins: ' + userDatarps.rps_win + '\n' + 'Lost: ' +userDatarps.rps_lost, true)
                    .addField('Scores will be reset', 'Every once in a while scores will be reset', false)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.author.displayAvatarURL());

                message.channel.send(text); //sends message to chat
            }
        }


        fs.writeFile("./commands/data/ttt.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });

    }
}
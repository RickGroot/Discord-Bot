module.exports = {
    name: 'strat',
    description: 'this gives a random csgo strat',
    execute(message, args) {
        const Discord = require('discord.js');
        const fs = require("fs");
        let rawData = JSON.parse(fs.readFileSync("./commands/data/strat.json", "utf8"));
        const maps = ['mirage', 'cache', 'inferno', 'overpass', 'train', 'nuke', 'dust2'];
        const sides = ['ct', 't'];

        if (args.length < 1) { //calls appropriate function
            noArgs();
        } else if (args.length === 1) {
            oneArg(args[0]);
        } else if (args.length === 2) {
            twoArgs(args);
        } else {
            explainCommand();
        }

        function explainCommand() {
            const map = Math.floor(Math.random() * maps.length);
            const side = Math.floor(Math.random() * sides.length);

            message.channel.send('Something is wrong! Try `//strat <map> <side>`, \n So like this: `//strat ' + maps[map] + ' ' + sides[side] + '`')
        }

        function noArgs() { //function for when there are no arguments
            message.channel.send('no args');
            let data = rawData.reg;
            const random = Math.floor(Math.random() * data.length);

            sendStrat(data[random]);
        }

        function oneArg(arg) {
            if (maps.includes(arg)) {
                message.channel.send('I need a ct or t argument for this!')
            } else if (sides.includes(arg)) {

                let side = arg;

                let data = rawData.reg;
                let sideCalls = data.concat(rawData[side])

                function generate() {
                    const random = Math.floor(Math.random() * sideCalls.length);
                    if (!sideCalls[random] || sideCalls[random].name === undefined) {
                        generate()
                    } else {
                        sendStrat(sideCalls[random], side);
                    }
                }

                generate()

            } else {
                explainCommand();
            }
        }

        function twoArgs(arg) { //function for when there are arguments
            if (maps.includes(arg[0]) && sides.includes(arg[1])) {
                getAllData(arg[0], arg[1])
            } else if (maps.includes(arg[1]) && sides.includes(arg[0])) {
                getAllData(arg[1], arg[0])
            } else {
                explainCommand()
            }
        }

        function getAllData(map, side) {
            let data = rawData.reg;
            let allData = data.concat(rawData[map], rawData[side])

            function generate() {
                const random = Math.floor(Math.random() * allData.length);
                if (!allData[random] || allData[random].name === undefined) {
                    generate()
                } else {
                    sendStrat(allData[random], side);
                }
            }

            generate()
        }

        function replaceRandom(desc, team) {
            let pistols;
            let shotguns;
            let lmgs = ["Negev", "M249"];
            let smgs;
            let rifles;
            let site = ["A", "B"];
            let direction = ["right", "left"];
            let special;
            if (team == "ct") {
                pistols = ["USP-S", "Desert Eagle", "Duel Berettas", "Five-SeveN", "P250"];
                shotguns = ["Nova", "XM-1014", "MAG-7"];
                smgs = ["MP9", "MP7", "P90", "PP-Bizon", "UMP-45"];
                rifles = ["FAMAS", "M4A4", "Scout", "AWP", "SCAR-20"];
                special = "One person";
            } else {
                pistols = ["Glock-18", "Desert Eagle", "Duel Berettas", "Tec-9", "P250"];
                shotguns = ["Nova", "XM-1014", "Sawed Off"];
                smgs = ["MAC-10", "MP7", "P90", "PP-Bizon", "UMP-45"];
                rifles = ["Galil AR", "AK-47", "Scout", "AWP", "G3SG1"];
                special = "The bomb carrier";
            }

            desc = desc.replace("@PISTOL", pistols[Math.floor(Math.random() * pistols.length)]);
            desc = desc.replace("@SHOTGUN", shotguns[Math.floor(Math.random() * shotguns.length)]);
            desc = desc.replace("@LMG", lmgs[Math.floor(Math.random() * lmgs.length)]);
            desc = desc.replace("@SMG", smgs[Math.floor(Math.random() * smgs.length)]);
            desc = desc.replace("@RIFLE", rifles[Math.floor(Math.random() * rifles.length)]);
            desc = desc.replace("@SITE", site[Math.floor(Math.random() * site.length)]);
            desc = desc.replace("@SITE", site[Math.floor(Math.random() * site.length)]);
            desc = desc.replace("@DIR", direction[Math.floor(Math.random() * direction.length)]);
            desc = desc.replace("@SPECIAL", special);

            return desc;

        }



        async function sendStrat(strat, team) {

            const text = new Discord.MessageEmbed()
                .setColor('#0dffd7')
                .addField(strat.name, replaceRandom(strat.desc, team), false)

            message.channel.send(text); //sends message to chat
        }
    }
}
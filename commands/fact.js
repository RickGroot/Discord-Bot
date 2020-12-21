module.exports = {
    name: 'fact',
    description: 'with this command you get a random fact',
    execute(message, args) {
        const fetch = require('node-fetch');
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';


        fetch(url)
            .then(res => res.json())
            .then((out) => {
                message.channel.send(out.text);
            })
            .catch(err => {
                throw err
            });

            
    }
}
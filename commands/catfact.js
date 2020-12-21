module.exports = {
    name: 'catfact',
    description: 'with this command you get a random cat fact',
    execute(message, args) {
        const fetch = require('node-fetch');
        const url = 'https://meowfacts.herokuapp.com/';


        fetch(url)
            .then(res => res.json())
            .then((out) => {
                message.channel.send(out.data[0]);
            })
            .catch(err => {
                throw err
            });

            
    }
}
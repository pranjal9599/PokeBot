var Discord = require('discord.io');
var getPokemon = require('./pokeapi.js').getPokemon;

var pokedb = require('./db.js');


var pokeman = {};

var bot = new Discord.Client({
    autorun: true,
    token: "NDE5MDgyODc4NTcyNDI5MzM0.DXrDSA.eJB80J4n5D389a6FWzyVLGuRG2s"
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    //console.log(bot.channels);
    // bot.sendMessage(
    //     {
    //         to: '407133636026957825',
    //         message: 'send vegene'
    //     }
    // )
});

bot.on('message', function(user, userID, channelID, message, event) {

    if (message === "@pokemon") {
        getPokemon().then(pokemon => {
            pokeman = pokemon;
            console.log(pokeman);
            bot.sendMessage({
                to: channelID,
                message: '',
                typing: true,   
                embed: {
                    color: 6826080,
                    image:
                    {
                      url: pokemon.image
                    },
                    title: pokemon.name,
                    // footer: {
                    //     text: `Health: ${pokemon.stats.health} 
                    //     Speed: ${pokemon.stats.speed}
                    //     Attack: ${pokemon.stats.attack}
                    //     Special Attack: ${pokemon.stats.special_attack}`
                    // }            
                    fields: [{
                        name: 'Health',
                        value: pokemon.stats.health
                    },
                    {
                        name: 'Speed',
                        value: pokemon.stats.speed
                    },
                    {
                        name: 'Attack',
                        value: pokemon.stats.attack
                    },
                    {
                        name: 'Special Attack',
                        value: pokemon.stats.special_attack
                    }]
                }
            });
        }
        ); 
    }

    if (message === "@catch") {
        if (typeof pokeman.name !== "undefined") {
            pokedb.savePokemon({name: pokeman.name, userId: userID, img: pokeman.image});
            bot.sendMessage({
                to: channelID,
                message: '',
                typing: true,   
                embed: {
                    color: 6826080,
                    image:
                    {
                      url: ''
                    },
                    title: user + ' caught ' + pokeman.name,           
                }
            });
            pokeman = {};

        } else {
            bot.sendMessage({
                to: channelID,
                message: '',
                typing: true,   
                embed: {
                    color: 6826080,
                    image:
                    {
                      url: ''
                    },
                    title: 'No pokemon to catch',           
                }
            });
        }
    }

    if (message === '@pokedex') {
        pokedb.getPokemons(userID, (pokemons) => {
            let msg = '';
            //console.log(pokemons);
            pokemons.map(pokemon => {
                //console.log(pokemon.stringify());
                console.log(pokemon.name);
                msg += pokemon.name;
                msg += " ";
            });

            bot.sendMessage({
                to: channelID,
                message: msg,
                typing: true,   
                embed: {
                    color: 6826080,
                    image:
                    {
                      url: ''
                    },
                    title: user + ' have ' + pokemons.length + ' pokemons',
                }
            });
        })
    }

    if (message === '@help') {

    }

});
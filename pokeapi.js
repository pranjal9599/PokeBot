const fetch = require('node-fetch');

function getPokemon() {
	var randomnumber = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
	var imgUrl;
	if (randomnumber < 10) {
		imgUrl = `00${randomnumber}`;
	} else if(randomnumber < 100) {
		imgUrl = `0${randomnumber}`;
	}
	else {
		imgUrl = randomnumber;
	}
	//console.log(randomnumber);
	return fetch(`http://pokeapi.co/api/v2/pokemon/${randomnumber}`)
		.then(function(response) {
			return response.json()
		}).then(function(body) {
			let pokemon = {
				name: body.forms[0].name,
				image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgUrl}.png`,
				stats: {}
			}

			let health=0,speed = 0, attack=0, special_attack=0;

			body.stats.map(stat => {
				let {name} = stat.stat;
				if (name == 'special-defense' || name == 'defense' || name == 'hp') {
					health += stat.base_stat
				}
				if (name === 'speed') { 
					pokemon.stats['speed'] = stat.base_stat
				}
				if (name == 'attack') {
					pokemon.stats['attack'] = stat.base_stat;
				}
				if (name == 'special-attack') {
					pokemon.stats['special_attack'] = stat.base_stat;
				}
				console.log(stat);
			})

			pokemon.stats['health'] = health;
			// pokemon.stats['speed'] = speed;
			// pokemon.stats['attack'] = attack;
			// pokemon.stats['special-attack'] = special-attack;
			return pokemon;
		});
}


module.exports = {
	getPokemon: getPokemon
}
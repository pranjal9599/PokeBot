const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./pokeusers.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// let sql = `SELECT * FROM USERS`;

// db.all(sql, [], (err, rows) => {
// 	if (err) {
// 		throw err;
// 	}
// 	rows.forEach((row) => {
// 		console.log(row.score);
// 	})
// })
function savePokemon(pokee) {
	let sql = `INSERT INTO POKEMON values('${pokee.name}', ${pokee.userId}, '${pokee.img}')`;
	db.run(sql);
	//console.log(sql);
}


function getPokemons(userId, callback) {
	var pokemons = [];
	let sql = `SELECT * FROM POKEMON WHERE belongs_to = ${userId}`;

	db.serialize(function() {
		db.all(sql, function(err, allRows){
			if (err) {
				throw err;
			}
			callback(allRows);
		});
	})
}

// savePokemon({name: 'babla', userId: 121212, img: 'htttps://ig.com'});
// getPokemons(2222, function(allRows) {
// 	console.log(allRows);
// });

module.exports = {
	savePokemon: savePokemon,
	getPokemons: getPokemons
};
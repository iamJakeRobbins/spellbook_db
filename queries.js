const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'myspellbook_api',
  password: 'password',
  port: 5432,
})

const getCharacters = (request, response) => {
  pool.query(
		`SELECT name,
		id
		FROM characters
		ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const insertChar = (req, res) => {
	let userId = 44808;
	let data = req.body;
	pool.query(
	`INSERT INTO characters
	(user_id, name, level, class)
	VALUES ($1,$2,$3,$4)`, (error, results) => {
		if(error) {
			console.log('uhoh')
			throw error
		}
		response.status(200);
	})
}

module.exports = {
  getCharacters,
	insertChar,

}

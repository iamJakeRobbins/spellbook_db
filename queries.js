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
	console.log(req.body)
	console.log('hello world')
	let userId = 44808;
	// let name = re
}

module.exports = {
  getCharacters,
	insertChar,

}

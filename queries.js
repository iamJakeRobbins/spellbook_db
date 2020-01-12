const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'myspellbook_api',
  password: 'password',
  port: 5432,
})

const getCharacters = (request, response) => {
  pool.query('SELECT * FROM characters ORDER BY id ASC', (error, results) => {
    if (error) {
			console.log('broked');
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getCharacters,

}

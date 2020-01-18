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
		c.id,
		description
		FROM characters c
		JOIN class_code cc ON cc.id = c.class
		ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getSingleCharacter = (req, res) => {
	// console.log('hello');
	// console.log(req.body);
	pool.query(
		`SELECT c.*,
		 description
		 FROM characters c
		 JOIN class_code cc ON c.class = cc.id
		 WHERE c.id = $1`, [req.body.id], (err, results) => {
			 res.status(200).json(results.rows);
		 }
	)
};

const getClassDetails = (req, res) => {
	pool.query(
		`SELECT * FROM class_code
		ORDER BY description DESC`, (error,results) => {
			res.status(200).json(results.rows)
		})
};

const insertChar = (req, res) => {
	let userId = 44808;
	let data = req.body;

	pool.query(
	`INSERT INTO characters
	(user_id, name, level, class)
	VALUES ($1,$2,$3,$4)`, [44808, data.name, data.level, data.class ], (error, results) => {
		if(error) {
			throw error
		}
		res.status(200).json(`Success! ${data.name} has been created`);
	})
}

module.exports = {
  getCharacters,
	getSingleCharacter,
	getClassDetails,
	insertChar,

}

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'myspellbook_api',
  password: 'password',
  port: 5432,
});

const userId = 44808;

const getCharacters = (request, response) => {
  pool.query(
		`SELECT
		 c.name,
		 c.id,
		 c.level,
		 description,
		 cc.id AS classId,
		 ss.first,
		 ss.second
		 FROM characters c
		 JOIN class_code cc ON c.class = cc.id
		 LEFT JOIN spell_slots ss ON c.id = ss.id
		 ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    data = convertSpellSlotsToObject(results.rows);
    response.status(200).json(results.rows)
  })
};

const getSingleCharacter = (req, res) => {
	pool.query(
		`SELECT
		 c.*,
		 ss.first,
		 ss.second
		 description
		 FROM characters c
		 JOIN class_code cc ON c.class = cc.id
		 JOIN spell_slots ss ON c.id = ss.id
		 WHERE c.id = $1`, [
			 req.body.id
		 ], (err, results) => {
			 res.status(200).json(results.rows);
		 }
	)
};

const getClassDetails = (req, res) => {
	pool.query(
		`SELECT *
		 FROM class_code
		 ORDER BY description ASC`, (error,results) => {
			if (error) {
				throw error;
			}
			res.status(200).json(results.rows);
		})
};

const insertChar = (req, res) => {
	let data = req.body;
	pool.query(
	`INSERT INTO characters
	 (user_id, name, level, class)
	 VALUES ($1,$2,$3,$4)`, [
		44808,
		data.name,
		data.level,
		data.class
	], (error, results) => {
		if(error) {
			throw error;
		}
		res.status(200).json(`Success! ${data.name} has been created`);
	})
};

const updateCharacter = (req, res) => {
	let data = req.body;
	pool.query(
		`UPDATE characters SET
		 name = $3,
		 level = $4,
		 class = $5
		 WHERE user_id = $1
		 AND id = $2`, [
			userId,
			data.id,
			data.name,
			data.level,
			data.class
		], (err, results) => {
			if (err) {
				throw err;
			}
			res.status(200).json(`Success! ${data.name} has been updated`);
		})
};

const deleteCharacter = (req, res) => {
	let id = req.body.id;
	pool.query(
`DELETE
						 FROM characters
						 WHERE id = $1`, [
		 id
	 ], (err, results) => {
		 if (err) {
			 throw err;
		 }
		 res.status(200).json('Character deleted');
	 }
	)
};

// TODO this will have to expand as we add additional available spell levels
const getCharacterSpellSlots = (req, res) => {
	const id = req.body.id;
	pool.query(
`SELECT first,
							second
							FROM spell_slots
							WHERE id = $1`, [
							id,
			], (err, results) => {
	if(err) {
		throw err;
	}
	res.status(200).json(results.rows);
}
	)
};

function convertSpellSlotsToObject(data) {
  data.forEach((e, i) => {
    e.spellSlots = {
      first: e['first'],
      second: e['second'],
    };
    delete e['first'];
    delete e['second'];
  });
  return data;
}


module.exports = {
  getCharacters,
	getSingleCharacter,
	getClassDetails,
	insertChar,
	updateCharacter,
	deleteCharacter,
	getCharacterSpellSlots,
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;
const db = require('./queries');

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
	console.log('hello world')
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/chars', db.getCharacters);

app.post('/submitCharacter', db.insertChar);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;
const db = require('./queries');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/api/chars', db.getCharacters);
app.get('/api/classDetails', db.getClassDetails);

app.post('/api/getSingleCharacter', db.getSingleCharacter);
app.post('/api/submitCharacter', db.insertChar);
app.post('/api/updateCharacter', db.updateCharacter);
app.post('/api/deleteCharacter', db.deleteCharacter);
app.post('/api/charSpellSlots', db.getCharacterSpellSlots);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

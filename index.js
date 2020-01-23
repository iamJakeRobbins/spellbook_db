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

app.get('/chars', db.getCharacters);
app.get('/classDetails', db.getClassDetails);

app.post('/getSingleCharacter', db.getSingleCharacter);
app.post('/submitCharacter', db.insertChar);
app.post('/updateCharacter', db.updateCharacter);
app.post('/deleteCharacter', db.deleteCharacter);
app.post('/charSpellSlots', db.getCharacterSpellSlots);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});

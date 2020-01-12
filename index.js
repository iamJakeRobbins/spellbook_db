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

// app.use(cors({
// 			 origin: "*",
// 			 allowedHeaders: "Content-type",
// 			 methods: "GET,POST,PUT,DELETE,OPTIONS" }));
//
// 	 app.use(function(req, res, next) {
// 			 res.header("Access-Control-Allow-Origin", "*");
// 			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 			 next();
// 	 });



app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/chars', db.getCharacters)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

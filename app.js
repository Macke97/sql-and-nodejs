const express = require('express');
const app = express();

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodemysql',
  port: 3307
});

db.connect();

app.get('/q', (req, res) => {
  const qry = 'SELECT * FROM persons';
  db.query(qry, (err, result, fields) => {
    res.json(result);
  })
})

app.get('/add', (req, res) => {
  const { firstname } = req.query;
  const qry = `INSERT INTO persons (firstname) VALUES ("${firstname}")`;
  db.query(qry, (err, result) => {
    res.json(result)
  });
})

app.get('/addUser', (req, res) => {
  const firstname = req.query.firstname;
  let query = `INSERT INTO persons (firstname) VALUES ("${firstname}")`;
  db.query(query, (err, result) => {
    res.json(result)
  })
})

app.listen(3000, () => console.log('Listening on 3000'))
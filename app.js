const express = require('express');
const app = express();
let db;
const mysql = require('promise-mysql');
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodemysql',
  port: 3307
})
  .then(conn => {
    db = conn;
  })

app.get('/q', async (req, res) => {
  const qry = 'SELECT * FROM persons';
  let result = await db.query(qry);
  console.log(result)
  res.json(result);
})

app.get('/add', (req, res) => {
  const { firstname } = req.query; // Detta
  // const firstname = req.query.firstname; // Eller detta
  if (!firstname) {
    return res.send('WTF')
  }
  const qry = `INSERT INTO persons (firstname) VALUES ("${firstname}")`;
  db.query(qry).then(result => {
    res.json(result)
  })
})

app.get('/addUser', (req, res) => {
  const firstname = req.query.firstname;
  let query = `INSERT INTO persons (firstname) VALUES ("${firstname}")`;
  db.query(query, (err, result) => {
    res.json(result)
  })
})

app.listen(3000, () => console.log('Listening on 3000'))
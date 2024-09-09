const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

//database connectivity
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "form",
  });

db.connect(function(err) {
    if (err) {
        console.log("error in connection");
    } else {
        console.log("connected");
    }
})
app.get('/', (req,res) => {
    return res.json("from backend Hello")
})

app.post("/form", (req, res) => {
    const sql = `INSERT INTO user_info (\`name\`, \`email\`, \`password\`, \`fatherName\`, \`motherName\`, \`birthday\`, \`mobile\`, \`childName\`, \`spouseName\`, \`address\`, \`city\`, \`pin\`, \`country\`, \`aadhar\`, \`job\`, \`salary\`, \`image\`) 
    VALUES (?)`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.fatherName,
        req.body.motherName,
        req.body.birthday,
        req.body.mobile,
        req.body.spouseName,
        req.body.childName,
        req.body.address,
        req.body.city,
        req.body.pin,
        req.body.country,
        req.body.aadhar,
        req.body.job,
        req.body.salary,
        req.body.image,

    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
          return res.status(500).json({ Error: 'Error inserting data into database' });
        }
        res.status(200).send('Data successfully inserted');
      });
});
 



const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})



// `email`, `password`, `name`, `fatherName`, `motherName`, `birthday`, `mobile`,
//          `childName`, `spouseName`, `address`, `city`, `pin`, `country`,
//           `aadhar`, `job`, `salary`, `image`
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
      origin: "http://localhost:4200",
    })
  );

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passer123",
    database: "hackathon"
});
// pour se connecter au niveau de ma base de donnée mysql
connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion : ", err);
        return;
    }
    console.log("Connected to the MySQL server.");
});

app.listen(3200,()=>{
    console.log("Server is running on port 3200");

})


// Créez une route pour ajouter un hackathon
app.post("/api/hackathon", (req, res) => {
    // console.log("pitakh mi");
    const { titre, description, date, partenaire } = req.body;
    const formateddate = new Date(date);

    const query = "INSERT INTO ajouter (titre, description, date, partenaire) VALUES (?, ?, ?, ?)";
    connection.query(query, [titre, description, formateddate.toISOString().slice(0,10), partenaire], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json("Error adding hackathon");
      } else {
        res.status(200).json("Hackathon added successfully");
      }
    });
  });
app.get("/",(req,res)=>{
    res.send("Hello, Welcome to the hackathon app!");
})
// app.post("/api/hackathon",(req,res)=>{
//     console.log(req.body)
//     res.send(req.body)
//     res.status(201).json({message: "Hackathon created successfully"});
// })
app.get("/api/hackathon",(req,res)=>{
    res.status(201).json({message: "Hackathon created successfully"});
})
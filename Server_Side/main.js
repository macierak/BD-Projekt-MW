const mysql = require('mysql')
const express = require('express')
const config = require('./config.json')
const port = process.env.PORT || config.port
const app = express()
const fs = require("fs")
const { callbackify } = require('util')

var con = mysql.createConnection({
    host: "localhost",
    user: config.login,
    password: config.pass,
    database: "baza_projekt"
})



app.get("/deaths/soonest", (request, response) => {
    let query = "select imie, nazwisko, date_format(data_śmierci, '%e-%m-%Y') as data_śmierci  from zmarły where data_śmierci > curdate()-1000 limit 3"
    con.query(query, function(err, results, fields){
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.send(results)      
    }) 
})




app.get("/info", (req, res)=>{
    let query = fs.readFileSync("./sql/Zarobki_firm.sql").toString()

    res = con.query(query)
})

app.listen(port, () => {
    console.log("Server ready on port " + port)
    con.connect(function(err){
        if(err) throw err
        console.log("Connected to database")       
    })   
})



const mysql = require('mysql')
const express = require('express')
const config = require('./config.json')
const port = process.env.PORT || config.port
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cors = require('cors')
const { callbackify } = require('util')

let con = mysql.createConnection({
    host: "db4free.net",
    user:'macierak',
    password: 'DWXasqz1',
    database: 'baza_projekt'
})
app.use(cors())
app.get("login", (req, res) => {})

app.post('/login' , (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let cred = {login:"", pwd : ""}
    cred = { login: req.body.login, pwd: req.body.pwd }
    if(cred.login.includes("--") || cred.pwd.includes("--")){
        console.log("SQL INJECT")
        res.status(404)
        res.send("!SQL Inject!")
        
    }else{
        let query = "select pracownik.id, pracownik.nazwisko, etat.nazwa_etatu, etat.poziom_uprawnien from pracownik left join etat on pracownik.etat = etat.id where login = \"" + cred.login + "\" and haslo = \"" + cred.pwd + "\""
        con.query(query, function(err, result, fields){
            if(result[0]){
                res.send(result[0])
                console.log(result);
            }
            else{
                res.status(404)
                res.send("error")
            }
        })
    }
    
})

app.get("/deaths/soonest", (request, response) => {
    let query = "select imie, nazwisko, date_format(data_śmierci, '%e-%m-%Y') as data_pogrzebu  from zmarły where data_śmierci < curdate()+30  order by data_śmierci desc"
    con.query(query, function(err, results, fields){
        
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.send(results)      
    }) 
})
app.get("/:type", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log(req.params.type)
    let query = ""
    switch(req.params.type){
        case "krypta":
            query = "select nazwa, id from krypta"
            break
        case "umowa":
            query = "select nazwa_firmy, id from umowa"
            break
        case "rodzina":
            query = "select nazwisko, id from rodzina order by nazwisko"
            break
        case "grób":
            query = "select concat_ws(' ',aleja, rząd, pozycja), id  as lokacja from grób order by aleja, rząd, pozycja asc"
            break
        case "pogrzeb":
            query = "select concat_ws(' ', rodzina.nazwisko, CONVERT(data, DATE)), pogrzeb.id from pogrzeb left join rodzina on rodzina.id= pogrzeb.rodzina order by data desc"
            console.log(query);
            break
        case "pracownik":
            query = "select nazwisko, id from pracownik order by nazwisko"
            break
        case "etat":
            query = "select nazwa_etatu, id from etat"
            break
                       
    }
    con.query(query, function(err, result, fields){
        console.log(result)
        res.send(result)
    })
    
})
app.post("/add/:type", (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let insertData = {arg1:request.body.arg1, arg2 : request.body.arg2, arg3:request.body.arg3, arg4:request.body.arg4, arg5:request.body.arg5, arg6:request.body.arg6}
    let query = ""
    switch(request.params.type){
        case "krypta":
            query = "insert into krypta (nazwa) values('"+ insertData.arg1 + "')"
            break
        case "Umowa":
            query = "insert into umowa(nazwa_firmy, marża) values('"+ insertData.arg1 + "', "+ insertData.arg2 + ")"
            break
        case "Rodzina":
            query = "insert into rodzina(nazwisko) values('"+ insertData.arg1 + "')"
            break
        case "Grób":
            query = "insert into grób(data_postawienia, aleja, rząd, pozycja, krypta) values('"+ insertData.arg1 + "', "+ insertData.arg2 + insertData.arg3 + ", "+ insertData.arg4 + ", "+ insertData.arg5 + ")"
            break
        case "Pogrzeb":
            console.log(insertData.arg2);
            query = "insert into pogrzeb(grób, firma, data, rodzina) values("+ insertData.arg1 + ", "+ insertData.arg2 + ", '"+ insertData.arg3 + "', "+ insertData.arg4 + ")"
            break
        case "Pracownik":
            query = "insert into pracownik(nazwisko, etat, placa, login, haslo) values('"+ insertData.arg1 + "', "+ insertData.arg2 +", "+ insertData.arg3 + ", '"+ insertData.arg4 + "', '"+ insertData.arg5 + "')"
            break
        case "Zmarły":
            query =   "insert into zmarły(imie, nazwisko, data_urodzenia, data_śmierci, cytat, grób) values('"+ insertData.arg1 + "', '"+ insertData.arg2 +"', '"+ insertData.arg3 + "', '"+ insertData.arg4 + "', '"+ insertData.arg5 + "', "+ insertData.arg6 +")"             
            break
        case "prac-pogrz":
            query = "insert into pogrzeb_pracownik(ID_POG, ID_PRAC) values("+ insertData.arg1 + ", "+ insertData.arg2 + ")"
    } 
        

    console.log(query);
    
    con.query(query, function(err, result){
        if(!err){
            console.log("INSERT SUCCESFULL");
            response.status(200)
        }else{
            console.log(err)
            response.status(404)
        }
    })
})
app.get("/graves/:type/:param", (request, response) =>{
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let query = ""
    console.log(request.params)
    let parsed = request.params.param.split("+")

    type = request.params.type
    param1 = parsed[0]
    param2 = parsed[1]
    param3 = parsed[2]
    switch(type){
        case 'name':
            query = "select zm.*, grób.* from grób left join zmarły zm on zm.grób = grób.id where zm.imie = \"" + param1 + "\" and zm.nazwisko = \"" + param2 + "\""

            break
        case 'date':
            query = "select zm.*, grób.* from grób left join zmarły zm on zm.grób = grób.id where data_śmierci = \"" + param1 + "\""
            break
        case 'location':
            query = "select zm.*, grób.* from grób left join zmarły zm on zm.grób = grób.id where aleja = \"" + param1 + "\" and rząd = \"" + param2 + "\" and pozycja = \"" + param3 + "\""
            break
    }
    con.query(query, function(err, results, fields){
        console.log(results)
        
        if(results){
            response.send(results)
        }else{
            response.send("Nie znaleziono")
        }    
    }) 
})

app.get("/raportData/:param", (req, res) => {
    let query = ""
    switch(req.params.param){
        case "zarobki":
            query = "select umowa.nazwa_firmy as 'Firma pogrzebowa', sum(umowa.marża) as 'Zarobki z 2 lat' from pogrzeb left join umowa on pogrzeb.firma = umowa.id where pogrzeb.id in (select id from pogrzeb where data > date_sub(curdate(), interval 2 year)) group by umowa.nazwa_firmy" 
            break
        case "pogrzeby":
            query = "select year(data) as 'Rok', count(*) as 'Ilość pogrzebów' from pogrzeb group by year(data) order by year(data) desc"
            break
        case "najlepsi":
            query = "select p.nazwisko, count(*) from pogrzeb_pracownik left join pracownik p on p.id=pogrzeb_pracownik.ID_PRAC  where p.id in (select p.id from pogrzeb_pracownik pp left join pracownik p on p.id = pp.id_prac left join pogrzeb on pp.ID_POG = pogrzeb.id where pogrzeb.data > date_sub(curdate(), interval 1 year)) group by p.nazwisko order by count(*) desc"
            break
        case "rodziny":
            query = "select r.Nazwisko, count(*) from pogrzeb left join rodzina r on pogrzeb.rodzina = r.ID group by r.nazwisko order by count(*) desc"
            break
        default:  break
    }
    con.query(query, function(err, result, fields){
        console.log(result)
        res.send(result)
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


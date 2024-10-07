const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// proceed form post method data
app.use(express.json())
app.use(express.urlencoded({extended : true} ))

const key = '698535dd1ac0f5b08aaaef7b91f309b2';
let city = 'Tartu'

app.get("/", function(req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((responce)=> {
        return responce.json()
    })
    .then((data) =>{
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('index',{
            description: description,
            city: city,
            temp: temp
        })
    })
})  

app.post('/', function(req, res) {
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((responce) => {
        return responce.json()
    }) 
    .then((data) =>{
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('index',{
            description: description,
            city: city,
            temp: temp
        }) 
    })
})

app.listen(3004)
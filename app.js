const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
let temp = "0";
let desc = "Nothing";
let query = "Nagpur";
let cld = "0";
let hmd = "0";
let wd = "0";
let pr = "0";
let icon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/03d.svg"
            
app.get("/",function(req, res){
    res.render("index.ejs", {temperature: temp, description: desc, city: query, cloudy: cld, humidity: hmd, wind: wd, pressure: pr, iconic: icon});
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "f9e7b3cb4425cbb690c733435cd78b47"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;

    https.get(url, function(response){
        response.on("data", function(data){
            let weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let desc = weatherData.weather[0].main;
            let cld = weatherData.clouds.all;
            let hmd = weatherData.main.humidity;
            let wd = weatherData.wind.speed;
            let pr = weatherData.main.pressure;
            let ic = weatherData.weather[0].icon;
            let icon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/"+ic+".svg"
            
            console.log(query);
            console.log(temp);
            console.log(desc);
            console.log(cld);

            res.render("index.ejs", {temperature: temp, description: desc, city: query, cloudy: cld, humidity: hmd, wind: wd, pressure: pr, iconic: icon});

            // Waiting for ESJ
        })
    })
});




app.listen(3000, function(){
    console.log("Server is running");
});






// apiKey -  e45bb1be6a1146fba9668cc4505d85ca

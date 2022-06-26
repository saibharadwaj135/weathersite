const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
var temperature="";
var weatherDescription="";
var imgUrl="";
var query="";
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
var today= new Date();
var options = {
      weekday:"long",
      day:"numeric",
      month:"long"
};
var day= today.toLocaleDateString("en-US",options);
app.get("/work",function(req,res){
  res.render("result2",{tempe:temperature,desc:weatherDescription,pic:imgUrl,city:query,kindOfDay:day});
});
app.post("/",function(req,res){
     query=req.body.city;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e2a79a788a589421af9a8860859d89d5&units=metric";
    https.get(url,function(response){
        console.log(response);
        response.on("data",function(data){
             const weatherData = JSON.parse(data);
              temperature=weatherData.main.temp;
              weatherDescription = weatherData.weather[0].description;
             const icon = weatherData.weather[0].icon;
             res.set("Content-Type", "text/html");
             imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            //  res.write("temperature is "+temperature);
            //  res.write(weatherDescription);
            //  res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            //  res.send();
            res.redirect("/work");
            
             
        });
    });
});


// app.get("/work",function(req,res){
    
//     res.render("result",{tempe:temperature,desc:weatherDescription});
// });


app.listen(process.env.PORT||3000,function(){
    console.log("server is ready");
});
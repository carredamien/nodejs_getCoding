const path = require("path");
const { engine } = require("express-handlebars");
const express = require('express');
const app = express();
const port = 3000;
const { weather } = require("./utils/weather");
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));



app.get("/weather", (req,res)=> {
  const { location } = req.query;
    // if(!location){
    //   return res.send('Il faut préciser la localisation')
    // }
    // else if(!unit){
    //   return res.send('Il faut préciser l\'unité')
    // }
    // console.log(req.query);

    weather(location, unit = "m", (err, data) => {
        // console.log('Err:', err);
        // console.log('DAta:', data);
        if(err) res.send(`Une erreur s'est produite. ${err}`);
        res.send(data);
    
    });

});
app.get("/about", (req,res)=> {
  res.render('about', { 
    title: 'About'
  });
});
app.get("/", (req,res)=> {
  // const { location, unit } = req.query;
  //   if(!location){
  //     return res.send('Il faut préciser la localisation')
  //   }
  //   else if(!unit){
  //     return res.send('Il faut préciser l\'unité')
  //   }
  //   console.log(req.query);

  //   weather(location, unit, (err, data) => {
  //       console.log('Err:', err);
  //       console.log('DAta:', data);
    
  //   });
  res.render('home', {
    title: 'Home',
    age: 42
  });
});
app.get("/about", (req,res)=> {
  res.render('about', { 
    title: 'About'
  });
});

app.get("*",(req,res, next) => {
  res.status(404).render('404', {
    title: '404'
  })
})

app.listen(port, ()=> {
  console.log(`app listening on port ${port}`);
});


//appel api weather stack
// const parameters = { 
//   access_key: "0f6f6c4d9e9f440de614f05697ee8873",
 
// };


// const weather = (location, unit, callback) => {
//   const url = `http://api.weatherstack.com/current?access_key=${parameters.access_key}&query=${encodeURIComponent(location)}&units=${unit}`
  
//   fetch(url)
//   .then( (res) => res.json())
//   .then(data => {
//     if(data.succes === false) {
//       callback(`impossible de renvoyer vos informations. Error ${data.error.code}: ${data.error.info}`, undefined)
//     }else {
//       const { current, location } = data;
//       callback(undefined, `Le nom de la ville ${location.name}`)
//     }
//   })
  
//   // .catch((error) => {
//   //   console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
//   // });

// }

// weather("nimes","m", (err,data) => {
//   console.log('Erreur:', err);
//   console.log('Data:', data);
// })
// http://api.weatherstack.com/current
  //   ? access_key = YOUR_ACCESS_KEY
  //   & query = New York

  //0f6f6c4d9e9f440de614f05697ee8873
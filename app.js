const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers",(req,res,next) =>{
  punkAPI
  .getBeers()
  .then((response)=>{
   res.render("beers.hbs",{beers:response})
   
  })


  .catch(error => 
    
    console.log(error));




});

app.get("/random-beer", (req,res,next)=>{
  punkAPI
  .getRandom()
  .then((response) => {
    res.render("random-beer.hbs", {response, list: response.food_pairing})
    console.log(response)
  })
  .catch(error => console.log(error));

})


// METODO ASYNC AWAIT
// app.get("/random-beer", async (req,res,next)=>{
//  try{
// const responseFromApi = await punkAPI.getRandom()
// res.render("random-beer.hbs", {randomBeer:responseFromApi})  
//  } catch(error) {
// console.log(error)

//  }
//   })



app.listen(3000, () => console.log('🏃‍ on port 3000'));

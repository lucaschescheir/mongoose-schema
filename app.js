// let shoe = new Shoe({
//   brand: 'Nike',
//   name: 'AirForce',
//   description: 'Brand New'
// });
// shoe.details.push({
//   size: 11,
//   price: 99.99,
//   type: "basketball"
// });
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Shoe= require('./models/shoe')

const app = express();

app.use(express.static('./public'))

app.use(bodyparser.urlencoded({
  extended: false
}));


app.engine('mustache', mustacheExpress());

app.set('views', './public')

app.set('view engine', 'mustache')

// Replace "test" with your database name.
app.get('/', function(req, res){
  res.render('shoes')
})
// app.get('/searchShoe', function(req, res){
//   res.render('searchShoe')
// })
// app.get('/searchShoe', function(req, res){
// //get data from mongo
// Shoe.find()
// .then(function (shoes) {
//   res.render('searchResults', {
// });
// });
// });

mongoose.connect('mongodb://localhost:27017/test');

app.post('/', function(req, res){
  const shoe = new Shoe({
    brand: req.body.brand,
    name: req.body.name,
    description: req.body.description,
    pictureUrl: req.body.pictureUrl,
  });
    shoe.details.push({
    size: req.body.size,
    price: req.body.price,
    type: req.body.type
  });

  shoe.save()
  .then(function () {
    res.render('shoes')
    console.log(shoe.toObject())
  })
});

app.post('/searchShoe', function(req, res){
//get data from mongo
Shoe.find({brand: req.body.search })
.then(function (shoes) {
  res.render('shoes', {
    names: shoes,

  })
});
});

app.post('/delete', function(req, res){

  Shoe.deleteOne({ brand: req.body.nameDelete})
  .then(function(shoes){
    res.render('shoes', {
    names: shoes,
  });
});
});

app.post('/change', function(req, res){
  Shoe.updateOne({ brand: req.body.brand },
  {$push: {name: req.body.name }})
  res.render('shoes')
})

// app.get('/searchShoe', function(req, res){
// //get data from mongo
// db.collection('shoe').find().toArray().then(function (shoes) {
//   res.render('searchResults', {
//     names: shoes,
//   })
// });
// });


app.listen(3000);

console.log("server is listening!!!")

// const recipe = new Recipe({name: "Pancakes", source: "Grandma"});
// recipe.save()
//   .then(function () {
//     // actions to take on success
//   })
//   .catch(function () {
//     // handle error
//  })

//const { ReactComponent } = require('*.svg');
var express = require('express');
var router = express.Router();
var request = require('sync-request');
var MovieModel = require('../models/movies')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var myApiKey = "cb832415c8512f75fc5ff89492cb7b8c";

// récupérer les films via l’API.
router.get('/new-movies', function(req, res, next) {
  var data = request('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${myApiKey}&language=fr-FR&region=FR&append_to_response=images&include_image_language=fr,null&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-01-01`)
  var dataApi = JSON.parse(data.body);
  //console.log(dataApi)
  res.json({result: true, movies: dataApi.results});
})

//Ajout d'un film dans la db
router.post('/wishlist-movie', async function(req, res, next) {

  var newMovie = new MovieModel({
    movieName: req.body.name,
    movieImg: req.body.img,
  
    
  })
  var movieSave = await newMovie.save();

  var result = false;
  if(movieSave.movieName){
    result = true;
  }
  res.json({result});

})

// Suppression d'un film dans la db
router.delete('/wishlist-movie/:name', async function(req, res, next) {
  
  var returnDb = await MovieModel.deleteOne({movieName: req.params.name})

  var result = false;
  if(returnDb.deletedCount == 1) {
    result = true;
  }
  res.json({result});
})

//Obtention de la liste de Films contenu dans la db
router.get('/wishlist-movie', async function(req, res, next){

  var movies = await MovieModel.find()
  
  res.json({movies})
})


module.exports = router;

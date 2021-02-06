import React, {useState, useEffect}  from 'react';
//import Starwars from './img/starwars.jpg';
//import Frozen from './img/frozen.jpg';
//import Jumanji from './img/jumanji.jpg';
//import Maleficent from './img/maleficent.jpg';
//import OnceUpon from './img/once_upon.jpg';
//import Terminator from './img/terminator.jpg';
import generique from './img/generique.jpg';
import logo from './img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


import './App.css';
import { Nav, NavItem, NavLink, Container, Row, Button, Popover, PopoverBody, ListGroup, ListGroupItem, ListGroupItemText, PopoverHeader,  } from 'reactstrap';

import Film from './components/Film';
import Carousel from './components/Carousel';


// Composant principal
const App = (props) => {

  const [moviesCount, setMoviesCount] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  //(10) création d'un états qui permet de réactualiser l'affichage de la wishlist
  const [moviesWishList, setMoviesWishList] = useState([]);
  // (2) création d'un état  qui permet de réactualiser l'affichage du composant principal.
  const [moviesList, setMoviesList] = useState([]);

  const toggle = () => setPopoverOpen(!popoverOpen);
  

useEffect(() => {
  //(1) mise en place de la mécanique permettant d'interroger la route du Backend permettant de recevoir les films récents
    const loadMovies = async () => {
      var rawResponse = await fetch('/new-movies');
      var response = await rawResponse.json();
      // (3)  Utilisation des informations reçues lors de la précédente requête HTTP réalisée vers le Backend pour mettre à jour l’état movieList.
      setMoviesList(response.movies)
      //console.log(response);
      //(9) mécanique permettant de déclencher la route du Backend qui récupère l’ensemble des films de la wishlist en base de données
      const responseWish = await fetch('/wishlist-movie');
        const jsonResponseWish = await responseWish.json();
        //console.log(jsonResponseWish)
        //(11.1) Utilisation des informations reçues lors de la précédente requête HTTP réalisée vers le Backend, pour mettre à jour l’état.
        const wishListFromDB = jsonResponseWish.movies.map((movie,i) => {
          return {name:movie.movieName,img:movie.movieImg}
        })
        //(11.2)
        setMoviesWishList(wishListFromDB)
        setMoviesCount(jsonResponseWish.movies.length)
       
   }
   loadMovies()
   // console.log("App is loaded"); 
  }, []);


  const handleClickAddMovie = async (name, img) => {
   // console.log('click détecté !')
   //console.log(img)
    setMoviesCount(moviesCount+1)
    setMoviesWishList([...moviesWishList, {name: name, img: img}]);
    //(7) mécanique permettant de déclencher la route du Backend permettant d’enregistrer un film en base de données
    const response = await fetch('/wishlist-movie', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `name=${name}&img=${img}`
   });

    
  }
 
  const handleClickDeleteMovie = async (name) => {
    setMoviesCount(moviesCount-1)
    setMoviesWishList(moviesWishList.filter(e => e.name !== name ))
    //(8) mécanique permettant de déclencher la route du Backend qui supprime le film en base de données
    const response = await fetch(`/wishlist-movie/${name}`, {
    method: 'DELETE',
   });
}
// (4) Exploitation de l’état movieList dans le rendu du composant principal pour matérialiser les films
  var filmList = moviesList.map((film,i) => { 
    var result = moviesWishList.find(element => element.name == film.title)
    //console.log(result)
    var isSee = false
    if(result != undefined) {
      isSee = true 
      
    }
    
//console.log(isSee)
//(5) Ajout d'un traitement sur la description du film pour que celui-ci ne dépasse pas 80 caractères
     var result = film.overview
     if(result.length > 80){
     result = result.slice(0,80)+'...'
  }
  //'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
  //console.log(result1)
  //(6) traitement permettant d’afficher une image générique
  var urlImage = generique
    if(film.backdrop_path != null){
    urlImage = 'https://image.tmdb.org/t/p/w500/'+film.backdrop_path
  }

  //console.log(urlImage)
    return(<Film key={i}  movieSee={isSee} handleClickDeleteMovieParent={handleClickDeleteMovie} handleClickAddMovieParent={handleClickAddMovie} movieName={film.title} movieDesc={result} movieImg={urlImage} movieNote={film.popularity} movieNb={film.vote_count} />)
  })

  var cardWish = moviesWishList.map((film, i) => {
    console.log(film.name)
    return (
      <ListGroupItem>
        <ListGroupItemText>
        <img width="25%" src={film.img} /> {film.name} &nbsp;
        <FontAwesomeIcon  onClick={() => {handleClickDeleteMovie(film.name)}}  icon={faTimesCircle} />
        </ListGroupItemText>
      </ListGroupItem>
    )
  })
  //console.log(moviesWishList)

  return (
    <div style={{backgroundColor: "#232528"}}>
    <Container>
            <Row> 
            <div>
      <Container>
              <Row> 
                <Nav>
          <span className="navbar-brand">
            <img src={logo} width="30" height="30" className="d-inline-block align-top"  alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color: 'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <div>
                <Button id="Popover1" type="button">{moviesCount} films</Button>
             <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
             <PopoverHeader>Whishlist</PopoverHeader>
             <PopoverBody>
             <ListGroup>
               {cardWish}
            </ListGroup>
            </PopoverBody>
             </Popover>
             </div>
             </NavLink>
          </NavItem>
         
        </Nav>
        </Row>
      </Container>
      </div>
             
      </Row>
       <div className="carousel">
            <Carousel />
             </div>
            <Row>
            
            {filmList}


            </Row>
    </Container>
    </div>
  );
}

//const Generique = {
 // width: '25%',
//  backgroundImage: 'url(' + generique + ')',
  //};

export default App;

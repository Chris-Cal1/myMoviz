import React, {useState}  from 'react';
//import Starwars from './starwars.jpg';
//import Frozen from './frozen.jpg';
//import Jumanji from './jumanji.jpg';
//import Maleficent from './maleficent.jpg';
//import Once_upon from './lonce_upon.jpg';
//import Terminator from './terminator.jpg';
//import movieImg from './App.js';

import { Badge, ButtonGroup, CardTitle, CardText, Button, Col, Card, CardImg, CardBody, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar, faHeart, faVideo } from '@fortawesome/free-solid-svg-icons';


export default function Film(props){

 // const [likeFilm, setLikeFilm] = useState(false);
  const [watchFilm, setWatchFilm] = useState(false);
  const [countWatchFilm, setCountWatchFilm] = useState(0);
  const [myRatingFilm, setMyRatingFilm] = useState(0);
  const [isRatingFilm, setIsRatingFilm] = useState(false);

  const [rating, setRating] = useState(props.movieNote);
  const [countRating, setCountRating] = useState(props.movieNb);

  var addWatch = () => {
    setWatchFilm(true)
    setCountWatchFilm(countWatchFilm+1)
  }

  var setMyRating = (rating) => {
    if(rating < 0){
        rating = 0
    }
    if(rating > 10){
        rating = 10
    }
    setMyRatingFilm(rating)
    setIsRatingFilm(true)
}


var tabRating = []
for(var i=0;i<10;i++){
    var colorStar = {}
    if(i<myRatingFilm){
        colorStar = {color: '#f1c40f'}
        //console.log(myRatingFilm)
      }  
      let count = i+1
    tabRating.push(<FontAwesomeIcon onClick={() => setMyRating(count)} style={colorStar} icon={faStar} /> )
    
};



var nbTotalNote = rating * countRating
var nbTotalVote = countRating

  if(isRatingFilm){
      nbTotalVote += 1
      nbTotalNote += myRatingFilm
  }
 
  var avgTotal = Math.round(nbTotalNote/nbTotalVote)
  //console.log(avgTotal)


    var tabGlobalRating = []
    for(var i=0; i<10; i++) {
        var color = {};
        if(i<avgTotal) {
            color = {color: '#f1c40f'}
        }
        tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
    }

    if (props.movieSee){
      var colorLike = {color: '#e74c3c', cursor: 'pointer'}
     } else {
        colorLike = {cursor: 'pointer'}
     }
    // console.log(props.movieSee)
   
     if (watchFilm) {
      var colorWatch = {color: '#e74c3c'}
     } else {
       colorWatch = {}
     }

     var changeLiked = (name, img) => {
      
      if(props.movieSee == false){
        props.handleClickAddMovieParent(name, img)
      } else {
        
        props.handleClickDeleteMovieParent(name, img)
      }
    //   setLikeFilm(!likeFilm)
       
    }

    
     


    return (
           
             
               <Col xs="12" lg="6" xl="4">
                 <Card style={{marginBottom: 30, height: "500px"}}>
                  <CardImg top src={props.movieImg} style={{height: "230px"}} alt={props.movieName} />
                  <CardBody>
                    <p>Like <FontAwesomeIcon style={colorLike} onClick={() => changeLiked(props.movieName, props.movieImg)}  icon={faHeart} /></p>
                    <p> Nombre de vues <FontAwesomeIcon style={colorWatch} onClick={() => addWatch()} icon={faVideo} /> <Badge color="secondary" >{countWatchFilm}</Badge></p>
                    <p>
                        {tabRating}
           
              <ButtonGroup size="sm">
                <Button onClick={() => setMyRating(myRatingFilm-1)} color="secondary">-</Button>
                <Button  onClick={() => setMyRating(myRatingFilm+1)} color="secondary">+</Button>
              </ButtonGroup>
            </p>
            <p>Moyenne
                        {tabGlobalRating}
                         ({nbTotalVote})

            </p>
            <CardTitle>{props.movieName}</CardTitle>
            <CardText>{props.movieDesc}</CardText>
          </CardBody>
        </Card>
        </Col>
            
           

         
        
    )
};


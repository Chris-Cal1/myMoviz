
import React, { useState } from 'react';
import Starwars from '../img/starwars.jpg';
import Mal from '../img/maleficent.jpg';
import Frozen from '../img/frozen.jpg';
import '../App.css';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { faAlignCenter, faFileExcel } from '@fortawesome/free-solid-svg-icons';

const items = [
  {
    src: Mal,
    altText: '',
    caption: ''
  },
  {
    src: Frozen,
    altText: '',
    caption: ''
  },
  {
    src: Starwars,
    altText: '',
    caption: ''
  }
];

const Carousels = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="stylePics" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    
                
    <Carousel style={{marginBottom: 20}}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators  items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    
  );
}


export default Carousels;
  
  
//import logo from '../img/logo.png';
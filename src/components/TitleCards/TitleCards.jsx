import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
const TitleCards = ({title, category}) => {
  const cardsRef = useRef(null);
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDMxNDAyYjNmZTE3Y2Q5YjY5M2NjZDI0ZGZjNWNiMyIsIm5iZiI6MTc3MTEzNTQwOS44OTEsInN1YiI6IjY5OTE2MWIxMTliYzNjZDJlYzZmNjVlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o_bKoABNC5rD5Ay4ThICzXDqL0yMPJ4q-9YgJNP3IIY'
  }
};


  const [apiData,setApiData]=useState([])
  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => {
    if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
    return res.json();
  })
  .then(data => setApiData((data.results && data.results.length) ? data.results : cards_data))
  .catch(err => {
    console.error('TitleCards fetch error:', err);
    setApiData(cards_data);
  });
    const el = cardsRef.current;
    if (!el) return;
    el.addEventListener('wheel', handlewheel, { passive: false });
    return () => el.removeEventListener('wheel', handlewheel);
  }, []);
  return (
    <div className='titleCards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData && apiData.length > 0 ? apiData.map((card, index) => {
            const imgSrc = card.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + card.backdrop_path : card.image;
            const titleText = card.original_title || card.name || card.title || 'Untitled';
            const cardId = card.id || index;
            return (
              <Link to={`/player/${cardId}`} key={index} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <img src={imgSrc} alt={titleText} />
                  <p>{titleText}</p>
                </div>
              </Link>
            );
          }) : <p>Loading...</p>
        }
      </div>    
    </div>
  )
}

export default TitleCards

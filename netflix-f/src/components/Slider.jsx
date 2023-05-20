import React from 'react'
import CardSlider from './CardSlider'

export default React.memo( function Slider({movies}) {

  const getMoviesFromRange = (from, to) =>{
    console.log(movies)
    return movies.slice(from, to)
  }

  return (
    <div>
      <CardSlider title='Tendencia Ahora' data={getMoviesFromRange(0, 10)}></CardSlider>
      <CardSlider title='Nuevos Lanzamientos' data={getMoviesFromRange(10, 20)}></CardSlider>
      <CardSlider title='Películas Taquilleras' data={getMoviesFromRange(20, 30)}></CardSlider>
      <CardSlider title='Popular En Netflix' data={getMoviesFromRange(30, 40)}></CardSlider>
      <CardSlider title='Acción' data={getMoviesFromRange(40, 50)}></CardSlider>
      <CardSlider title='Épicas' data={getMoviesFromRange(50, 60)}></CardSlider>
    </div>
  )
}
)
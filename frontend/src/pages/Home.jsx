


import React from 'react'
import Header from './movies/Header'
import MoviesContainerPage from './movies/MoviesContainerPage'

const Home = () => {
  return (
    <div>
      <Header />
      
      <div className="mt-[10rem]">
      <MoviesContainerPage />
      </div>
    
    </div>
  )
}

export default Home
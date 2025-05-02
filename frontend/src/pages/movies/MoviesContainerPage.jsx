import {
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from '../../redux/api/movies'
import { useFetchGenresQuery } from '../../redux/api/genre'
import SliderUtil from '../../components/SliderUtil'
import { useState } from 'react'

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()
  const [selectedGenre, setSelectedGenre] = useState(null)

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId)
  }

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  )

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
      {/* genres */}
      <nav className="ml-5 flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            onClick={() => handleGenreClick(genre._id)}
            className={`cursor-pointer transition duration-300 ease-in-out p-2 block rounded text-lg hover:bg-gray-200 mb-[1rem] ${
              selectedGenre === genre._id ? 'bg-gray-200 text-black' : ''
            }`}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      {/* sliders */}
      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8 px-5">
          <h1 className="mb-5">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8 px-5">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        
        
        <div className="w-full lg:w-[100rem] mb-8 px-5">
          <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
          
        </div>


      </section>
    </div>
  )
}

export default MoviesContainerPage

import { useFetchGenresQuery } from '../../redux/api/genre'
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from '../../redux/api/movies'

import banner from '../../assets/banner.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from '../../redux/features/movies/moviesSlice'
import { useEffect } from 'react'
import MovieCard from './MovieCard'

const AllMovies = () => {
  const dispatch = useDispatch()
  const { data } = useGetAllMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()
  const { data: newMovies } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies)

  const movieYears = data?.map((movie) => movie.year)
  const uniqueYears = Array.from(new Set(movieYears))

  useEffect(() => {
    dispatch(setFilteredMovies(data || []))
    dispatch(setMovieYears(movieYears))
    dispatch(setUniqueYears(uniqueYears))
  }, [data, dispatch])

  const handleSearchChange = (e) => {
    const newFilter = { ...moviesFilter, searchTerm: e.target.value }
    dispatch(setMoviesFilter(newFilter))
    dispatch(setFilteredMovies(filterMovies(data, newFilter)))
  }

  const handleGenreClick = (genreId) => {
    const newFilter = { ...moviesFilter, selectedGenre: genreId }
    dispatch(setMoviesFilter(newFilter))
    dispatch(setFilteredMovies(filterMovies(data, newFilter)))
  }
  const handleYearChange = (year) => {
    const newFilter = { ...moviesFilter, selectedYear: year }
    dispatch(setMoviesFilter(newFilter))
    dispatch(setFilteredMovies(filterMovies(data, newFilter)))
  }

  const handleSortChange = (sortOption) => {
    const newFilter = { ...moviesFilter, selectedSort: sortOption }
    dispatch(setMoviesFilter(newFilter))
    dispatch(setFilteredMovies(filterMovies(data, newFilter)))
  }

  const filterMovies = (allMovies, filterState) => {
    let filtered = [...allMovies]

    if (filterState.searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(filterState.searchTerm.toLowerCase())
      )
    }

    if (filterState.selectedGenre && filterState.selectedGenre !== 'Genres') {
      filtered = filtered.filter(
        (movie) => movie.genre === filterState.selectedGenre
      )
    }

    if (filterState.selectedYear && filterState.selectedYear !== 'Year') {
      filtered = filtered.filter(
        (movie) => movie.year === +filterState.selectedYear
      )
    }

    // Apply sort last
    switch (filterState.selectedSort) {
      case 'new':
        filtered = newMovies || []
        break
      case 'top':
        filtered = topMovies || []
        break
      case 'random':
        filtered = randomMovies || []
        break
      default:
        break
    }

    return filtered
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            The Movie Hub
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>

        {/* Search & Filters */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4">
          <div className="space-y-6">
            {/* Search Input */}
            <input
              type="text"
              className="w-full h-14 md:h-16 px-6 text-lg rounded-lg border-2 border-gray-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
              placeholder="Search Movie..."
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <select
                onChange={(e) => handleGenreClick(e.target.value)}
                value={moviesFilter.selectedGenre}
                className="flex-1 p-2 md:p-3 rounded-lg border bg-white text-gray-800 focus:ring-2 focus:ring-teal-400"
              >
                <option value="">All Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => handleYearChange(e.target.value)}
                value={moviesFilter.selectedYear}
                className="flex-1 p-2 md:p-3 rounded-lg border bg-white text-gray-800 focus:ring-2 focus:ring-teal-400"
              >
                <option value="">All Years</option>
                {uniqueYears?.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={moviesFilter.selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="flex-1 p-2 md:p-3 rounded-lg border bg-white text-gray-800 focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Sort By</option>
                <option value="new">New Movies</option>
                <option value="top">Top Movies</option>
                <option value="random">Random Movies</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AllMovies

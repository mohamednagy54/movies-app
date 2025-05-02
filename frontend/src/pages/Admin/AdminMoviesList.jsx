import { Link } from 'react-router'
import { useGetAllMoviesQuery } from '../../redux/api/movies'


const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          All Movies ({movies?.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/admin/movies/update/${movie._id}`} className="block">
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {movie.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
                  {movie.detail}
                </p>

                <div className="mt-4">
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    Update Movie
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminMoviesList

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { toast } from 'react-toastify'
import {
  useAddMovieReviewMutation,
  useGetSpecificMovieQuery,
} from '../../redux/api/movies'
import MovieTabs from './MovieTabs'

const MovieDetails = () => {
  const { id: movieId } = useParams()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId)
  const { userInfo } = useSelector((state) => state.auth)

  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap()

      setComment('')
      setRating(0)

      refetch()

      toast.success('Review created successfully')
    } catch (error) {
      toast.error(error.data || error.message)
    }
  }

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="text-center md:text-left md:ml-5">
        <Link to="/" className="text-white font-semibold hover:underline">
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem] ">
        <div className="flex justify-center items-center sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[50%] mx-auto ">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-full rounded "
          />
        </div>

        <div className="container flex flex-col md:flex-row justify-center items-center gap-10 pl-3  mt-[3rem] md:justify-between md:ml-auto">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 text-[#B0B0B0] xl:w-[35rem] lg:w-[35rem] md:w-[30rem]">
              {movie?.detail}
            </p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>

            
            
            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className="mt-[1rem] md:max-w-5">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container ml-auto">
          <MovieTabs
            loadingMovieReview={ loadingMovieReview}
            userInfo={userInfo}
            movie={movie}
            comment={comment}
            setComment={setComment}
            submitHandler={handleSubmit}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

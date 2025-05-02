import { toast } from 'react-toastify'
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from '../../redux/api/movies'

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery()
  const [deleteComment] = useDeleteCommentMutation()

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId })
      toast.success("Comment Deleted Successfully")
      refetch()
      
    } catch (error) {
      console.error('Error deleting comment: ', error)
    }
    
  }

  return (
    <div>
      {movies?.map((movie) => (
        <section
          key={movie._id}
          className="flex flex-col justify-center items-center"
        >
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1a1a1a] p-4 rounded-lg mt-[2rem] w-[50%]"
            >
              <div className="flex justify-between">
                <strong className="text-[#b0b0b0]">{review.name}</strong>
                <p className="text-[#b0b0b0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>

              <button
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteComment(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default AllComments

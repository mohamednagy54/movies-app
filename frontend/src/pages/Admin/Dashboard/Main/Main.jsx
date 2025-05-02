import {
  useGetAllMoviesQuery,
  useGetTopMoviesQuery,
} from '../../../../redux/api/movies'
import { useGetUsersQuery } from '../../../../redux/api/users'
import PrimaryCard from './PrimaryCard'
import RealTimeCard from './RealTimeCard'
import VideoCard from './VideoCard'

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: allMovies } = useGetAllMoviesQuery()
  const { data: visitors } = useGetUsersQuery()

  const totalCommentsLength = allMovies?.map((m) => m.numReviews)
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  )

  return (
    <div className="flex-1 min-h-screen">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-6 p-4 md:p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-wrap  md:flex-row gap-4 w-full  ">
            <PrimaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <PrimaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-[#ccc514] to-[#cdcb8e]"
            />
            <PrimaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-teal-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between items-center text-white font-bold px-2">
            <p className="text-sm sm:text-base">Top Content</p>
            <p className="text-sm sm:text-base">Comments</p>
          </div>

          {/* Top Movies */}

          <div className="space-y-3 sm:space-y-4">
            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))}
          </div>
        </div>

        {/* realTime Card */}
        <div className="lg:sticky lg:top-20 h-fit order-first lg:order-last">
          <RealTimeCard className="w-full max-w-[400px] mx-auto lg:max-w-none lg:mx-0" />
        </div>
      </section>
    </div>
  )
}

export default Main

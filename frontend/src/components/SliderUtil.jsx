import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MovieCard from '../pages/movies/MovieCard'

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data?.length > 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  )
}

export default SliderUtil

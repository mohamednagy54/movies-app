import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from '../../redux/api/movies.js'

import { useFetchGenresQuery } from '../../redux/api/genre'

const CreateMovie = () => {
  const navigate = useNavigate()
  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    rating: 0,
    image: null,
    genre: '',
  })

  const [selectedImage, setSelectedImage] = useState(null)

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery()

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation()
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation()

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0] ? genres[0]._id : '',
      }))
    }
  }, [genres])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'genre') {
      const selectedGenre = genres.find((genre) => genre.name === value)

      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : '',
      }))
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleImagechange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error('Please fill all required fields')
        return
      }

      let uploadedImagePath = null

      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)

        const uploadImageResponse = await uploadImage(formData)

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image
        } else {
          console.error('Failed to upload image: ', uploadImageErrorDetails)
          toast.error('Failed to upload image')
          return
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        })

        setMovieData({
          name: '',
          year: 0,
          detail: '',
          cast: [],
          ratings: 0,
          image: null,
          genre: '',
        })

        toast.success('Movie Added To Database')
        navigate('/admin/movies-list')
      }
    } catch (error) {
      console.error('Failed to create movie: ', createMovieErrorDetail)
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`)
    }
  }

  return (
    <div className="flex justify-center min-h-[120vh] screen p-4">
      <form className="w-full h-full max-w-2xl bg-gray-800 rounded-lg p-6 md:p-8">
        <p className="text-green-200 text-2xl md:text-3xl mb-6 md:mb-8 font-semibold">
          Create Movie
        </p>

        <div className="space-y-4 md:space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-200 mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-teal-400 text-white"
              />
            </label>
          </div>

          {/* Year and Genre Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Year */}
            <div>
              <label className="block text-gray-200 mb-2">
                Year:
                <input
                  type="number"
                  name="year"
                  value={movieData.year}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-teal-400 text-white"
                />
              </label>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-gray-200 mb-2">
                Genre:
                <select
                  name="genre"
                  value={movieData.genre}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-teal-400 text-white"
                >
                  {isLoadingGenres ? (
                    <option className="text-gray-400">Loading genres...</option>
                  ) : (
                    genres.map((genre) => (
                      <option
                        key={genre._id}
                        value={genre._id}
                        className="text-white"
                      >
                        {genre.name}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-gray-200 mb-2">
              Detail:
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-teal-400 text-white h-32"
              ></textarea>
            </label>
          </div>

          {/* Cast */}
          <div>
            <label className="block text-gray-200 mb-2">
              Cast (comma-separated):
              <input
                type="text"
                name="cast"
                value={movieData.cast}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-teal-400 text-white"
              />
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label
              className={`inline-block w-full cursor-pointer ${
                !selectedImage
                  ? 'p-4 border-2 border-dashed border-gray-600 rounded hover:border-teal-400'
                  : ''
              }`}
            >
              <div className="text-gray-400">
                {!selectedImage ? (
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Click to upload image</span>
                    <span className="text-xs mt-1">PNG, JPG, JPEG</span>
                  </div>
                ) : (
                  <span className="text-teal-400">{selectedImage.name}</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagechange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleCreateMovie}
            disabled={isCreatingMovie || isUploadingImage}
            className="w-full md:w-auto mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingMovie || isUploadingImage ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  {/* Loading spinner SVG */}
                </svg>
                Creating...
              </span>
            ) : (
              'Create Movie'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateMovie

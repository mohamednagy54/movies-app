import { useEffect, useState } from 'react'
import {
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
} from '../../redux/api/movies'

import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'

const UpdateMovie = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    ratings: 0,
    image: null,
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const { data: initialMovieData } = useGetSpecificMovieQuery(id)

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation()
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation()
  const [deleteMovie] = useDeleteMovieMutation()

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData)
    }
  }, [initialMovieData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImagechange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error('Please fill in all required fields')
        return
      }

      let uploadedImagePath = movieData.image

      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)

        const uploadImageResponse = await uploadImage(formData)

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image
        } else {
          console.error('Failed to upload image:', uploadImageErrorDetails)
          toast.error('Failed to upload image')
          return
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      })

      navigate('/movies')
    } catch (error) {
      console.error('Failed to update movie:', error)
    }
  }
  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id)
      toast.success('Movie Deleted Successfully')
      navigate('/movies')
    } catch (error) {
      console.error('Failed to Delete Movie', error)
      toast.error(`Failed to Delete Movie: ${error.message}`)
    }
  }

  return (
    <div className="flex justify-center  min-h-[120vh] p-4 md:p-6">
      <form className="w-full h-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-4 md:p-8">
        <h2 className="text-green-200 text-2xl md:text-3xl font-bold mb-6">
          Update Movie
        </h2>

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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </label>
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-200 mb-2">
              Year:
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </label>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-gray-200 mb-2">
              Detail:
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label
              className={`inline-block w-full cursor-pointer p-4 border-2 border-dashed ${
                !selectedImage
                  ? 'border-gray-300 hover:border-teal-400'
                  : 'border-transparent'
              } rounded-lg transition-colors`}
            >
              <div className="text-center text-gray-600">
                {!selectedImage ? (
                  <>
                    <span className="block mb-1 ">Click to upload image</span>
                    <span className="text-sm text-gray-500">
                      PNG, JPG, JPEG
                    </span>
                  </>
                ) : (
                  <span className="text-teal-600 font-medium">
                    {selectedImage.name}
                  </span>
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

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={handleUpdateMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="w-full md:w-auto px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded font-medium transition-colors disabled:opacity-50"
            >
              {isUpdatingMovie || isUploadingImage ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    {/* Loading spinner SVG */}
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Movie'
              )}
            </button>

            <button
              type="button"
              onClick={handleDeleteMovie}
              disabled={isUpdatingMovie || isUploadingImage}
              className="w-full md:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors disabled:opacity-50"
            >
              {isUpdatingMovie || isUploadingImage ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    {/* Loading spinner SVG */}
                  </svg>
                  Deleting...
                </span>
              ) : (
                'Delete Movie'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateMovie

import { toast } from 'react-toastify'
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from '../../redux/api/genre'
import { useState } from 'react'
import GenreForm from '../../components/GenreForm'
import Modal from '../../components/Modal'

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery()
  const [name, setName] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [updatingName, setUpdatingName] = useState('')

  const [createGenre] = useCreateGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const [deleteGenre] = useDeleteGenreMutation()

  const handleCreateGenre = async (e) => {
    e.preventDefault()

    if (!name) {
      toast.error('Genre name is required')
      return
    }

    try {
      const result = await createGenre({ name }).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        toast.success(`${result.name} is created.`)
        refetch()
      }
    } catch (error) {
      console.error(error)
      toast.error('Creating genre failed, try again.')
    }
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault()

    if (!updateGenre) {
      toast.error('Genre name is required')
      return
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated`)
        refetch()
        setModalVisible(false)
        setSelectedGenre(null)
        setUpdatingName('')
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleDeleteGenre = async () => { 
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else { 
        toast.success(`${result.name} is deleted`)
        refetch()
        setSelectedGenre(null)
        setModalVisible(false)

      }

      
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed, Try again")

      
    }

  }

  return (
    <div className=" flex justify-center flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>

        {/* Form */}
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <Modal />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border text-teal-500 border-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true)
                    setSelectedGenre(genre)
                    setUpdatingName(genre.name)
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            buttonText="Update"
            handleSubmit={handleUpdateGenre}
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  )
}

export default GenreList

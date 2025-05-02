import { useState } from 'react'
import { Link } from 'react-router'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-[#242424] rounded-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen mt-15 md:mt-10  z-50 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out `}
      >
        <aside className="text-white w-64 flex-shrink-0">
          <ul className="py-4">
            <li className="text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full md:-translate-x-6 -translate-x-4">
              <Link
                to="/admin/movies/dashboard"
                className="block p-2 ml-10 md:ml-20 mb-6 md:mb-10"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full md:-translate-x-6 -translate-x-4">
              <Link
                to="/admin/movies/create"
                className="block p-2 ml-10 md:ml-20 mb-6 md:mb-10"
              >
                Create Movie
              </Link>
            </li>
            <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full md:-translate-x-6 -translate-x-4">
              <Link
                to="/admin/movies/genre"
                className="block p-2 ml-10 md:ml-20 mb-6 md:mb-10"
              >
                Create Genre
              </Link>
            </li>
            <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full md:-translate-x-6 -translate-x-4">
              <Link
                to="/admin/movies-list"
                className="block p-2 ml-10 md:ml-20 mb-6 md:mb-10"
              >
                Update Movie
              </Link>
            </li>
            <li className="text-lg hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full md:-translate-x-6 -translate-x-4">
              <Link
                to="/admin/movies/comments"
                className="block p-2 ml-10 md:ml-20 mb-6 md:mb-10"
              >
                Comments
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  )
}

export default Sidebar

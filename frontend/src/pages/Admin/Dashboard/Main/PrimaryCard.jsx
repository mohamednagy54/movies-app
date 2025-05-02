const PrimaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div
      className={`w-full  md:w-[15rem] h-[12rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg `}
    >
      <div
        className={`absolute-center !-top-4 border bg-gradient-to-b ${gradient} px-5 py-2 rounded-full text-gray-800 text-sm font-semibold`}
      >
        {pill}
      </div>

      <div className="flex items-center justify-center h-full">
        <h2 className="text-5xl font-black text-white">{content}</h2>
      </div>

      <div className="absolute !bottom-4 left-1/2 -translate-x-1/2 text-sm text-white">
        {info}
      </div>
    </div>
  )
}

export default PrimaryCard

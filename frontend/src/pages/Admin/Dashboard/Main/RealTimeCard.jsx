import { useGetUsersQuery } from "../../../../redux/api/users"



const RealTimeCard = () => {

  const { data: vistors } = useGetUsersQuery()
  


  




  return (
    <div className="w-full max-w-[500px] mt-10 bg-[#282828] text-white rounded-lg shadow-lg p-4 ">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-[#666] my-7"></div>

      <h2 className="text-2xl font-bold mb-2">{ vistors?.length}</h2>
      <p className="text-gray-500 mb-2">Subscribe</p>
      <hr />

      <div className="w-[100%] h-[10%] bg-[#282828] text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>You have { vistors?.length} new users, watching your content.</p>
      </div>



    </div>
  )
}

export default RealTimeCard
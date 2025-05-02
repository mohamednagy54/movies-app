import Main from "./Main/Main"
import Sidebar from "./Sidebar/Sidebar"



const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <Main />
    
    </div>
  )
}

export default AdminDashboard
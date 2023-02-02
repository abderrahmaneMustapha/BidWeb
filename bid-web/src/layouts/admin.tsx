import SideBar from "../components/sidebar"

const AdminLayout = ({children}: { children: JSX.Element | JSX.Element[]}) => {
  return (
    <div className="admin">
      <SideBar />
      {children}
    </div>
  )
}

export default AdminLayout

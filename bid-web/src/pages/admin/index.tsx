import { useNavigate } from "react-router-dom"
import ItemsTable from "../../components/itemsTable"
import AdminLayout from "../../layouts/admin"

const Admin =  () => {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      <div className="container p-md-5">
        <header className="mb-5 d-flex justify-content-between">
          <h2>Items</h2>
          <button className="btn btn-success btn-sm" onClick={() => navigate('/admin/item/new')}>Add</button>
        </header>
        <ItemsTable></ItemsTable>
      </div>
    </AdminLayout>
  )
}

export default Admin
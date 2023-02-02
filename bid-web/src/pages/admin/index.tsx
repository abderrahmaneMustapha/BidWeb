import ItemsTable from "../../components/itemsTable"
import AdminLayout from "../../layouts/admin"

const Admin =  () => {
  return (
    <AdminLayout>
      <div className="container p-md-5">
        <header className="mb-5">
          <h2>Items</h2>
        </header>
        <ItemsTable></ItemsTable>
      </div>
    </AdminLayout>
  )
}

export default Admin
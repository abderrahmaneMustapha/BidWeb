import ItemForm from "../../../components/itemForm";
import AdminLayout from "../../../layouts/admin";

const ItemEdit = () => {
    const onSubmit = () => {
        console.log("edit submit")
    }
    return (
        <AdminLayout>
            <div className="container p-md-5">
                <header className="mb-md-5 mb-sm-2">
                  <h3>Edit Item</h3>
                </header>
                <ItemForm onSubmit={onSubmit}></ItemForm>
            </div>
        </AdminLayout>
    );
};

export default ItemEdit;

import AdminLayout from "../../../layouts/admin";

const ItemEdit = () => {
    return (
        <AdminLayout>
            <div className="container p-md-5">
                <header className="mb-md-5 mb-sm-2">
                  <h3>Create new Item</h3>
                </header>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Bid Close Date</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-7 col-sm-12">
                        <label className="form-label">
                            Upload an Image
                        </label>
                        <input className="form-control" type="file" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            placeholder="1234 Main St"
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ItemEdit;

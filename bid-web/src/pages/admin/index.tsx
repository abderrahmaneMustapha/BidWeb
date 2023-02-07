import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATION_ITEMS } from "../../common/confing";
import ItemsTable from "../../components/itemsTable";
import AdminLayout from "../../layouts/admin";
import {
    useDeleteItemMutation,
    useGetItemsMutation,
} from "../../redux/queries";

const pageSize = parseInt(PAGINATION_ITEMS || "10");

const Admin = () => {
    const navigate = useNavigate();
    const [getItems, { isError, data }] = useGetItemsMutation();
    const [deleteItem, { data: deleteData }] = useDeleteItemMutation();
    const [currentItems, setCurrentItems] = useState<number>(0);

    useEffect(() => {
        getItems({ limit: pageSize, skip: currentItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItems, deleteData]);

    const handleDeleteItem = (name: string) => {
        console.log(name);
        deleteItem({ name: name });
    };

    const goNext = () => {
        if (!data || isError) return;
        if (data?.data.count <= pageSize) return;
        if (currentItems + pageSize >= data?.data.count) return;
        setCurrentItems(currentItems + pageSize);
    };

    const goPrev = () => {
        if (!data || isError) return;
        if (currentItems === 0 || data?.data.count <= pageSize) return;
        setCurrentItems(currentItems - pageSize);
    };

    const displayCurrentItems = () => {
        if (data?.data.count < currentItems + pageSize) {
            return data?.data.count;
        }

        return currentItems + pageSize;
    };

    return (
        <AdminLayout>
            <div className="container p-md-5">
                <header className="mb-5 mt-3 d-flex justify-content-between">
                    <h2>Items</h2>
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate("/admin/item/new")}
                    >
                        Add
                    </button>
                </header>
                <section className="my-2 d-flex justify-content-between">
                    <div>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={goPrev}
                        >
                            Previous
                        </button>
                        <span className="m-2">
                            <strong>
                                {displayCurrentItems()} /{" "}
                                {data?.data.count || 0}
                            </strong>
                        </span>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={goNext}
                        >
                            Next
                        </button>
                    </div>
                </section>
                <ItemsTable
                    data={data?.data.data || []}
                    onDelete={handleDeleteItem}
                ></ItemsTable>
            </div>
        </AdminLayout>
    );
};

export default Admin;

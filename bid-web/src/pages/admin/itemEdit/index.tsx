import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemFormValues } from "../../../common/types";
import { validateForm } from "../../../common/validation";
import Alert from "../../../components/alert";
import ItemForm from "../../../components/itemForm";
import AdminLayout from "../../../layouts/admin";
import {
    useGetItemMutation,
    useUpdateItemMutation,
} from "../../../redux/queries";

const ItemEdit = () => {
    const [updateItem, { isError, isSuccess }] =
        useUpdateItemMutation();
    const [getItem, { data: getData }] = useGetItemMutation();
    const [isValid, setIsValid] = useState<null | boolean>(null);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItem({ name });
    }, [getItem, name]);

    const onSubmit = (inputs: ItemFormValues) => {
        setIsValid(null);
        if (!validateForm(inputs)) {
            setIsValid(false);
            return;
        }
        updateItem({ name, item: inputs }).then(({ data }: any) => {
            if (data.success) {
                setTimeout(() => {
                    navigate("/admin");
                }, 2000);
            }
        });
    };

    return (
        <AdminLayout>
            <div className="container p-md-5">
                <header className="mb-md-5 mb-sm-2">
                    <h3>Edit Item</h3>
                </header>
                {isValid === false && (
                    <Alert type="danger" message="All fields are required" />
                )}
                {isError && (
                    <Alert
                        type="danger"
                        message="Server validation error, item could not be updated"
                    ></Alert>
                )}
                {isSuccess && (
                    <Alert
                        type="success"
                        message="Item updated successfully"
                    ></Alert>
                )}
                <ItemForm
                    onSubmit={onSubmit}
                    leave="/admin"
                    item={getData?.data || {}}
                    action="edit"
                ></ItemForm>
                <div>
                    <p><strong>Highest bid: </strong> {getData?.data.highest_bid < 1 ? 0:  getData?.data.highest_bid }</p>
                    <p><strong>Updated at: </strong> {new Date(getData?.data.updated_at).toLocaleString()}</p>
                    <p><strong>created at: </strong> {new Date(getData?.data.created_at).toLocaleString()}</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ItemEdit;

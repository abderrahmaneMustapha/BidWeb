import { useState } from "react";
import { ItemFormValues } from "../../../common/types";
import { validateForm } from "../../../common/validation";
import Alert from "../../../components/alert";
import ItemForm from "../../../components/itemForm";
import AdminLayout from "../../../layouts/admin";
import { useCreateItemMutation } from "../../../redux/queries";

const ItemCreate = () => {
    const [createItem, { isError, isSuccess }] = useCreateItemMutation();

    const [isValid, setIsValid] = useState<null | boolean>(null);

    const onSubmit = (inputs: ItemFormValues) => {
        inputs.image = "zeaze"
        if (!validateForm(inputs)) {
            setIsValid(false);
            return;
        }

        createItem(inputs);
    };

    return (
        <AdminLayout>
            <div className="container p-5">
                <header className="mb-5">
                    <h3>Creat new Item</h3>
                </header>
                {isValid === false && (
                    <Alert type="danger" message="All fields are required" />
                )}
                {isError && (
                    <Alert
                        type="danger"
                        message="Server validation error, item could not created successfully"
                    ></Alert>
                )}
                {isSuccess && (
                    <Alert
                        type="success"
                        message="Item created successfully"
                    ></Alert>
                )}
                <ItemForm onSubmit={onSubmit}></ItemForm>
            </div>
        </AdminLayout>
    );
};

export default ItemCreate;

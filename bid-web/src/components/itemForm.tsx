import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemFormProps, ItemFormValues } from "../common/types";
import { useCreateImageMutation } from "../redux/queries";
import FormMessage from "./formMessage";

const ItemForm = ({ onSubmit, leave }: ItemFormProps) => {
    const navigate = useNavigate()
    const [createImage,{ isError, isSuccess }] =
        useCreateImageMutation();

    const [inputs, setInputs] = useState<ItemFormValues>({
        name: "",
        close_at: "",
        image: "",
        description: "",
    });

    const handleInputChange = (input: string, value: string) => {
        setInputs({ ...inputs, [input]: value });
    };

    const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(inputs);
    };

    const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            let image = reader.result as string;
            createImage(image).then(({ data }: any) => {
                setInputs({ ...inputs, image: data.data.secure_url });
            });
        };
        if (event.target.files) reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <form className="row g-3 needs-validation" name="item-form" onSubmit={handleSumbit}>
            <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                        handleInputChange("name", e.target.value);
                    }}
                    required
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Bid Close Date</label>
                <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                        handleInputChange("close_at", e.target.value);
                    }}
                    required
                />
            </div>
            <div className="col-md-7 col-sm-12">
                <label className="form-label">Upload an Image</label>
                <input
                    className="form-control"
                    type="file"
                    onChange={(event) => {
                        onImageUpload(event);
                    }}
                    accept="image/*"
                    required
                />
                { isError && <FormMessage type="invalid" message="could not upload image"></FormMessage> }
                { isSuccess && <FormMessage type="valid" message="Image uploaded successfully"></FormMessage> }
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Item Description"
                    onChange={(e) => {
                        handleInputChange("description", e.target.value);
                    }}
                    required
                />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={!inputs.image}>
                    Save
                </button>
                <button className="btn btn-secondary m-2" onClick={() => navigate(leave)}>Leave</button>
            </div>
        </form>
    );
};

export default ItemForm;

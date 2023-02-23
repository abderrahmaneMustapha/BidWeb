import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemFormProps, ItemFormValues } from "../common/types";
import { useCreateImageMutation } from "../redux/queries";
import FormMessage from "./formMessage";
import moment from "moment";

const ItemForm = ({ onSubmit, leave, item, action }: ItemFormProps) => {
    const navigate = useNavigate();
    const [createImage, { isError, isSuccess, isLoading }] = useCreateImageMutation();
    const [inputs, setInputs] = useState<ItemFormValues>({
        name: "",
        close_at: "",
        image: "",
        description: "",
    });

    const [image, setImage] = useState<string>("")

    useEffect(() => {
        if (item) {
            setInputs(item as unknown as ItemFormValues);
            setImage(item.image)
        }
    }, [item]);

    const handleInputChange = (input: string, value: string) => {
        setInputs({ ...inputs, [input]: value });
    };

    const handleSumbit = (event: any) => {
        event.preventDefault();
        setInputs({ name: inputs.name, close_at: inputs.close_at,  description: inputs.description, image: image})
        onSubmit({ name: inputs.name, close_at: inputs.close_at,  description: inputs.description, image: image});
    };

    const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            let image = reader.result as string;
            createImage(image).then(({ data }: any) => {
                setImage(data?.data?.secure_url);
            }).catch((error) => {
                console.log(error)
            });
        };
        if (event.target.files) reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <form
            className="row g-3 needs-validation"
            name="item-form"
        >
            <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                        handleInputChange("name", e.target.value);
                    }}
                    defaultValue={inputs.name}
                    required
                    disabled={action === "edit"}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Bid Close Date</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    onChange={(e) => {
                        handleInputChange("close_at", e.target.value);
                    }}
                    value={moment(inputs.close_at).format("YYYY-MM-DDTHH:mm")}
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
                />
                {(image && !isLoading) && (
                    <a href={image} target={"_blank"} rel="noreferrer">
                        uploaded image url
                    </a>
                )}
                    
                {(isLoading && !isError) && (<strong>Please wait image is being uploaded</strong>)}
                {isError && (
                    <FormMessage
                        type="invalid"
                        message="could not upload image"
                    ></FormMessage>
                )}
                {isSuccess && (
                    <FormMessage
                        type="valid"
                        message="Image uploaded successfully"
                    ></FormMessage>
                )}
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Item Description"
                    onChange={(e) => {
                        handleInputChange("description", e.target.value);
                    }}
                    defaultValue={inputs.description}
                    required
                />
            </div>
            <div className="col-12">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!image || !inputs.close_at || !inputs.description || !inputs.name}
                    onClick={handleSumbit}
                >
                    Save
                </button>
                <button
                    className="btn btn-secondary m-2"
                    onClick={() => navigate(leave)}
                >
                    Leave
                </button>
            </div>
        </form>
    );
};

export default ItemForm;

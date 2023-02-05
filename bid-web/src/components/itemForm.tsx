import { FormEvent, useState } from "react";
import { ItemFormProps, ItemFormValues } from "../common/types";

const ItemForm = ({ onSubmit }: ItemFormProps) => {
    const [inputs, setInputs] = useState<ItemFormValues>({
        name: "",
        close_at: "",
        image: "",
        description: "",
    });

    const handleInputChange = (input: string, value: string) => {
        setInputs({...inputs,[input]: value});
    };

    const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(inputs)
    }
    return (
        <form className="row g-3" name="item-form" onSubmit={handleSumbit}>
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
                <input className="form-control" type="file" required />
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
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
};

export default ItemForm;

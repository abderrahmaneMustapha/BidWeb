import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./modal";

const ItemsTable = ({ data, onDelete }: any) => {
    const [hideModal, setHideModal] = useState(true);
    const [selectedItem, setSelectedItem] = useState("");

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((d: any, index: number) => (
                            <tr key={d.name}>
                                <td>{index + 1}</td>
                                <td>{d.name}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    className="dropdown-item"
                                                    to={`/admin/item/${d.name}`}
                                                >
                                                    Edit
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setHideModal(false);
                                                        setSelectedItem(d.name);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                            <li>
                                                <NavLink
                                                    className="dropdown-item"
                                                    to={`/admin/item/${d.name}/history`}
                                                >
                                                    Bid History
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Modal
                hide={hideModal}
                content={`Are you sure you want to delete this Item ${selectedItem}`}
                onSubmit={() => {
                    onDelete(selectedItem);
                }}
                onClose={() => {
                    setHideModal(true);
                    setSelectedItem("");
                }}
            />
        </div>
    );
};

export default ItemsTable;

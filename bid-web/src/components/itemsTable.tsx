import { NavLink } from "react-router-dom";

const  id = 33
const ItemsTable = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>zeaz</td>
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
                                    <NavLink className="dropdown-item" to={`/admin/item/${id}`}>
                                        Edit
                                    </NavLink>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => console.log("delete")}>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ItemsTable;

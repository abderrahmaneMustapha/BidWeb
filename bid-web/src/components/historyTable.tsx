import { handleBillProps } from "../common/types";
import BillIcon from "../icons/bill";

const HistoryTable = ({ data, handleBill }: handleBillProps) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="d-md-table-cell d-sm-none">#</th>
                        <th className="d-md-table-cell">Item</th>
                        <th className="d-md-table-cell" title="Your bid amount">
                            Amount
                        </th>
                        <th
                            className="d-md-table-cell d-sm-none"
                            title="Maximum bid amount in this item"
                        >
                            Max Amount
                        </th>
                        <th className="d-md-table-cell">State</th>
                        <th className="d-md-table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((d: any, index: number) => (
                            <tr key={d._id}>
                                <td className="d-md-table-cell d-sm-none">
                                    {index + 1}
                                </td>
                                <td>{d.item.name}</td>
                                <td>{d.amount}</td>
                                <td className="d-md-table-cell d-sm-none">
                                    {d.maxAmount}
                                </td>
                                <td>{d.state}</td>
                                <td>
                                    {d.state === "Won" && (
                                        <button
                                            title="View bill"
                                            className="btn btn-light"
                                            onClick={() => {
                                              handleBill(d)
                                            }}
                                        >
                                            <BillIcon />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryTable;

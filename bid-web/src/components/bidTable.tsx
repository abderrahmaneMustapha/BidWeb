const BidTable = ({ data }: any) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="d-md-table-cell d-sm-none">#</th>
                        <th className="d-md-table-cell">Username</th>
                        <th className="d-md-table-cell">Amount</th>
                        <th className="d-md-table-cell d-sm-none">Date</th>
                        <th className="d-md-table-cell d-sm-none">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((d: any, index: number) => (
                            <tr key={d._id}>
                                <td className="d-md-table-cell d-sm-none">{index + 1}</td>
                                <td>{d.user.username}</td>
                                <td>{d.amount}</td>
                                <td className="d-md-table-cell d-sm-none">{new Date(d.created_at).toDateString()}</td>
                                <td className="d-md-table-cell d-sm-none">{new Date(d.created_at).toTimeString().split(' ')[0]}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidTable;

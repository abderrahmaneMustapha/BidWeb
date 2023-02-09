import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/default";
import { useNotifyUserMutation } from "../../redux/queries";

const Notifications = () => {
    const [notifyUser] = useNotifyUserMutation();
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        notifyUser({}).then((data: any) => {
            if (data?.data.data) {
                setNotifications(data.data.data);
            }
        });
    }, [notifyUser]);

    return (
        <DefaultLayout>
          <div className="container p-5">
            <header className="mb-5">
                <h2>Notifications</h2>
            </header>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="d-md-table-cell d-sm-none">#</th>
                        <th className="d-md-table-cell">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications &&
                        notifications.map((d: any, index: number) => (
                            <tr key={d}>
                                <td className="d-md-table-cell d-sm-none">
                                    {index + 1}
                                </td>
                                <td>{d}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            </div>
        </DefaultLayout>
    );
};

export default Notifications;

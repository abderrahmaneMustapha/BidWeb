import { useEffect, useState } from "react";
import { getUserFromStorage } from "../../common/auth";
import { useUserItemsMutation } from "../../redux/queries";
import BillCard from "../../components/billCard";
import HistoryTable from "../../components/historyTable";
import DefaultLayout from "../../layouts/default";

const Profile = () => {
    const [userItems, data] = useUserItemsMutation();
    const [items, setItems] = useState<any[] | undefined>(undefined);
    const [itemBill, setItemBill] = useState<any | undefined>(undefined);

    useEffect(() => {
        userItems({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleItemsFilter = (value: string) => {
        const _items: any[] | undefined = data.data?.data;
        if (_items) {
            const filteredItems = _items.filter(
                (item: any) => item.state === value
            );
            if (filteredItems.length > 0 || value !== "All") {
                setItems(filteredItems);
            } else {
                setItems(undefined);
            }
        }
    };

    const handleBill = (itemBill: any) => {
      setItemBill(itemBill)
    }

    return (
        <DefaultLayout>
            <div className="container p-md-5">
                <header className="mb-5 mt-3 row justify-content-between">
                    <h2 className="col-md-5 mb-5">
                        {getUserFromStorage()?.username} Profile
                    </h2>
                    <div className="col-md-4 col-sm-8">
                        <BillCard
                            bid={itemBill}
                        />
                    </div>
                </header>
                <div>
                    <h4 className="mb-3">Items you bid on</h4>
                    <div className="col-md-3 col-sm-10 mb-3">
                        <select
                            className="form-select"
                            onChange={(event) => {
                                handleItemsFilter(event.target.value);
                            }}
                        >
                            <option value="All">Bid State</option>
                            <option value="Won">Won</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                    {data.data?.data ? (
                        <HistoryTable
                            data={items ? items : data.data?.data || []}
                            handleBill={handleBill}
                        ></HistoryTable>
                    ) : (
                        "Items is being loaded..."
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;

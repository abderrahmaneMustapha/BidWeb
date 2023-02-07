import { useEffect, useState } from "react";
import { PAGINATION_ITEMS } from "../../common/confing";
import { Item } from "../../common/types";
import Card from "../../components/card";
import DefaultLayout from "../../layouts/default";
import { useGetItemsMutation } from "../../redux/queries";

const pageSize = parseInt(PAGINATION_ITEMS || "10");
const Home = () => {
    const [getItems, { isError, data }] = useGetItemsMutation();
    const [currentItems, setCurrentItems] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<number>(-1);
    const [open, setOpen] = useState<number>(0);

    useEffect(() => {
        getItems({
            limit: pageSize,
            skip: currentItems,
            search,
            sort,
            open,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItems]);

    const goNext = () => {
        if (!data || isError) return;
        if (data?.data.count <= pageSize) return;
        if (currentItems + pageSize >= data?.data.count) return;
        setCurrentItems(currentItems + pageSize);
    };

    const goPrev = () => {
        if (!data || isError) return;
        if (currentItems === 0 || data?.data.count <= pageSize) return;
        setCurrentItems(currentItems - pageSize);
    };

    const displayCurrentItems = () => {
        if (data?.data.count < currentItems + pageSize) {
            return data?.data.count;
        }

        return currentItems + pageSize;
    };

    return (
        <DefaultLayout>
            <section className="row align-items-center mb-md-5">
                <div className="col py-5 px-md-5">
                    <div className="input-group mb-3 px-md-5 w-75 mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Item name or description"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                getItems({
                                    limit: pageSize,
                                    skip: currentItems,
                                    search,
                                    sort,
                                    open,
                                })
                            }
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>
            <section className="my-2 d-flex flex-wrap justify-content-center align-items-end">
                <div className="col-md-4 col-sm-12 mb-4">
                    <button className="btn btn-success btn-sm" onClick={goPrev}>
                        Previous
                    </button>
                    <span className="m-2">
                        <strong>
                            {displayCurrentItems()} / {data?.data.count || 0}
                        </strong>
                    </span>
                    <button className="btn btn-success btn-sm" onClick={goNext}>
                        Next
                    </button>
                </div>
                <div className="col-md-2 col-sm-12 mb-4 px-4">
                    <select
                        className="form-select"
                        onChange={(event) => {
                            setSort(parseInt(event.target.value));
                            getItems({
                                limit: pageSize,
                                skip: currentItems,
                                search,
                                sort: event.target.value,
                                open,
                            });
                        }}
                    >
                        <option value="-1" selected>
                            Newest
                        </option>
                        <option value="1">Oldest</option>
                    </select>
                </div>
                <div className="col-md-2 col-sm-12 mb-4 px-4">
                    <select
                        className="form-select"
                        onChange={(event) => {
                            setOpen(parseInt(event.target.value));
                            getItems({
                                limit: pageSize,
                                skip: currentItems,
                                search,
                                sort,
                                open: event.target.value,
                            });
                        }}
                    >
                        <option value="0" selected>
                            Closed/Open bids
                        </option>
                        <option value="-1">Closed</option>
                        <option value="1">Open</option>
                    </select>
                </div>
            </section>
            <section className="row align-items-stretch mb-5 p-5">
                {data &&
                    data?.data.data.map((d: Item) => (
                        <div key={d.name} className="col-md-3 col-sm-10 mb-5">
                            <Card item={d} to={`/bid/${d.name}`}></Card>
                        </div>
                    ))}
            </section>
        </DefaultLayout>
    );
};

export default Home;

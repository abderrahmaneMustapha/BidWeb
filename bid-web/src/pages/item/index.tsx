import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resizeImage } from "../../common/utils";
import Alert from "../../components/alert";
import DefaultLayout from "../../layouts/default";
import {
    useCreateBidMutation,
    useGetItemMutation,
    useGetUserMutation,
    useMaxBidMutation,
    useUpdateUserMutation,
} from "../../redux/queries";

const defaultImage = "https://via.placeholder.com/250.png/09f/fff";

const Item = () => {
    const [getItem, { data, isLoading }] = useGetItemMutation();
    const [getMaxBid] = useMaxBidMutation();
    const [createBid, { isError, error, isSuccess }] = useCreateBidMutation();
    const [updateUser, { isError: updateError }] = useUpdateUserMutation();
    const [getUser, { isLoading: isLoadingUser }] = useGetUserMutation();

    const [autoBid, setAutoBid] = useState(false);

    const { name } = useParams();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const [counterTimeOut, setCounterTimeOut] = useState<
        NodeJS.Timeout | number | string | undefined
    >(undefined);
    const [bidClosed, setBidClosed] = useState<boolean>(false);
    const [bid, setBid] = useState<number>(0);
    const [maxBidUser, setMaxBidUser] = useState<string>("");

    useEffect(() => {
        getItem({ name });
        getMaxBid({ name }).then((bid: any) => {
            setBid(bid.data?.data.amount < 1 ? 1 : bid.data?.data.amount + 1);
            setMaxBidUser(
                bid.data?.data.user.username ? bid.data?.data.user.username : ""
            );
        });

        getUser({}).then((data: any) => {
            setAutoBid(
                data?.data.data.autoBid.items.some((s: string) => s === name) ||
                    false
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getItem, name]);
    useMemo(() => {
        const close_at = data?.data.close_at;
        const bid_closed = new Date(close_at).getTime() - Date.now() <= 0;
        setBidClosed(bid_closed);
        if (close_at && !bid_closed) {
            setCounterTimeOut(
                setTimeout(
                    () => setCounter(new Date(close_at).getTime() - Date.now()),
                    100
                )
            );
        }

        return () => {
            clearTimeout(counterTimeOut);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.data.close_at, counter]);

    const handleBid = () => {
        createBid({
            amount: bid,
            item: data?.data,
        }).then((_bid: any) => {
            if (_bid.data.success) {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        });
    };

    const handleAutoBidChange = () => {
        updateUser({ item: name }).then((data: any) => {
            if (data?.data.success) {
                setAutoBid(!autoBid);
            }
        });
    };

    const handleMessages = () => {
        if (updateError)
            return (
                <Alert
                    type="danger"
                    message="Item could not be set to auto bid"
                ></Alert>
            );
        if (isError)
            return (
                <Alert
                    type="danger"
                    message={(error as any).data?.error.description}
                ></Alert>
            );

        if (isSuccess)
            return (
                <Alert
                    type="success"
                    message="Bid successfully created"
                ></Alert>
            );
    };

    if (isLoading || isLoadingUser) return <div> Loading ...</div>;
    return (
        <DefaultLayout>
            <div className="container h-100">
                {handleMessages()}
                <div className="card my-5 h-75 border-0">
                    <div className="row g-0">
                        <div className="col-md-5 col-sm-12">
                            <div className="p-md-3">
                                <img
                                    src={resizeImage(
                                        data?.data.image || defaultImage,
                                        350,
                                        350
                                    )}
                                    className="w-100 d-block rounded"
                                    alt={data?.data.name}
                                />
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {data?.data.name}
                                </h5>
                                <p className="card-text mb-4">
                                    {data?.data.description}
                                </p>
                                <div className="row align-items-center">
                                    <div className="col-md-5 mb-5">
                                        <p className="fw-bold">
                                            <strong className="fw-bolder">
                                                Highest Bid:
                                            </strong>
                                            {data?.data.highest_bid}$
                                        </p>
                                    </div>
                                    <div  hidden={!bidClosed} className="col-md-5 mb-5">
                                        <p>
                                            Winner: <strong>{maxBidUser}</strong>
                                        </p>
                                    </div>
                                    <div
                                        hidden={bidClosed}
                                        className="col-md-5 mb-5"
                                    >
                                        <div className="input-group float-end">
                                            <span className="input-group-text">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                aria-label="Text input"
                                                disabled={bidClosed}
                                                value={bid}
                                                onChange={(event) => {
                                                    setBid(
                                                        Number(
                                                            event.target.value
                                                        )
                                                    );
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={bidClosed}
                                                onClick={handleBid}
                                            >
                                                Place a bid
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        hidden={bidClosed}
                                        className="col-md-5 mb-5"
                                    >
                                        <div className="form-check form-switch float-start">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                checked={autoBid}
                                                disabled={bidClosed}
                                                onChange={handleAutoBidChange}
                                            />
                                            <label className="form-check-label">
                                                Activate auto bid
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        hidden={bidClosed}
                                        className="col-md-5 mb-5"
                                    >
                                        <p>
                                            <strong>
                                                {countToDate(counter)}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-5 offset-md-5 mb-3">
                                        <button
                                            className="btn btn-dark float-end"
                                            onClick={() => {
                                                navigate("/");
                                            }}
                                        >
                                            Leave
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

const countToDate = (count: number) => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const MS_PER_HOUR = 1000 * 60 * 60;
    const MS_PER_MINUTE = 1000 * 60;
    const MS_PER_SECONDS = 1000;
    const DAYS = Math.floor(count / MS_PER_DAY);
    count -= DAYS * MS_PER_DAY;
    const HOURS = Math.floor(count / MS_PER_HOUR);
    count -= HOURS * MS_PER_HOUR;
    const MINUTES = Math.floor(count / MS_PER_MINUTE);
    count -= MINUTES * MS_PER_MINUTE;
    const SECONDS = Math.floor(count / MS_PER_SECONDS);
    return `${DAYS} days ${HOURS}h: ${MINUTES}m: ${SECONDS}s`;
};

export default Item;

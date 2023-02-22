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
import BidHistory from "./bidHistory";
import { socket } from "../../common/confing";
import { Socket } from "socket.io-client";

const defaultImage = "https://via.placeholder.com/250.png/09f/fff";

const Item = () => {
    
    const { name } = useParams();
    const navigate = useNavigate();

    const [getItem, { isLoading }] = useGetItemMutation();
    const [getMaxBid] = useMaxBidMutation();
    const [createBid, { isError, error, isSuccess }] = useCreateBidMutation();
    const [updateUser, { isError: updateError }] = useUpdateUserMutation();
    const [getUser, { isLoading: isLoadingUser }] = useGetUserMutation();
    const [bidCreatedSocket, setBidCreatedSocket] = useState<Socket>();
    const [itemDetailsSocket, setItemDetailsSocket] = useState<Socket>();

    const [item, setItem] = useState<any | undefined>(undefined);
    const [autoBid, setAutoBid] = useState(false);
    const [counter, setCounter] = useState(0);
    const [counterTimeOut, setCounterTimeOut] = useState<
        NodeJS.Timeout | number | string | undefined
    >(undefined);
    const [bidClosed, setBidClosed] = useState<boolean>(false);
    const [bid, setBid] = useState<number>(0);
    const [maxBidUser, setMaxBidUser] = useState<string>("");

    useEffect(() => {
        getItem({ name }).then((data: any) => {
            if (data.data) setItem(data.data?.data);
            else setItem(undefined);
        });

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

        handleItemDetailsSocket();
        handleMaxBidSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getItem, name, maxBidUser]);

    useMemo(() => {
        const close_at = item?.close_at;
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
    }, [item?.close_at, counter]);

    const goToHome = () => {
        navigate("/");
    };

    const handleBid = () => {
        createBid({
            amount: bid,
            item: item,
        }).then((_bid: any) => {
            if (_bid.data.success) {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        });
    };

    const handleBidChange = (event: any) => {
        setBid(Number(event.target.value));
    };

    const handleAutoBidChange = () => {
        updateUser({ item: name }).then((data: any) => {
            if (data?.data.success) {
                setAutoBid(!autoBid);
            }
        });
    };

    const handleMaxBidSocket = () => {
        if (!bidCreatedSocket) {
            const _bidCreatedSocket = socket.on(
                "bid-created-" + name,
                (bid: any) => {
                    setMaxBidUser(bid.user.username);
                    setBid(bid.amount);
                }
            );
            setBidCreatedSocket(_bidCreatedSocket);
        }
    };

    const handleItemDetailsSocket = () => {
        if (!itemDetailsSocket) {
            const _itemDetailsSocket = socket.on(
                "item-updated-" + name,
                (item: any) => {
                    console.log(item);
                    setItem(item);
                }
            );
            setItemDetailsSocket(_itemDetailsSocket);
        }
    };

    const handleMessages = () => {
        if (updateError)
            return (
                <Alert type="danger" message="Item could not be set to auto bid"
                ></Alert>
            );
        if (isError)
            return (
                <Alert type="danger" message={(error as any).data?.error.description}
                ></Alert>
            );

        if (isSuccess)
            return (
                <Alert type="success" message="Bid successfully created"
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
                            <ItemImage item={item} />
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <ItemDetails
                                item={item}
                                bidClosed={bidClosed}
                                maxBidUser={maxBidUser}
                                bid={bid}
                                handleBidChange={handleBidChange}
                                handleBid={handleBid}
                                autoBid={autoBid}
                                handleAutoBidChange={handleAutoBidChange}
                                counter={counter}
                                goToHome={goToHome}
                            />
                        </div>
                        <BidHistory />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Item;

interface ItemDetailsProps {
    item: any;
    bidClosed: boolean;
    maxBidUser: string;
    bid: number;
    handleBidChange: (event: any) => void;
    handleBid: () => void;
    autoBid: boolean;
    handleAutoBidChange: () => void;
    counter: number;
    goToHome: () => void;
}

function ItemDetails({
    item,
    bidClosed,
    maxBidUser,
    bid,
    handleBidChange,
    handleBid,
    autoBid,
    handleAutoBidChange,
    counter,
    goToHome,
}: ItemDetailsProps) {
    return (
        <div className="card-body">
            <h5 className="card-title">{item?.name}</h5>
            <p className="card-text mb-4">{item?.description}</p>
            <div className="row align-items-center">
                <div className="col-md-5 mb-5">
                    <p className="fw-bold">
                        <strong className="fw-bolder">Highest Bid:</strong>
                        {item?.highest_bid}$
                    </p>
                </div>
                <div hidden={!bidClosed} className="col-md-5 mb-5">
                    <p>
                        Winner: <strong>{maxBidUser}</strong>
                    </p>
                </div>
                <div hidden={bidClosed} className="col-md-5 mb-5">
                    <div className="input-group float-end">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Text input"
                            disabled={bidClosed}
                            value={bid}
                            onChange={handleBidChange}
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
                <div hidden={bidClosed} className="col-md-5 mb-5">
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
                <div hidden={bidClosed} className="col-md-5 mb-5">
                    <p>
                        <strong>{countToDate(counter)}</strong>
                    </p>
                </div>
                <div className="col-md-5 offset-md-5 mb-3">
                    <button
                        className="btn btn-dark float-end"
                        onClick={goToHome}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    );
}

function ItemImage({ item }: any) {
    return (
        <div className="p-md-3">
            <img
                src={resizeImage(item?.image, 350, 350) || defaultImage}
                className="w-100 d-block rounded"
                alt={item?.name}
            />
        </div>
    );
}

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

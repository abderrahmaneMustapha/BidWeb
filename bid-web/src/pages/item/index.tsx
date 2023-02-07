import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resizeImage } from "../../common/utils";
import DefaultLayout from "../../layouts/default";
import { useGetItemMutation } from "../../redux/queries";

const defaultImage = "https://via.placeholder.com/250.png/09f/fff";

const Item = () => {
    const [getItem, { data }] = useGetItemMutation();
    const { name } = useParams();
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0);
    const [counterTimeOut, setCounterTimeOut] = useState<NodeJS.Timeout | number | string | undefined>(undefined)

    useEffect(() => {
        getItem({ name });
    }, [getItem, name]);

    useMemo(() => {
        const close_at = data?.data.close_at;
        console.log(counterTimeOut)
        if (close_at && (new Date(close_at).getTime() - Date.now()) > 0) {
            setCounterTimeOut(setTimeout(
                () => setCounter(new Date(close_at).getTime() - Date.now()),
                100
            ))
        }

        return () => {
            clearTimeout(counterTimeOut)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.data.close_at, counter]);

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

    return (
        <DefaultLayout>
            <div className="container h-100">
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
                                    <div className="col-md-5 mb-3">
                                        <p className="card-text fw-bold">
                                            <span className="fw-bolder">
                                                Last Bid:{" "}
                                            </span>{" "}
                                            30$
                                        </p>
                                    </div>
                                    <div className="col-md-5 mb-5">
                                        <div className="input-group float-end">
                                            <span className="input-group-text">
                                                $
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                aria-label="Text input"
                                                value={31}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                            >
                                                Place a bid
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-5 mb-5">
                                        <div className="form-check form-switch float-start">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                            />
                                            <label className="form-check-label">
                                                Activate auto bid
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-5 mb-5">
                                        <p>
                                            <strong>
                                                {" "}
                                                {countToDate(counter)}{" "}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-5 offset-md-5 mb-3">
                                        <button className="btn btn-dark float-end" onClick={() => {
                                            navigate('/')
                                        }}>
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

export default Item;

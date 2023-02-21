import { resizeImage } from "../common/utils";

const defaultImage = "https://via.placeholder.com/100.png/09f/fff";

const BillCard = ({ bid }: any) => {
    return (
        <div className="card">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <img
                        src={
                            resizeImage(bid?.item?.image, 100, 100) ||
                            defaultImage
                        }
                        className="w-100 d-block"
                        alt={bid?.item?.name || "default image"}
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title mb-3">
                            {bid?.item?.name || "No Item bill"}
                        </h5>
                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <span className="fw-bold">
                                {bid?.amount || 0} $
                            </span>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => alert("Coming soon...")}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillCard;

import { useNavigate } from "react-router-dom";
import { CardProps } from "../common/types";
import { resizeImage } from "../common/utils";

const Card = ({ to, item }: CardProps) => {
    const navigate = useNavigate();
    return (
        <div className="card">
            <img
                src={resizeImage(item.image)}
                className="card-img-top"
                alt={item.name}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-truncate">{item.description}</p>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <p className="card-text fw-bold">
                        <span className="fw-bolder">Highest Bid: </span>
                        {item.highest_bid < 1 ? 0 : item.highest_bid}$
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(to)}
                    >
                        Bid now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

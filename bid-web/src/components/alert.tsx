import { AlertProps } from "../common/types";

const Alert = ({type, message}: AlertProps) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
};

export default Alert
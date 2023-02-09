import { useEffect, useState } from "react";
import { useGetUserMutation, useUpdateUserMutation } from "../redux/queries";
import Alert from "./alert";
import Modal from "./modal";

const AutoBidModal = ({
    hide,
    onClose,
}: {
    hide: boolean;
    onClose?: () => void;
}) => {
    const [updateUser, { isError, isSuccess }] = useUpdateUserMutation();
    const [getUser] = useGetUserMutation();

    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
    const [amount, setAmount] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        getUser({}).then((data: any) => {
            setAmount(data?.data.data.autoBid.amount || 0);
            setPercentage(data?.data.data.autoBid.percentage || 0);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = () => {
        if(!amount || !percentage || percentage > 100  || percentage < 0) {
            setIsValid(false)
            return
        }

        updateUser({ amount, percentage, amountInitial: amount }).then((data: any) => {
            if (data?.data.success) {
                setIsValid(true)
                setTimeout(() => {
                    onClose?.()  
                }, 2000)
            }
               
        });
    };

    const _onClose = () => {
        setIsValid(undefined)
        onClose?.()
    }

    return (
        <>
            <Modal
            title={"Update auto bid parameters"}
                hide={hide}
                onSubmit={onSubmit}
                onClose={_onClose}
                content={
                    <>
                        {isValid  === false && (
                            <Alert
                                message="Form validation error"
                                type="danger"
                            ></Alert>
                        )}
                        {isError && (
                            <Alert
                                message="Server Error parameters could not be updated"
                                type="danger"
                            ></Alert>
                        )}
                        {(isSuccess && isValid !== false) && (
                            <Alert
                                message="Parameters updated successfully"
                                type="success"
                            ></Alert>
                        )}
                        <div className="mb-3">
                            <label className="form-label">
                                Auto bid max amount
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                value={amount}
                                onChange={(event) => {
                                    setAmount(parseInt(event.target.value));
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Notification percentage
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                value={percentage}
                                min={0}
                                max={100}
                                onChange={(event) => {
                                    setPercentage(parseInt(event.target.value));
                                }}
                            ></input>
                        </div>
                    </>
                }
            ></Modal>
        </>
    );
};

export default AutoBidModal;

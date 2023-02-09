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
            setAmount(data?.data.data.autoBid.amountInitial || 0);
            setPercentage(data?.data.data.autoBid.percentage || 0);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = () => {
        if(!amount || !percentage) {
            setIsValid(false)
            return
        }

        updateUser({ amount, percentage, amountInitial: amount }).then((data: any) => {
            if (data?.data.success) 
                setTimeout(() => {
                    setIsValid(undefined)
                    onClose?.()
                   
                }, 2000)
        });
    };

    return (
        <>
            <Modal
                hide={hide}
                onSubmit={onSubmit}
                onClose={onClose}
                content={
                    <>
                        {isValid && (
                            <Alert
                                message="All fields are required"
                                type="danger"
                            ></Alert>
                        )}
                        {isError && (
                            <Alert
                                message="Server Error parameters could not be updated"
                                type="danger"
                            ></Alert>
                        )}
                        {isSuccess && (
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

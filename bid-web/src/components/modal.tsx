const Modal = ({
    hide,
    content,
    submitText = "Submit",
    title,
    onSubmit,
    onClose,
}: {
    hide: boolean;
    content: JSX.Element | JSX.Element[] | string;
    title:string,
    submitText?: string;
    onSubmit?: () => void;
    onClose?: () => void;
}) => {
    if (hide) return <></>;
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            {title}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{content}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            {submitText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

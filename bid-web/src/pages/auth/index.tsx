import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/alert";
import DefaultLayout from "../../layouts/default";
import { useAuthUserMutation } from "../../redux/queries";
import { CREDENTIALS_STORE_KEY } from "../../common/confing";

const key = CREDENTIALS_STORE_KEY || "bid-web-credentials"

const Login = () => {
    const [authUser, { data, error, isError, isSuccess }] = useAuthUserMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                localStorage.setItem(
                    key,
                    JSON.stringify({...data?.data})
                );
                navigate("/");
            }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, navigate]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password && username) {
            setIsValid(true);
            authUser({ password: password, username: username });
        }

        setIsValid(false);
    };
    
    return (
        <DefaultLayout>
            <div className="container h-100">
                <div className="card my-5 h-75 border-0">
                    <div className="card-body">
                        <h5 className="card-title text-center">Login</h5>
                        {isValid && (
                            <Alert
                                message="password and username are required"
                                type="danger"
                            ></Alert>
                        )}
                        {isError && (
                            <Alert
                                message={
                                    (error as any).data?.error?.description
                                }
                                type="danger"
                            ></Alert>
                        )}
                        {isSuccess && (
                            <Alert
                                message="You have logged in successfully, you will be redirected to home page soon"
                                type="success"
                            ></Alert>
                        )}
                        <form
                            className="col-md-5 col-12 mx-auto my-3"
                            onSubmit={onSubmit}
                        >
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="form-control mb-3"
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                ></input>
                            </div>
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Login;

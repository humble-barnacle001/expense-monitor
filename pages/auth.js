import { useContext } from "react";
import { googleLogin } from "../actions/auth";
import { Context } from "../context";
import noAuth from "../components/NotLoggedRoute";

const Login = () => {
    const { dispatch } = useContext(Context);

    return (
        <div className='container'>
            <h1 className='mt-20 pt-10 text-center font-weight-light text-extra-letter-spacing text-light-dm'>
                Login / Sign-Up
            </h1>
            <div className='row'>
                <button
                    className='btn btn-primary btn-rounded btn-lg my-15 offset-1 col-10 col-md-6 offset-md-3'
                    onClick={() => {
                        dispatch({ type: "LOAD" });
                        googleLogin().catch((e) => {
                            if (e.message === "Google login failed")
                                dispatch({ type: "LOGOUT" });
                            else console.error(e);
                        });
                    }}
                >
                    <i className='fab fa-google'></i> Authenticate with Google
                </button>
            </div>
        </div>
    );
};

export default noAuth(Login);

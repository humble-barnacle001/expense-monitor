import { useContext } from "react";
import { Context } from "../context";
import Loader from "./Loader";
import Login from "../pages/auth";

const withAuth = (Component) => {
    const Auth = (props) => {
        const {
            state: { user, loading }
        } = useContext(Context);

        return loading ? (
            <Loader />
        ) : user ? (
            <Component {...props} />
        ) : (
            <Login />
        );
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;

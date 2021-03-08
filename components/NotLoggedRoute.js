import { useContext } from "react";
import { Context } from "../context";
import Loader from "./Loader";
import Home from "../pages/index";

const noAuth = (Component) => {
    const unAuth = (props) => {
        const {
            state: { user, loading }
        } = useContext(Context);

        return loading ? (
            <Loader />
        ) : !user ? (
            <Component {...props} />
        ) : (
            <Home />
        );
    };

    if (Component.getInitialProps) {
        unAuth.getInitialProps = Component.getInitialProps;
    }

    return unAuth;
};

export default noAuth;

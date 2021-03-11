import { useEffect, useContext } from "react";
import firebase from "../firebase";
import { Context } from "../context";
import { useRouter } from "next/router";

export default function FirebaseAuthState({ children }) {
    const {
        state: { user },
        dispatch
    } = useContext(Context);
    const router = useRouter();

    useEffect(() => {
        // Redirects to home page after each successful login only
        if (user && router.pathname === "/auth") router.push("/");
    }, [user]);

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(
            async (user) => {
                if (!user) {
                    firebase.firestore().terminate();
                    dispatch({
                        type: "LOGOUT"
                    });
                } else {
                    dispatch({
                        type: "LOGIN",
                        payload: { uid: user.uid }
                    });
                }
            },
            (e) => {
                console.log("Error in firebase state component", e);
                dispatch({
                    type: "LOGOUT"
                });
                window.halfmoon.initStickyAlert({
                    content: "Verification failed!!",
                    title: "Error!!",
                    alertType: "alert-danger",
                    fillType: "filled"
                });
            }
        );
    }, []);

    return <>{children}</>;
}

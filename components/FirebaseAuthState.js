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
                    dispatch({
                        type: "LOGOUT",
                        payload: null
                    });
                } else {
                    const { token } = await user.getIdTokenResult(true);
                    fetch(`/api/current-user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((r) =>
                            r.json().then((res) => {
                                if (res.status === 200) {
                                    dispatch({
                                        type: "LOGIN",
                                        payload: res.body.user
                                    });
                                } else
                                    throw new Error(
                                        res.body.errors
                                            ? res.body.errors
                                                  .map((err) => err.msg)
                                                  .toString()
                                            : "Unable to login user"
                                    );
                            })
                        )
                        .catch((err) => {
                            console.log("Error in fetch: ", err.message);
                            dispatch({
                                type: "LOGOUT",
                                payload: null
                            });
                        });
                }
            },
            (e) => {
                console.log("Error in firebase state component", e);
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

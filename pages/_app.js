import Head from "next/head";
import { useEffect } from "react";
import AddTransaction from "../components/addTransaction";
import FirebaseAuthState from "../components/FirebaseAuthState";
import Nav from "../components/nav";
import { Provider } from "../context";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const el = document.getElementById("themeToggler");
        function setThemeICon() {
            if (window.halfmoon) {
                if (halfmoon.readCookie("halfmoon_preferredMode"))
                    if (
                        halfmoon.readCookie("halfmoon_preferredMode") ===
                        "light-mode"
                    ) {
                        document.body.classList.remove("dark-mode");
                        el.innerHTML =
                            "<i class='far fa-moon' aria-hidden='true'></i>";
                    } else if (
                        halfmoon.readCookie("halfmoon_preferredMode") ===
                        "dark-mode"
                    ) {
                        document.body.classList.add("dark-mode");
                        el.innerHTML =
                            "<i class='far fa-sun' aria-hidden='true'></i>";
                    }
            } else setTimeout(() => setThemeICon(), 1000);
        }
        el.addEventListener("click", () => {
            halfmoon.toggleDarkMode();
            setThemeICon();
        });

        // Works only for reload or initial load
        setThemeICon();

        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("serviceWorker.js");
            });
        }
    }, []);

    return (
        <>
            <Head>
                <title>Expense Monitor</title>
            </Head>
            <Provider>
                <FirebaseAuthState>
                    <AddTransaction />
                    <div
                        className='page-wrapper with-navbar with-transitions'
                        data-sidebar-hidden='hidden'
                    >
                        <Nav />
                        <div className='sticky-alerts'></div>
                        <div className='content-wrapper'>
                            <Component {...pageProps} />
                        </div>
                    </div>
                </FirebaseAuthState>
            </Provider>
        </>
    );
}

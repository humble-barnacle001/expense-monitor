import { useEffect } from "react";
import FirebaseAuthState from "../components/FirebaseAuthState";
import Nav from "../components/nav";
import { Provider } from "../context";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const el = document.getElementById("themeToggler");
        function setThemeICon() {
            if (halfmoon.readCookie("halfmoon_preferredMode")) {
                if (
                    halfmoon.readCookie("halfmoon_preferredMode") ==
                    "light-mode"
                ) {
                    document.body.classList.remove("dark-mode");
                    el.innerHTML =
                        "<i class='far fa-moon' aria-hidden='true'></i>";
                } else if (
                    halfmoon.readCookie("halfmoon_preferredMode") == "dark-mode"
                ) {
                    document.body.classList.add("dark-mode");
                    el.innerHTML =
                        "<i class='far fa-sun' aria-hidden='true'></i>";
                }
            }
        }
        el.addEventListener("click", () => {
            halfmoon.toggleDarkMode();
            setThemeICon();
        });

        // Works only for reload or initial load
        setThemeICon();
    }, []);

    return (
        <Provider>
            <FirebaseAuthState>
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
    );
}

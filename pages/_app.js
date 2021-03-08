import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
    return (
        <div
            className='page-wrapper with-navbar with-transitions'
            data-sidebar-hidden='hidden'
        >
            <div className='content-wrapper'>
                <Component {...pageProps} />
            </div>
        </div>
    );
}

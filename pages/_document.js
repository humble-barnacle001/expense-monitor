import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='apple-touch-icon'
                        sizes='180x180'
                        href='/apple-touch-icon.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='32x32'
                        href='/favicon-32x32.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='16x16'
                        href='/favicon-16x16.png'
                    />
                    <link rel='manifest' href='/site.webmanifest' />
                    <link
                        rel='mask-icon'
                        href='/safari-pinned-tab.svg'
                        color='#5bbad5'
                    />
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <meta
                        name='apple-mobile-web-app-title'
                        content='Expense Monitor'
                    />
                    <meta name='application-name' content='Expense Monitor' />
                    <meta name='msapplication-TileColor' content='#2b5797' />
                    <meta
                        name='msapplication-config'
                        content='/browserconfig.xml'
                    />
                    <meta name='theme-color' content='#f2f2f2' />
                    <link
                        href='https://cdn.jsdelivr.net/npm/halfmoon@1.1.1/css/halfmoon-variables.min.css'
                        rel='stylesheet'
                    />
                    <script
                        async
                        defer
                        src='https://use.fontawesome.com/releases/v5.15.2/js/all.js'
                        integrity='sha384-vuFJ2JiSdUpXLKGK+tDteQZBqNlMwAjhZ3TvPaDfN9QmbPb7Q8qUpbSNapQev3YF'
                        crossOrigin='anonymous'
                    ></script>
                </Head>
                <body data-set-preferred-mode-onload='true'>
                    <Main />
                    <script
                        src='https://cdn.jsdelivr.net/npm/halfmoon@1.1.1/js/halfmoon.min.js'
                        async
                    />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

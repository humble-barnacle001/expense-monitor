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
                    <meta
                        name='description'
                        content='A simple UI to keep track of day to day expenses'
                    />
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
                    <meta name="msvalidate.01" content="2F551BD4884C16B06438AE4257100B31" />
                    <link
                        rel='stylesheet'
                        href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css'
                    />
                    <link
                        href='https://cdn.jsdelivr.net/gh/humble-barnacle001/halfmoon@v1.1.1/css/halfmoon-variables.min.css'
                        rel='stylesheet'
                    />
                </Head>
                <body data-set-preferred-mode-onload='true'>
                    <Main />
                    <script
                        src='https://cdn.jsdelivr.net/gh/humble-barnacle001/halfmoon@v1.1.1/js/halfmoon.min.js'
                        async
                    />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

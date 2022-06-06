import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com"
                        rel="preconnect"
                    />
                    <link
                        crossOrigin="anonymous"
                        href="https://fonts.gstatic.com"
                        rel="preconnect"
                    />
                    <link
                        // eslint-disable-next-line max-len
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Nunito:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

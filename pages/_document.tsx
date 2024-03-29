/* eslint-disable max-len */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

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

                    <Script
                        async
                        id="GA4"
                        src={
                            "https://www.googletagmanager.com/gtag/js?id='G-ZLZTYT67F0'"
                        }
                        strategy="afterInteractive"
                    />
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-ZLZTYT67F0');   
                    `,
                        }}
                        id="GA4_TAG"
                        strategy="afterInteractive"
                    />
                    <Script
                        async
                        crossOrigin="anonymous"
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4873328098096673"
                        strategy="afterInteractive"
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

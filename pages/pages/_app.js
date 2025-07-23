import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GA_TRACKING_ID, trackPageView } from '../lib/analytics';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    trackPageView(router.asPath);
    
    const handleRouteChange = (url) => trackPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('set', {'country': 'TG'});
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              custom_map: {'dimension1': 'country'},
              country: 'Togo'
            });
          `,
        }}
      />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

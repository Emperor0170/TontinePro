export const GA_TRACKING_ID = "UA-XXXXX-Y";

export function trackPageView(url) {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      custom_map: {'dimension1': 'country'},
      country: 'Togo'
    });
  }
}

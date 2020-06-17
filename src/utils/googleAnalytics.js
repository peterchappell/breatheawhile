export const GTAG_ID = 'UA-169628477-1';

export const sendPageView = (path, name) => {
  window.gtag('config', GTAG_ID, {
    'page_title' : name || 'home',
    'page_path': path || '/',
    'anonymize_ip': true,
  });
};
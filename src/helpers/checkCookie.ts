export const hasCsrfCookie = (): boolean => {
    return document.cookie.split(';').some((item) => item.trim().startsWith('XSRF-TOKEN='));
};
import '@awesome.me/webawesome/dist/components/dialog/dialog.js'


export const isNavigationClick = (e: MouseEvent, preventDefault = true) => {
    if (preventDefault) {
        e.preventDefault();
    }
    let anchor = e.composedPath().find((node) => (node as HTMLElement).tagName === 'A') as | HTMLAnchorElement | undefined;
    if (!anchor) {
        return undefined;
    }
    const href = anchor.href;
    if (href === '#') {
        return undefined;
    }
    return href;
}


export const onAnchorClick = (e: MouseEvent) => {
    if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
    ) {
        return;
    }
    const a = e.composedPath().find((el) => (el as HTMLElement).tagName === 'A') as | HTMLAnchorElement | undefined;
    if (!a || !a.href) return;
    const url = new URL(a.href);
    if (url.host !== window.location.host) return;
    if (a.hasAttribute('download') || a.href.includes('mailto:')) return;
    const target = a.getAttribute('target');
    if (target && target !== '' && target !== '_self') return;
    e.preventDefault();
    return url;
}

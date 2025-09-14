export const DEFAULT_PANEL = 'webthings';

export const getDefaultPanelUrlPath = () => {
    const defaultPath = window.localStorage.getItem('defaultPanel');
    return defaultPath ? JSON.parse(defaultPath) : DEFAULT_PANEL;
}




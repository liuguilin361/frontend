const STORED_STATE = [
    'dockedSidebar',
];

export function storeState(gateway: any) {
    try {
        STORED_STATE.forEach((key) => {
            const value = gateway[key];
            window.localStorage.setItem(key, JSON.stringify(value === undefined ? null : value));
        })

    } catch (err) {
        console.warn(
            "Cannot store state; Are you in private mode or is your storage full?"
        );
        // eslint-disable-next-line no-console
        console.error(err);
    }
}

export function getState() {
    const state: Record<string, any> = {};
    STORED_STATE.forEach((key) => {
        const storageItem = window.localStorage.getItem(key);
        if (storageItem) {
            state[key] = JSON.parse(storageItem);
        }
    })
    return state;
}

export function clearState() {
    window.localStorage.clear();
}

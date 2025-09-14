import {signal} from 'signal-utils';


export type SidebarMode = 'expanded' | 'collapsed' | 'hidden';

class SidebarState {

    // @ts-ignore
    @signal accessor mode: SidebarMode = "collapsed";

    get isExpanded() {
        return this.mode === 'expanded';
    }

    get isCollapsed() {
        return this.mode === 'collapsed';
    }

    get isHidden() {
        return this.mode === 'hidden';
    }

    expand() {
        this.mode = 'expanded';
    }

    collapse() {
        this.setMode('collapsed');
    }

    hide() {
        this.setMode('hidden');
    }

    toggle() {
        this.setMode(this.mode === 'expanded' ? 'collapsed' : 'expanded');
    }

    private setMode(mode: SidebarMode) {
        this.mode = mode;
    }

}

export const sidebarState = new SidebarState();

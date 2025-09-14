export interface MenuItem extends RouterParams {
    iconData?: string;
    imagePath?: string;
    title: string;
}

export interface RouterParams {
    name?: string;
    prefix?: string;
    path: string;
    elementName: string;
}

export interface Route {
    prefix: string;
    path: string;
}


export type Constructor<T = any> = new (...args: any[]) => T;


export interface Webthing {

}

export interface PanelInfo<T = Record<string, any> | null> {
    component_name: string;
    config: T;
    icon: string | null;
    title: string | null;
    url_path: string;
    config_panel_domain?: string;
}

export type Panels = Record<string, PanelInfo>;

export interface PanelState {
    defaultPanel: string;
    panels: Panels;
    panelUrl: string;
}


export interface Gateway {
    defaultPanel: string;
    panels: Panels;
    panelUrl: string;
}



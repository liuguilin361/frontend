import {
    mdiAccount,
    mdiAirFilter,
    mdiAlert,
    mdiAppleSafari,
    mdiBell,
    mdiBullhorn,
    mdiButtonPointer,
    mdiCalendar,
    mdiCalendarClock,
    mdiChatSleep,
    mdiClipboardList,
    mdiClock,
    mdiCog,
    mdiCommentAlert,
    mdiCounter,
    mdiEye,
    mdiFlower,
    mdiFormatListBulleted,
    mdiFormTextbox,
    mdiForumOutline,
    mdiGoogleAssistant,
    mdiGoogleCirclesCommunities,
    mdiHomeAutomation,
    mdiImage,
    mdiImageFilterFrames,
    mdiLightbulb,
    mdiMapMarkerRadius,
    mdiMicrophoneMessage,
    mdiPalette,
    mdiRayVertex,
    mdiRemote,
    mdiRobot,
    mdiRobotMower,
    mdiRobotVacuum,
    mdiScriptText,
    mdiSpeakerMessage,
    mdiStarFourPoints,
    mdiThermostat,
    mdiTimerOutline,
    mdiToggleSwitch,
    mdiWeatherPartlyCloudy,
    mdiWhiteBalanceSunny, mdiLoading,
} from "@mdi/js";


export const FALLBACK_DOMAIN_ICONS = {
    ai_task: mdiStarFourPoints,
    air_quality: mdiAirFilter,
    alert: mdiAlert,
    automation: mdiRobot,
    calendar: mdiCalendar,
    climate: mdiThermostat,
    configurator: mdiCog,
    conversation: mdiForumOutline,
    counter: mdiCounter,
    date: mdiCalendar,
    datetime: mdiCalendarClock,
    device_tracker: mdiAccount,
    google_assistant: mdiGoogleAssistant,
    group: mdiGoogleCirclesCommunities,
    homekit: mdiHomeAutomation,
    image_processing: mdiImageFilterFrames,
    image: mdiImage,
    input_boolean: mdiToggleSwitch,
    input_button: mdiButtonPointer,
    input_datetime: mdiCalendarClock,
    input_number: mdiRayVertex,
    input_select: mdiFormatListBulleted,
    input_text: mdiFormTextbox,
    lawn_mower: mdiRobotMower,
    light: mdiLightbulb,
    notify: mdiCommentAlert,
    number: mdiRayVertex,
    persistent_notification: mdiBell,
    person: mdiAccount,
    plant: mdiFlower,
    proximity: mdiAppleSafari,
    remote: mdiRemote,
    scene: mdiPalette,
    schedule: mdiCalendarClock,
    script: mdiScriptText,
    select: mdiFormatListBulleted,
    sensor: mdiEye,
    simple_alarm: mdiBell,
    siren: mdiBullhorn,
    stt: mdiMicrophoneMessage,
    sun: mdiWhiteBalanceSunny,
    text: mdiFormTextbox,
    time: mdiClock,
    timer: mdiTimerOutline,
    todo: mdiClipboardList,
    tts: mdiSpeakerMessage,
    vacuum: mdiRobotVacuum,
    wake_word: mdiChatSleep,
    weather: mdiWeatherPartlyCloudy,
    zone: mdiMapMarkerRadius,
    unknown: mdiMapMarkerRadius,
};
export type BasicState = "loading" | "error";

export interface StateIcons {
    default: string;

    get(state: string): string;
}

export abstract class BaseStateIcons implements StateIcons {
    private readonly predefined: Record<BasicState, string>; // 改为完整 Record
    private readonly data: Record<string, string>;
    public readonly default: string;

    protected constructor(
        data: Record<string, string>,
        defaultIconData: string
    ) {
        this.predefined = {
            'loading': mdiLoading,
            'error': mdiAlert,
        };
        this.data = data;
        this.default = defaultIconData;
    }

    get(state: string): string {
        // 1. 检查预定义状态（使用类型断言）
        if (this.isBasicState(state) && this.predefined[state]) {
            return this.predefined[state];
        }

        // 2. 检查动态键值对
        if (state in this.data) {
            return this.data[state];
        }

        // 3. 尝试匹配动态状态
        const dynamicIcon = this.getDynamicIcon(state);
        if (dynamicIcon !== undefined) {
            return dynamicIcon;
        }

        // 4. 回退到默认值
        return this.default;
    }


    private isBasicState(state: string): state is BasicState {
        return state in this.predefined;
    }

    protected getDynamicIcon(_state: string): string | undefined {
        return undefined;
    }
}








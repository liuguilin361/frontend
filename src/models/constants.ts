// 1. 定义常量对象（使用 `as const` 确保字面量类型推断）
export const Events = {
    CONNECTED: 'connected',
    DELETE_THING: 'deleteThing',
    DELETE_THINGS: 'deleteThings',
    EVENT_OCCURRED: 'eventOccurred',
    PROPERTY_STATUS: 'propertyStatus',
    REFRESH_THINGS: 'refreshThings',
    DELETE_GROUP: 'deleteGroup',
    DELETE_GROUPS: 'deleteGroups',
} as const;


// 1. 定义常量对象（使用 as const 确保字面量类型）
export const WoTOperation = {
    READ_PROPERTY: 'readProperty',
    WRITE_PROPERTY: 'writeProperty',
    INVOKE_ACTION: 'invokeAction',
    READ_ALL_PROPERTIES: 'readAllProperties',
    WRITE_MULTIPLE_PROPERTIES: 'writeMultipleProperties',
    SUBSCRIBE_ALL_EVENTS: 'subscribeAllEvents',
    UNSUBSCRIBE_ALL_EVENTS: 'unsubscribeAllEvents',
    QUERY_ALL_ACTIONS: 'queryAllActions',
} as const;

// 2. 自动推导联合类型
export type WoTOperation = typeof WoTOperation[keyof typeof WoTOperation];

export const Capabilities = {
    ALARM: 'Alarm',
    AIR_QUALITY_SENSOR: 'AirQualitySensor',
    BAROMETRIC_PRESSURE_SENSOR: 'BarometricPressureSensor',
    BINARY_SENSOR: 'BinarySensor',
    CAMERA: 'Camera',
    COLOR_CONTROL: 'ColorControl',
    COLOR_SENSOR: 'ColorSensor',
    DOOR_SENSOR: 'DoorSensor',
    ENERGY_MONITOR: 'EnergyMonitor',
    HUMIDITY_SENSOR: 'HumiditySensor',
    LEAK_SENSOR: 'LeakSensor',
    LIGHT: 'Light',
    LOCK: 'Lock',
    MOTION_SENSOR: 'MotionSensor',
    MULTI_LEVEL_SENSOR: 'MultiLevelSensor',
    MULTI_LEVEL_SWITCH: 'MultiLevelSwitch',
    ON_OFF_SWITCH: 'OnOffSwitch',
    PUSH_BUTTON: 'PushButton',
    SMART_PLUG: 'SmartPlug',
    SMOKE_SENSOR: 'SmokeSensor',
    TEMPERATURE_SENSOR: 'TemperatureSensor',
    THERMOSTAT: 'Thermostat',
    VIDEO_CAMERA: 'VideoCamera'
} as const;


// 1. 定义常量对象（使用 as const 确保字面量类型）
export const PropertyTypes = {
    ALARM: 'AlarmProperty',
    BAROMETRIC_PRESSURE: 'BarometricPressureProperty',
    BOOLEAN: 'BooleanProperty',
    BRIGHTNESS: 'BrightnessProperty',
    COLOR_MODE: 'ColorModeProperty',
    COLOR: 'ColorProperty',
    COLOR_TEMPERATURE: 'ColorTemperatureProperty',
    CONCENTRATION: 'ConcentrationProperty',
    CURRENT: 'CurrentProperty',
    DENSITY: 'DensityProperty',
    FREQUENCY: 'FrequencyProperty',
    HEATING_COOLING: 'HeatingCoolingProperty',
    HUMIDITY: 'HumidityProperty',
    IMAGE: 'ImageProperty',
    INSTANTANEOUS_POWER_FACTOR: 'InstantaneousPowerFactorProperty',
    INSTANTANEOUS_POWER: 'InstantaneousPowerProperty',
    LEAK: 'LeakProperty',
    LEVEL: 'LevelProperty',
    LOCKED: 'LockedProperty',
    MOTION: 'MotionProperty',
    ON_OFF: 'OnOffProperty',
    OPEN: 'OpenProperty',
    PUSHED: 'PushedProperty',
    SMOKE: 'SmokeProperty',
    TARGET_TEMPERATURE: 'TargetTemperatureProperty',
    TEMPERATURE: 'TemperatureProperty',
    THERMOSTAT_MODE: 'ThermostatModeProperty',
    VIDEO: 'VideoProperty',
    VOLTAGE: 'VoltageProperty',
} as const;



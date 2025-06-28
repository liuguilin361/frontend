export type  Capabilities =
    | 'Alarm'
    | 'AirQualitySensor'
    | 'BarometricPressureSensor'
    | 'BinarySensor'
    | 'Camera'
    | 'ColorControl'
    | 'ColorSensor'
    | 'DoorSensor'
    | 'EnergyMonitor'
    | 'HumiditySensor'
    | 'LeakSensor'
    | 'Light'
    | 'Lock'
    | 'MotionSensor'
    | 'MultiLevelSensor'
    | 'MultiLevelSwitch'
    | 'OnOffSwitch'
    | 'PushButton'
    | 'SmartPlug'
    | 'SmokeSensor'
    | 'TemperatureSensor'
    | 'Thermostat'
    | 'VideoCamera';


export type Properties =

    | 'AlarmProperty'
    | 'BarometricPressureProperty'
    | 'BooleanProperty'
    | 'BrightnessProperty'
    | 'ColorModeProperty'
    | 'ColorProperty'
    | 'ColorTemperatureProperty'
    | 'ConcentrationProperty'
    | 'CurrentProperty'
    | 'DensityProperty'
    | 'FrequencyProperty'
    | 'HeatingCoolingProperty'
    | 'HumidityProperty'
    | 'ImageProperty'
    | 'InstantaneousPowerFactorProperty'
    | 'InstantaneousPowerProperty'
    | 'LeakProperty'
    | 'LevelProperty'
    | 'LockedProperty'
    | 'MotionProperty'
    | 'OnOffProperty'
    | 'OpenProperty'
    | 'PushedProperty'
    | 'SmokeProperty'
    | 'TargetTemperatureProperty'
    | 'TemperatureProperty'
    | 'ThermostatModeProperty'
    | 'VideoProperty'
    | 'VoltageProperty';

/**
 * Represents a Thing, following the provided Rust struct definition and Serde attributes.
 * Includes handling for renamed fields, optional fields, default values, and flattened extra properties.
 */
export interface NewThing {
    id: string;
    title: string;
    '@type': string[];
    '@context': string | string[];
    properties?: Record<string, Property>;
    actions?: Record<string, Action>;
    connected?: boolean;
    selectedCapability?: string;

    // Allows for arbitrary additional properties not explicitly defined above.
    [key: string]: JsonValue; // Note: This index signature means ALL properties, including the named ones, must be assignable to JsonValue. This is generally fine when flattening.
}

// Interface for Thing and Group descriptions
export interface ThingDescription {
    id: string;
    title: string;
    '@context': string | string[];
    '@type'?: string | string[];
    href?: string;
    description?: string;
    profile?: string | string[];
    selectedCapability: string;
    connected: boolean;
    properties: Record<string, PropertyDescription>,
    groupId?: string | null;

    [key: string]: any;
}

// export interface ThingDescription {
//     id: string;
//     title: string;
//     '@context': string | string[];
//     '@type'?: string | string[];
//     profile?: string | string[];
//     description?: string;
//     base?: string;
//     baseHref?: string;
//     href?: string;
//     properties?: Record<string, PropertySchema>;
//     actions?: Record<string, ActionSchema>;
//     events?: Record<string, EventSchema>;
//     links?: Link[];
//     forms?: Form[];
//     floorplanVisibility?: boolean;
//     floorplanX?: number;
//     floorplanY?: number;
//     layoutIndex?: number;
//     selectedCapability?: string;
//     iconHref?: string | null;
//     iconData?: IconData;
//     security: string;
//     securityDefinitions: SecurityDefinition;
//     groupId?: string | null;
// }

export interface AddonDescription {
    id: string;
    name: string;
    description: string;
    author: string;
    homepage_url: string;
    license_url: string;
    primary_type: string;
    version: string;
    url: string;
    checksum: string;
    language_name: string;
    installed: boolean;
}


export interface AddonManifest {
    id: string;
    author: string,
    name: string;
    description: string;
    homepage_url: string;
    version: string;
    primary_type: string;
    exec: string;
    content_scripts?: ContentScript[];
    web_accessible_resources?: string[];
    manifest_version: number;
    enabled: boolean;
}


export interface GatewaySpecificSettings {
    webthings: WebthingsSettings;
}

export interface WebthingsSettings {
    exec?: string;
    strict_min_version: string;
    strict_max_version: string;
    primary_type: 'adapter' | 'notifier' | 'extension';
}

export interface Options {
    default?: Record<string, unknown>;
    schema: Record<string, unknown>;
}

interface ContentScript {
    css?: string[];
    js?: string[];
}


export type PropertyValueType =
    'string' |
    'number' |
    'integer' |
    'boolean' |
    'object' |
    'array' |
    'null';

export interface ExtensionResource {
    content_scripts: { css: string[], js?: string[] }[];
    resources: string[];
}


export interface GroupDescription {
    id: string;
    title: string;
    href: string;
    layoutIndex: number;
}

/**
 * Placeholder for the Link type.
 * Replace with the actual definition of the Link interface/type.
 */
export interface Link {
    // Define properties of Link here
    href: string; // Example property
    rel?: string; // Example property
    type?: string; // Example property
    mediaType?: string,
}

/**
 * Placeholder for the Form type.
 * Replace with the actual definition of the Form interface/type.
 */
export interface Form {
    // Define properties of Form here
    href: string; // Example property
    contentType?: string; // Example property
    op?: any; // Example property (e.g., "readproperty", "writeproperty", "invokeaction")
    // ... other form properties
}


/**
 * Represents a Property of a Thing, following the provided Rust struct definition and Serde attributes.
 */
export interface Property {
    // #[serde(rename = "@type")]
    '@type': string;
    name: string;
    title: string;
    unit: string;
    // #[serde(rename = "type")]
    type: PropertyValueType;
    // #[serde(rename = "enum", default)]
    enum?: JsonValue[]; // Optional due to default
    readOnly: boolean; // Renamed from read_only
    minimum?: number; // Optional due to Option
    maximum?: number; // Optional due to Option
    multipleOf?: number; // Optional due to Option, renamed from multiple_of
    // #[serde(default)]
    forms?: Form[]; // Optional due to default
    value: JsonValue;
}

/**
 * Represents an Action of a Thing, following the provided Rust struct definition and Serde attributes.
 */
export interface Action {
    /// The type of the action
    // #[serde(rename = "@type", skip_serializing_if = "Option::is_none")]
    '@type'?: string; // Optional due to Option and skip_serializing_if
    /// The title of the Action
    // #[serde(default)]
    title?: string; // Optional due to default
    /// Description of the Action
    // #[serde(default)]
    description?: string; // Optional due to default
    // #[serde(skip_serializing_if = "Option::is_none")]
    links?: Link[]; // Optional due to Option and skip_serializing_if
    // #[serde(skip_serializing_if = "Option::is_none")]
    input?: JsonValue; // Optional due to Option and skip_serializing_if
    // #[serde(skip_serializing_if = "Option::is_none")] parameters? - Missing in Rust but common in actions? Added input based on Rust code.
}


export const CONNECTED = 'connected';
export const DELETE_THING = 'deleteThing';
export const DELETE_THINGS = 'deleteThings';
export const EVENT_OCCURRED = 'eventOccurred';
export const PROPERTY_STATUS = 'propertyStatus';
export const REFRESH_THINGS = 'refreshThings';
export const DELETE_GROUP = 'deleteGroup';
export const DELETE_GROUPS = 'deleteGroups';

export const ThingFormat = {
  INTERACTIVE: 0,
  EXPANDED: 1,
  LINK_ICON: 2,
};

export const WoTOperation = {
  READ_PROPERTY: 'readproperty',
  WRITE_PROPERTY: 'writeproperty',
  INVOKE_ACTION: 'invokeaction',
  READ_ALL_PROPERTIES: 'readallproperties',
  WRITE_MULTIPLE_PROPERTIES: 'writemultipleproperties',
  SUBSCRIBE_ALL_EVENTS: 'subscribeallevents',
  UNSUBSCRIBE_ALL_EVENTS: 'unsubscribeallevents',
  QUERY_ALL_ACTIONS: 'queryallactions',
};

export enum PropertyEnum {
  AlarmProperty = 'AlarmProperty',
  BarometricPressureProperty = 'BarometricPressureProperty',
  BooleanProperty = 'BooleanProperty',
  BrightnessProperty = 'BrightnessProperty',
  ColorModeProperty = 'ColorModeProperty',
  ColorProperty = 'ColorProperty',
  ColorTemperatureProperty = 'ColorTemperatureProperty',
  ConcentrationProperty = 'ConcentrationProperty',
  CurrentProperty = 'CurrentProperty',
  DensityProperty = 'DensityProperty',
  FrequencyProperty = 'FrequencyProperty',
  HeatingCoolingProperty = 'HeatingCoolingProperty',
  HumidityProperty = 'HumidityProperty',
  ImageProperty = 'ImageProperty',
  InstantaneousPowerFactorProperty = 'InstantaneousPowerFactorProperty',
  InstantaneousPowerProperty = 'InstantaneousPowerProperty',
  LeakProperty = 'LeakProperty',
  LevelProperty = 'LevelProperty',
  LockedProperty = 'LockedProperty',
  MotionProperty = 'MotionProperty',
  OnOffProperty = 'OnOffProperty',
  OpenProperty = 'OpenProperty',
  PushedProperty = 'PushedProperty',
  SmokeProperty = 'SmokeProperty',
  TargetTemperatureProperty = 'TargetTemperatureProperty',
  TemperatureProperty = 'TemperatureProperty',
  ThermostatModeProperty = 'ThermostatModeProperty',
  VideoProperty = 'VideoProperty',
  VoltageProperty = 'VoltageProperty',
}

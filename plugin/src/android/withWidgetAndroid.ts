import { ConfigPlugin } from "@expo/config-plugins";

import { withWidgetAppBuildGradle } from "./withWidgetAppBuildGradle";
import { withWidgetManifest } from "./withWidgetManifest";
import { withWidgetProjectBuildGradle } from "./withWidgetProjectBuildGradle";
import { withWidgetSourceCodes } from "./withWidgetSourceCodes";
import { Props } from "..";

export const withWidgetAndroid: ConfigPlugin<Props> = (
  config,
  { widgetName, ios: { appGroupIdentifier } }
) => {
  config = withWidgetManifest(config, { widgetName });
  config = withWidgetProjectBuildGradle(config);
  config = withWidgetAppBuildGradle(config);
  config = withWidgetSourceCodes(config, {
    widgetName,
    appGroupName: appGroupIdentifier,
  });
  return config;
};

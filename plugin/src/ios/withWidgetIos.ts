import { ConfigPlugin } from "@expo/config-plugins";
import { withWidgetEntitlements } from "./withWidgetEntitlements";
import { withWidgetSourceFiles } from "./withWidgetSourceFiles";
import { withWidgetPlist } from "./withWidgetPlist";
import { withWidgetXcodeTarget } from "./withWidgetXcodeTarget";
import { Props } from "..";

// make defaults
export const DEFAULT_WIDGET_TARGET_NAME = "widget";
export const DEFAULT_TOP_LEVEL_FILES = ["Assets.xcassets", "widget.swift"];

export const withWidgetIos: ConfigPlugin<Props> = (
  config,
  { widgetName, ios }
) => {
  const { appGroupIdentifier, devTeamId } = ios;
  const targetName = widgetName ?? DEFAULT_WIDGET_TARGET_NAME;
  const topLevelFiles = ios.topLevelFiles ?? DEFAULT_TOP_LEVEL_FILES;

  config = withWidgetEntitlements(config, { targetName, appGroupIdentifier });
  config = withWidgetSourceFiles(config, { targetName, appGroupIdentifier });
  config = withWidgetPlist(config, { targetName });
  config = withWidgetXcodeTarget(config, {
    devTeamId,
    targetName,
    topLevelFiles,
  });
  return config;
};

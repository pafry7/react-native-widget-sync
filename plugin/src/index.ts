import { ConfigPlugin, withPlugins } from "@expo/config-plugins";

import { withWidgetAndroid } from "./android/withWidgetAndroid";
import { withWidgetIos } from "./ios/withWidgetIos";

export interface Props {
  widgetName: string;
  ios: {
    devTeamId: string;
    appGroupIdentifier: string;
    topLevelFiles?: string[];
  };
}

const withAppConfigs: ConfigPlugin<Props> = (config, options) => {
  return withPlugins(config, [
    [withWidgetAndroid, options],
    [withWidgetIos, options],
  ]);
};

export default withAppConfigs;

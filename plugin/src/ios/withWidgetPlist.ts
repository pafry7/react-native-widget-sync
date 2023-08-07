import {
  ConfigPlugin,
  InfoPlist,
  withDangerousMod,
} from "@expo/config-plugins";
import plist from "@expo/plist";
import * as fs from "fs";
import * as path from "path";

interface Props {
  targetName: string;
}

export const withWidgetPlist: ConfigPlugin<Props> = (
  config,
  { targetName }
) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const extensionRootPath = path.join(
        config.modRequest.platformProjectRoot,
        targetName
      );
      const extensionPlistPath = path.join(extensionRootPath, "Info.plist");

      const extensionPlist: InfoPlist = {
        NSExtension: {
          NSExtensionPointIdentifier: "com.apple.widgetkit-extension",
        },
      };

      await fs.promises.mkdir(path.dirname(extensionPlistPath), {
        recursive: true,
      });
      await fs.promises.writeFile(
        extensionPlistPath,
        plist.build(extensionPlist)
      );

      return config;
    },
  ]);
};

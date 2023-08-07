import {
  ConfigPlugin,
  InfoPlist,
  withXcodeProject,
} from "@expo/config-plugins";
import plist from "@expo/plist";
import * as fs from "fs";
import * as path from "path";

interface Props {
  appGroupIdentifier: string;
  targetName: string;
}

export const withWidgetEntitlements: ConfigPlugin<Props> = (
  config,
  { appGroupIdentifier, targetName }
) => {
  return withXcodeProject(config, async (config) => {
    const entitlementsFilename = `${targetName}.entitlements`;
    const extensionRootPath = path.join(
      config.modRequest.platformProjectRoot,
      targetName
    );
    const entitlementsPath = path.join(extensionRootPath, entitlementsFilename);

    const extensionEntitlements: InfoPlist = {
      "com.apple.security.application-groups": [appGroupIdentifier],
    };

    // create file
    await fs.promises.mkdir(path.dirname(entitlementsPath), {
      recursive: true,
    });
    await fs.promises.writeFile(
      entitlementsPath,
      plist.build(extensionEntitlements)
    );

    // add file to extension group
    const proj = config.modResults;
    const targetUuid = proj.findTargetKey(targetName);
    const groupUuid = proj.findPBXGroupKey({ name: targetName });

    proj.addFile(entitlementsFilename, groupUuid, {
      target: targetUuid,
      lastKnownFileType: "text.plist.entitlements",
    });

    // update build properties
    proj.updateBuildProperty(
      "CODE_SIGN_ENTITLEMENTS",
      `${targetName}/${entitlementsFilename}`,
      null,
      targetName
    );

    return config;
  });
};

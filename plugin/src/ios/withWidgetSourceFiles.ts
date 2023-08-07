import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

interface Props {
  targetName: string;
  appGroupIdentifier: string;
}

export const withWidgetSourceFiles: ConfigPlugin<Props> = (
  config,
  { targetName, appGroupIdentifier }
) => {
  return withXcodeProject(config, async (config) => {
    const extensionRootPath = path.join(
      config.modRequest.platformProjectRoot,
      targetName
    );
    const projectPath = config.modRequest.projectRoot;
    const widgetSourceDirPath = path.join(projectPath, targetName, "ios");
    if (!fs.existsSync(widgetSourceDirPath)) {
      await fs.promises.mkdir(widgetSourceDirPath, { recursive: true });
      const widgetStaticSourceDirPath = path.join(__dirname, "static");
      await fs.promises.copyFile(
        path.join(widgetStaticSourceDirPath, "widget.swift"),
        path.join(widgetSourceDirPath, "widget.swift")
      );
      await fs.promises.cp(
        path.join(widgetStaticSourceDirPath, "Assets.xcassets"),
        path.join(widgetSourceDirPath, "Assets.xcassets"),
        { recursive: true }
      );

      const widgetSourceFilePath = path.join(
        widgetSourceDirPath,
        "widget.swift" // use to targetName
      );
      const content = fs.readFileSync(widgetSourceFilePath, "utf8");
      const newContent = content.replace(
        /group.com.example.widget/,
        `${appGroupIdentifier}`
      );

      fs.writeFileSync(widgetSourceFilePath, newContent);
    }
    await fs.promises.mkdir(extensionRootPath, { recursive: true });
    await fs.promises.copyFile(
      path.join(widgetSourceDirPath, "widget.swift"),
      path.join(extensionRootPath, "widget.swift")
    );
    await fs.promises.cp(
      path.join(widgetSourceDirPath, "Assets.xcassets"),
      path.join(extensionRootPath, "Assets.xcassets"),
      { recursive: true }
    );

    const proj = config.modResults;
    const targetUuid = proj.findTargetKey(targetName);
    const groupUuid = proj.findPBXGroupKey({ name: targetName });

    if (!targetUuid) {
      return Promise.reject(null);
    }
    if (!groupUuid) {
      return Promise.reject(null);
    }

    proj.addSourceFile(
      "widget.swift",
      {
        target: targetUuid,
      },
      groupUuid
    );

    return config;
  });
};

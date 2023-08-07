/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs";
import path from "path";

export const withWidgetSourceCodes: ConfigPlugin<{
  widgetName: string;
  appGroupName: string;
}> = (config, { widgetName, appGroupName }) => {
  return withDangerousMod(config, [
    "android",
    async (newConfig) => {
      const projectRoot = newConfig.modRequest.projectRoot;
      const platformRoot = newConfig.modRequest.platformProjectRoot;
      const widgetDir = path.join(projectRoot, widgetName);
      await copyResourceFiles(widgetDir, platformRoot);

      const packageName = config.android?.package;
      prepareSourceCodes(
        widgetDir,
        platformRoot,
        packageName!,
        widgetName,
        appGroupName
      );

      return newConfig;
    },
  ]);
};

async function copyResourceFiles(
  widgetSourceDir: string,
  platformRoot: string
) {
  const source = path.join(widgetSourceDir, "android", "src", "main", "res");
  const resDest = path.join(platformRoot, "app", "src", "main", "res");

  if (!fs.existsSync(widgetSourceDir)) {
    const templateFolder = path.join(__dirname, "static", "res");
    console.log({ templateFolder, source });
    await fs.promises.cp(templateFolder, source, { recursive: true });
  }
  await fs.promises.cp(source, resDest, { recursive: true });
}

async function prepareSourceCodes(
  widgetSourceDir: string,
  platformRoot: string,
  packageName: string,
  widgetClassName: string,
  appGroupName: string
) {
  const packageDirPath = packageName.replace(/\./g, "/");
  const source = path.join(
    widgetSourceDir,
    `android/src/main/java/package_name`
  );
  const widgetSourceFilePath = path.join(source, `${widgetClassName}.kt`);
  if (!fs.existsSync(source)) {
    const templateFolder = path.join(__dirname, "static", "java/package_name");
    await fs.promises.cp(templateFolder, source, { recursive: true });
    await fs.promises.rename(
      path.join(source, "SampleWidget.kt"),
      widgetSourceFilePath
    );
    const content = fs.readFileSync(widgetSourceFilePath, "utf8");
    let newContent = content.replace(/SampleWidget/, `${widgetClassName}`);
    newContent = newContent.replace(
      /group.com.example.widget/,
      `${appGroupName}`
    );

    fs.writeFileSync(widgetSourceFilePath, newContent);
  }

  const dest = path.join(platformRoot, "app/src/main/java", packageDirPath);
  const widgetDestFilePath = path.join(dest, `${widgetClassName}.kt`);

  await fs.promises.cp(source, dest, { recursive: true });

  const content = fs.readFileSync(widgetDestFilePath, "utf8");
  const newContent = content.replace(
    /^package .*\s/,
    `package ${packageName}\n`
  );
  fs.writeFileSync(widgetDestFilePath, newContent);
}

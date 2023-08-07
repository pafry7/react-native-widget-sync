import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
} from "@expo/config-plugins";

export const withWidgetManifest: ConfigPlugin<{ widgetName: string }> = (
  config,
  { widgetName }
) => {
  return withAndroidManifest(config, async (newConfig) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      newConfig.modResults
    );
    const widgetReceivers = await buildWidgetsReceivers(widgetName);
    mainApplication.receiver = widgetReceivers;

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      "WIDGET_NAME",
      widgetName
    );

    return newConfig;
  });
};

async function buildWidgetsReceivers(widgetName: string) {
  return [
    {
      $: {
        "android:name": `.${widgetName}`,
        "android:exported": "false" as const,
      },
      "intent-filter": [
        {
          action: [
            {
              $: {
                "android:name": "android.appwidget.action.APPWIDGET_UPDATE",
              },
            },
          ],
        },
      ],
      "meta-data": [
        {
          $: {
            "android:name": "android.appwidget.provider",
            "android:resource": "@xml/sample_widget_info",
          },
        },
      ],
    },
  ];
}

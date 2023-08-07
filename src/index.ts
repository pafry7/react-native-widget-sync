// Import the native module. On web, it will be resolved to RefreshWidget.web.ts
// and on native platforms to RefreshWidget.ts
import RefreshWidgetModule from "./ReactNativeWidgetSyncModule";

export function reloadAll(): void {
  return RefreshWidgetModule.reloadAll();
}
export function setItem(appGroup: string, key: string, value: any): void;
export function setItem(
  appGroup: string,
  key?: string,
  value?: any
): (key: string, value: any) => void;

export function setItem(appGroup: string, key?: string, value?: any) {
  if (typeof key !== "undefined" && typeof value !== "undefined") {
    return RefreshWidgetModule.setItem(value, key, appGroup);
  }
  return (key: string, value: any) =>
    RefreshWidgetModule.setItem(value, key, appGroup);
}

export function getItem(appGroup: string, key: string): string;
export function getItem(
  appGroup: string,
  key?: string
): (key: string) => string;

export function getItem(appGroup: string, key?: string) {
  if (typeof key !== "undefined") {
    return RefreshWidgetModule.getItem(key, appGroup);
  }
  return (key: string) => RefreshWidgetModule.getItem(key, appGroup);
}

import ExpoModulesCore
import WidgetKit

internal class VersionException: Exception {
    override var reason: String {
        "Function is available only on iOS 14 and higher"
    }
}

public class ReactNativeWidgetSyncModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('RefreshWidget')` in JavaScript.
        Name("ReactNativeWidgetSync")
        
        Function("reloadAll") { () -> Void in
            if #available(iOS 14, *) {
                WidgetCenter.shared.reloadAllTimelines()
            } else {
                throw VersionException()
            }
        }
        
        Function("setItem") { (value: String, key: String, appGroup: String) -> Void in
            if let userDefaults = UserDefaults(suiteName: appGroup){
                userDefaults.set(value, forKey: key )
            }
        }
        
        Function("getItem") { ( key: String, appGroup: String) -> String? in
            if let userDefaults = UserDefaults(suiteName: appGroup){
                return userDefaults.string(forKey: key)
            }
            return nil
        }
        
    }
}

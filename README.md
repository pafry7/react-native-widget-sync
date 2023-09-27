> The development of the npm module has been temporarily postponed.

# react-native-widget-sync

The module allows refreshing and sharing of data between the main application and the widget.

## Usage in expo managed project

See https://github.com/pafry7/widget-expo-example

## Setup

1. Clone repo
```
git clone git@github.com:pafry7/react-native-widget-sync.git
```

1. Install dependencies

```
cd react-native-widget-sync 
yarn
cd example
yarn
```

2. Configure expo plugin in `/example`
   Add in `app.json`

```
 "ios": {
     ...
      "entitlements": {
        "appGroupIdentifier": <app group>
      },
 },
 "plugins": {
   [
        "react-native-widget-sync",
        {
          "widgetName": <Your widget name>
          "ios": {
            "devTeamId": <Your apple team identifier>
            "appGroupIdentifier": <app group>"
          }
        }
      ],
 }

```
## Running the example

Run 

```
npx expo prebuild
```

and then

```
npx expo run:[ios|android]
```

## How does it work

When you run expo prebuild for the first time, it generates a folder containing the source files for widgets and then copies them to both the ios and android directories. Remember to run prebuild each time you make changes to the widget's source files.

## Video

https://github.com/pafry7/react-native-widget-sync/assets/41058200/f0dcf601-31a3-4ead-9eaf-0ae8a67346c6


## Sources
- https://github.com/gaishimo/eas-widget-example
- https://github.com/matallui/demo-screen-capture


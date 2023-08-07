> It was supposed to be the npm module - work is postponed.

# react-native-widget-sync

The module allows refreshing and sharing of data between the main application and the widget.


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

2. Configure expo plugin
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
## Running

Run 

```
npx expo prebuild
```

and then

```
npx expo run:[ios|android]
```

## How does it work

Running `expo prebuild` for the first time, creates a folder containing widgets' source files and copies them to the `ios` and `android` folders. You have to run `prebuild` every time you change widget's source files.

## Video
<video src="./demo.mov" width=180/>

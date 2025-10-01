export default {
  "expo": {
    "name": "Runky",
    "slug": "dnd-iOS",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "dndios",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "enabled": true,
      "checkAutomatically": "ON_LOAD",
      "fallbackToCacheTimeout": 0
    },
    "ios": {
      "bundleIdentifier": "com.runky.dnd",
      "googleServicesFile": "./GoogleService-Info.plist",
      "supportsTablet": true,
      "infoPlist": {
      "ITSAppUsesNonExemptEncryption": false,
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true,
          "NSAllowsLocalNetworking": true,
          "ITSAppUsesNonExemptEncryption": false,
          "NSExceptionDomains": {
            "localhost": {
              "NSExceptionAllowsInsecureHTTPLoads": true,
              "NSExceptionMinimumTLSVersion": "1.0",
              "NSExceptionRequiresForwardSecrecy": false
            }
          },
        },
          "NSLocationWhenInUseUsageDescription": "러닝 활동을 추적하고 경로를 기록하기 위해 위치 정보가 필요합니다.",
          "NSLocationAlwaysAndWhenInUseUsageDescription": "백그라운드에서도 러닝 활동을 연속적으로 추적하기 위해 위치 정보가 필요합니다.",
          "NSLocationAlwaysUsageDescription": "백그라운드에서도 러닝 활동을 연속적으로 추적하기 위해 위치 정보가 필요합니다.",
          "NSLocationUsageDescription": "러닝 활동을 추적하고 경로를 기록하기 위해 위치 정보가 필요합니다.",
          "isIosBackgroundLocationEnabled": true,
          "UIBackgroundModes": ["location"]
      }
    },
    "android": {
      "useNextNotificationsApi": true,
    
      "package": "com.runky.dnd",
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
   
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_MEDIA_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_MEDIA_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      ],
      "edgeToEdgeEnabled": true,
    },
    "extra": {
      "eas": {
        "projectId": "fa2044ae-6823-4e2c-8376-e7aa23b5f8d5"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "백그라운드에서도 러닝 활동을 연속적으로 추적하기 위해 위치 정보가 필요합니다.",
          "locationWhenInUsePermission": "러닝 활동을 추적하고 경로를 기록하기 위해 위치 정보가 필요합니다.",
          "locationAlwaysPermission": "백그라운드에서도 러닝 활동을 연속적으로 추적하기 위해 위치 정보가 필요합니다.",
          "isIosBackgroundLocationEnabled": true,
          "isAndroidBackgroundLocationEnabled": true
        }
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#000000"
        }
      ],
      "expo-updates",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
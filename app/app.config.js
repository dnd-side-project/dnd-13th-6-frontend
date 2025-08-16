export default {
  "expo": {
    "name": "dnd-iOS",
    "slug": "dnd-iOS",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "dndios",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "ios": {
      "bundleIdentifier": "com.yoojunho.dnd",
      "supportsTablet": true,
      "infoPlist": {
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true,
          "NSExceptionDomains": {
            "localhost": {
              "NSExceptionAllowsInsecureHTTPLoads": true,
              "NSExceptionMinimumTLSVersion": "1.0",
              "NSExceptionRequiresForwardSecrecy": false
            }
          }
        },
        "NSLocationWhenInUseUsageDescription": "앱 사용 중 위치를 사용합니다.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "백그라운드에서도 위치를 사용합니다.",
        "UIBackgroundModes": ["location"]
      }
    },
    "android": {
      "package": "com.yoojunho.dnd",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#000"
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "$(PRODUCT_NAME)는 위치 정보 권한을 필요로 합니다."
        }
      ],
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "EXPO_PUBLIC_WEBVIEW_URL": process.env.EXPO_PUBLIC_WEBVIEW_URL,
      "eas": {
        "projectId": "fa2044ae-6823-4e2c-8376-e7aa23b5f8d5"
      }
    }
  }
}

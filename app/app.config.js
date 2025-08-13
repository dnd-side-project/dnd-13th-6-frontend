export default {
  "expo": {
    "name": "dnd-iOS",
    "slug": "dnd-iOS",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "dndios",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
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
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
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
    }
  }
}

# yarukoto

On `@types/react` resolutions:
At the moment of developing this project, Expo SDK latest version (45.0.0) is built on React Native 0.68.2 (https://docs.expo.dev/versions/latest/#each-expo-sdk-version-depends-on-a). This version of React Native is built on React 17.

However, some packages will be dependant on React 18 (and consequently `@react/types`), causing typing errors. In order to avoid this, this line is added in `package.json` which overrides the version of `@react/types` used for every dependency in the project:

```
"resolutions": {
  "@types/react": "~17.0.21"
  },
```

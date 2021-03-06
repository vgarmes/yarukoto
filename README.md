# yarukoto

A to-do list app with animations built on React Native and Expo. This project was coded along [craftzdog's tutorial](https://github.com/craftzdog/react-native-animated-todo).

## Note on installing dependencies

If starting this project from scratch, it is recommended to install `react-native-gesture-handler` and `react-native-reanimated` using the `expo install` command. This is to avoid incompatibilities with React Navigation (https://reactnavigation.org/docs/drawer-navigator/):
`expo install react-native-gesture-handler react-native-reanimated`

## Note On `@types/react` resolutions:

At the moment of developing this project, Expo SDK latest version was 45.0.0 which depends on React Native 0.68.2 (https://docs.expo.dev/versions/latest/#each-expo-sdk-version-depends-on-a). This version of React Native is built on React 17.

However, some packages will be dependant on React 18 (and consequently `@react/types`), causing typing errors. In order to avoid this, this line is added in `package.json` which overrides the version of `@react/types` used for every dependency in the project:

```
"resolutions": {
  "@types/react": "~17.0.21"
  },
```

It is expected that the future release Expo SDK 46 will depend on React Native 0.69 (which is built on React 18), resolving this issue.

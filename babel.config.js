module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "nativewind/babel",
    "react-native-paper/babel",
    ["module:react-native-dotenv", {
      moduleName: "@env",
      path: ".env",
    }],
  ],
};

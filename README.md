# AppHeader Component for React Native

The `AppHeader` component is a customizable and animated header component designed for React Native applications. It supports dynamic titles, interactive buttons, and integrations with React Navigation.

## Features

- Customizable left and right components/icons.
- Dynamic header title based on the current route or a custom title.
- Animated button press effects using `react-native-reanimated`.
- Integrates seamlessly with React Navigation's Drawer and other navigators.
- Flexible styling options for the header and its elements.

---

## Installation

To use the `AppHeader` component in your project, ensure you have the following dependencies installed:

```bash
npm i expo-header
```

Please ensure that those packages are installed.

```bash
react-navigation @react-navigation/native react-native-reanimated
```

# AppHeader Component

## Usage

Here's an example of how to use the `AppHeader` component in your project:

```tsx
import React from "react";
import { View, Text } from "react-native";
import AppHeader from "expo-header";

const ExampleScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        headerTitle="Home"
        onLeftPress={() => console.log("Left button pressed!")}
        onRightPress={() => console.log("Right button pressed!")}
        leftIcon="menu"
        rightIcon="notifications"
      />
      <Text style={{ flex: 1, textAlign: "center", marginTop: 20 }}>
        Welcome to the example screen!
      </Text>
    </View>
  );
};

export default ExampleScreen;
```

## Props

### AppHeader

| Prop Name           | Type              | Default Value     | Description                                                           |
| ------------------- | ----------------- | ----------------- | --------------------------------------------------------------------- |
| `headerTitle`       | `string`          | Current route     | Title of the header. If not provided, the current route name is used. |
| `onLeftPress`       | `() => void`      | Opens drawer      | Function to execute when the left button is pressed.                  |
| `onRightPress`      | `() => void`      | Alerts a message  | Function to execute when the right button is pressed.                 |
| `leftIcon`          | `string`          | `"menu"`          | Icon name for the left button.                                        |
| `rightIcon`         | `string`          | `undefined`       | Icon name for the right button.                                       |
| `leftIconFamily`    | `string`          | `"MaterialIcons"` | Icon family for the left button.                                      |
| `rightIconFamily`   | `string`          | `"MaterialIcons"` | Icon family for the right button.                                     |
| `leftIconSize`      | `number`          | `28`              | Size of the left button icon.                                         |
| `rightIconSize`     | `number`          | `28`              | Size of the right button icon.                                        |
| `leftIconColor`     | `string`          | `"#007AFF"`       | Color of the left button icon.                                        |
| `rightIconColor`    | `string`          | `"#007AFF"`       | Color of the right button icon.                                       |
| `LeftComponent`     | `React.Component` | `undefined`       | Custom component for the left side. Overrides leftIcon props.         |
| `RightComponent`    | `React.Component` | `undefined`       | Custom component for the right side. Overrides rightIcon props.       |
| `headerStyle`       | `ViewStyle`       | `{}`              | Style for the header container.                                       |
| `leftPressDisable`  | `boolean`         | `false`           | Disables the left button interaction.                                 |
| `rightPressDisable` | `boolean`         | `false`           | Disables the right button interaction.                                |

## Customization

You can override any default styles by providing your own styles through the `headerStyle`, `leftIconStyle`, `rightIconStyle`, or `titleStyle` props.

### Example:

```tsx
<AppHeader
  headerTitle="Profile"
  headerStyle={{ backgroundColor: "#f8f8f8", elevation: 5 }}
  titleStyle={{ color: "#333", fontWeight: "bold" }}
/>
```

## Animations

The `AppHeader` uses `react-native-reanimated` to provide smooth press animations for its buttons. Customize these animations in the `AnimatedTouchable` component if needed.

## License

This package is open-sourced under the MIT License. Feel free to use and modify it as per your needs.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance the functionality of this package.

## Acknowledgements

- Built with ❤️ and `react-native-reanimated`.
- Icon rendering powered by the `react-native-vector-icons` package.

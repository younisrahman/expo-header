//@ts-nocheck
import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  useNavigation,
  DrawerActions,
  useNavigationState,
} from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

import { IconRenderer } from "./IconRenderer";

export interface AnimatedDrawerSceneWrapperProps {
  headerTitle?: string;
  leftPressDisable?: boolean;
  rightPressDisable?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: string; // Icon name
  leftIconFamily?: string; // Icon family, e.g., "FontAwesome"
  leftIconSize?: number;
  leftIconColor?: string;
  leftIconStyle?: object;
  rightIcon?: string; // Icon name
  rightIconFamily?: string; // Icon family
  rightIconSize?: number;
  rightIconColor?: string;
  rightIconStyle?: object;
  LeftComponent?: React.ComponentType; // Custom component for the left
  RightComponent?: React.ComponentType; // Custom component for the right
  screenSizeWhenOpenDrawer?: number;
  animation?: "perspective" | "no-perspective" | "top-tilt" | "bottom-tilt";
  headerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode; // Content of the wrapper
}

export type DrawerItem = {
  name: string;
  drawerLabel: string;
  title?: string;
  leftIcon?: string;
  leftIconFamily?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  rightIcon?: string;
  rightIconFamily?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  onPress?: () => void;
};

const Icons = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

const IconRenderer = ({
  iconStyle,
  item,
  side = "left",
}: {
  iconStyle?: StyleProp<ViewStyle>;
  item: Partial<DrawerItem>;
  side?: "left" | "right";
}) => {
  const iconName = side === "left" ? item.leftIcon : item.rightIcon;
  const IconComponent =
    //@ts-ignore
    Icons[side === "left" ? item?.leftIconFamily : item?.rightIconFamily] ||
    FontAwesome;
  const iconSize = side === "left" ? item.leftIconSize : item.rightIconSize;
  const iconColor = side === "left" ? item.leftIconColor : item.rightIconColor;

  return (
    //@ts-ignore
    <IconComponent
      name={iconName}
      size={iconSize || 20}
      color={iconColor || "black"}
      style={iconStyle}
    />
  );
};

const AnimatedTouchable = ({ disable, children, onPress }: any) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disable}
      style={{ minWidth: 40 }}
    >
      <Animated.View style={[animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

// Header Component
const Header = ({
  title,
  onLeftPress,
  onRightPress,
  leftComponent,
  rightComponent,
  containerStyle,
  titleStyle,
  leftPressDisable,
  rightPressDisable,
}: any) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AnimatedTouchable disable={leftPressDisable} onPress={onLeftPress}>
        <View style={styles.leftContainer}>{leftComponent}</View>
      </AnimatedTouchable>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <AnimatedTouchable disable={rightPressDisable} onPress={onRightPress}>
        <View style={styles.rightContainer}>{rightComponent}</View>
      </AnimatedTouchable>
    </View>
  );
};

// AppHeader Component
export function AppHeader({
  leftPressDisable,
  rightPressDisable,
  headerTitle,
  onLeftPress,
  onRightPress,
  leftIcon = "menu",
  leftIconFamily = "MaterialIcons",
  leftIconSize = 28,
  leftIconColor = "#007AFF",
  leftIconStyle,
  rightIcon,
  rightIconFamily,
  rightIconSize,
  rightIconColor,
  rightIconStyle,
  LeftComponent,
  RightComponent,
  headerStyle,
}: AnimatedDrawerSceneWrapperProps) {
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state.routes[state.index]);
  const routeName = currentRoute?.name;

  const leftItem = {
    leftIcon: leftIcon,
    leftIconFamily: leftIconFamily,
    leftIconSize: leftIconSize,
    leftIconColor: leftIconColor,
  };

  const rightItem = {
    leftIcon: rightIcon,
    leftIconFamily: rightIconFamily,
    leftIconSize: rightIconSize,
    leftIconColor: rightIconColor,
  };
  return (
    <Header
      title={headerTitle || routeName || "Header"}
      onLeftPress={
        onLeftPress
          ? onLeftPress
          : () => navigation.dispatch(DrawerActions.openDrawer())
      } // Open drawer on press
      onRightPress={onRightPress ? onRightPress : () => alert("Right pressed!")}
      leftComponent={
        LeftComponent ? (
          <LeftComponent />
        ) : (
          <IconRenderer iconStyle={leftIconStyle} item={leftItem} side="left" />
        )
      }
      rightComponent={
        RightComponent ? (
          <RightComponent />
        ) : (
          <IconRenderer
            iconStyle={rightIconStyle}
            item={rightItem}
            side="left"
          />
        )
      }
      containerStyle={headerStyle}
      titleStyle={{ color: "#333" }}
      leftPressDisable={leftPressDisable}
      rightPressDisable={rightPressDisable}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  leftContainer: {
    justifyContent: "center",
  },
  title: {
    flex: 3,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default AppHeader;

import React, { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ProgressButtonProps {
  title?: string;
  onPress?: () => {};
  style?: ViewStyle;
  titleStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  children?: ReactNode;
}
const ProgressButton = ({
  title,
  onPress,
  style,
  titleStyle,
  disabled,
  children,
}: ProgressButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.buttonStyle,
        {
          ...style,
          backgroundColor: disabled
            ? "#cdcdcd"
            : style?.backgroundColor ?? "black",
          minWidth: 100,
          borderRadius: 8,
        },
      ]}
    >
      {children}
      {title && (
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          minimumFontScale={0.8}
          adjustsFontSizeToFit={true}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default ProgressButton;

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: RFValue(16),
    fontWeight: "bold",
    paddingHorizontal: "4%",
  },
  pressed: { opacity: 0.3 },
});

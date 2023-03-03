import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
interface ProgressButtonProps {
    title?: string;
    onPress?: () => {};
    style?: ViewStyle;
    titleStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    children?: ReactNode;
}
declare const ProgressButton: ({ title, onPress, style, titleStyle, disabled, children, }: ProgressButtonProps) => JSX.Element;
export default ProgressButton;

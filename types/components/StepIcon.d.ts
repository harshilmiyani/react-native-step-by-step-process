/// <reference types="react" />
import { TextStyle } from "react-native";
export interface StepIconProps {
    label?: string;
    labelStyle?: TextStyle;
    stepNumber?: number;
    isActiveStep?: boolean;
    isCompletedStep?: boolean;
    completedStepIconColor?: string;
    activeStepIconColor?: string;
    activeStepNumColor?: string;
    disabledStepNumColor?: string;
    completedCheckColor?: string;
}
declare const StepIcon: ({ label, labelStyle, stepNumber, isActiveStep, isCompletedStep, completedStepIconColor, activeStepIconColor, activeStepNumColor, disabledStepNumColor, completedCheckColor, }: StepIconProps) => JSX.Element;
export default StepIcon;

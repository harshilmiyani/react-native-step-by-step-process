import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
export interface ProcessFooterProps {
    removeButtonRow?: boolean;
    hidePreviousButton?: boolean | undefined;
    previousButtonStyle?: ViewStyle;
    previousButtonText?: string;
    previousButtonDisabled?: boolean;
    onPreviousStep?: () => {};
    previousButtonTextStyle?: TextStyle;
    hideNextButton?: boolean | undefined;
    nextButtonStyle?: ViewStyle;
    nextButtonTitle?: string;
    onNextStep?: () => {};
    nextButtonTextStyle?: TextStyle;
    nextButtonDisabled?: boolean;
    footerComponent?: ReactNode;
}
declare const ProcessFooter: ({ removeButtonRow, hidePreviousButton, previousButtonStyle, previousButtonText, previousButtonDisabled, onPreviousStep, previousButtonTextStyle, hideNextButton, nextButtonStyle, nextButtonTitle, onNextStep, nextButtonTextStyle, nextButtonDisabled, footerComponent, }: ProcessFooterProps) => JSX.Element | null;
export default ProcessFooter;

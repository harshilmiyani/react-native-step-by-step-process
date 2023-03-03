import { ReactNode, ReactElement } from "react";
import { ProcessFooterProps } from "./ProcessFooter";
import { StepProps } from "./Step";
import { StepIconProps } from "./StepIcon";
export interface ProcessFlowProps extends StepProps, ProcessFooterProps, StepIconProps {
    children: ReactElement<ProcessFlowProps, any>[];
    onChangeStep?: (currentStepIndex?: number, nextStepIndex?: number, previousStepIndex?: number) => {} | undefined;
    onPrevious: (previousStepIndex: number) => {};
    onNext: (nextStepIndex: number) => {};
    onSubmit?: () => {};
    nextButtonText?: string;
    previousButtonText?: string;
    finishButtonText?: string;
    nextButtonDisabled?: boolean;
    previousButtonDisabled?: boolean;
    removeButtonRow?: boolean;
    footerComponent?: ReactNode;
}
declare const ProcessFlow: ({ children, onChangeStep, onNext, onPrevious, onSubmit, nextButtonStyle, nextButtonText, nextButtonTextStyle, previousButtonStyle, previousButtonText, previousButtonTextStyle, finishButtonText, nextButtonDisabled, previousButtonDisabled, removeButtonRow, footerComponent, labelStyle, ...props }: ProcessFlowProps) => JSX.Element;
export default ProcessFlow;

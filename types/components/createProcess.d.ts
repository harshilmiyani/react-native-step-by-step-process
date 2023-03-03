/// <reference types="react" />
declare const createProcess: () => {
    ProcessFlow: ({ children, onChangeStep, onNext, onPrevious, onSubmit, nextButtonStyle, nextButtonText, nextButtonTextStyle, previousButtonStyle, previousButtonText, previousButtonTextStyle, finishButtonText, nextButtonDisabled, previousButtonDisabled, removeButtonRow, footerComponent, labelStyle, ...props }: import("./ProcessFlow").ProcessFlowProps) => JSX.Element;
    Step: ({ children }: import("./Step").StepProps) => JSX.Element;
};
export default createProcess;

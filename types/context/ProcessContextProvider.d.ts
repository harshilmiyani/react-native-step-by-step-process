import React, { ReactNode } from 'react';
interface ProcessContainerProps {
    children: ReactNode;
    initialNumberOfSteps: number;
}
export interface ProcessContextType {
    totalSteps: number;
    numberOfSteps: (totalStepsNumber: number) => void;
    activeStep: number;
    currentStep: (currentStepIndex: number) => void;
}
export declare const ProcessContext: React.Context<ProcessContextType>;
declare const ProcessContainer: ({ children, initialNumberOfSteps }: ProcessContainerProps) => JSX.Element;
export default ProcessContainer;

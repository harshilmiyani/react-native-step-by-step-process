import React, { createContext, ReactNode, useState } from 'react';

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

export const ProcessContext = createContext<ProcessContextType>({
    totalSteps: 0,
    numberOfSteps: (_) => {},
    activeStep: 0,
    currentStep: (_) => {}
});

const ProcessContainer = ({ children, initialNumberOfSteps = 1 }: ProcessContainerProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(initialNumberOfSteps);

    const numberOfSteps = (totalStepsNumber: number) => {
        if (totalStepsNumber > 0) {
            setTotalSteps(totalStepsNumber);

            if (activeStep >= totalStepsNumber) {
                setActiveStep(totalStepsNumber - 1);
            }
        } else {
            console.error('Please Enter Positive Number');
        }
    };

    const currentStep = (currentStepIndex: number) => {
        if (currentStepIndex >= 0 && currentStepIndex < totalSteps) {
            setActiveStep(currentStepIndex);
        } else {
            setActiveStep(0);
        }
    };

    const value: ProcessContextType = {
        totalSteps,
        numberOfSteps,
        activeStep,
        currentStep
    };
    return <ProcessContext.Provider value={value}>{children}</ProcessContext.Provider>;
};

export default ProcessContainer;

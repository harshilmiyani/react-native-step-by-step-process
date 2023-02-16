import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface StepProps {
    children?: ReactNode;
    hide?: boolean;
    label?: string;
    labelStyle?: TextStyle | undefined;
    onPrevious?: (previousStepIndex: number) => {};
    onNext?: (nextStepIndex: number) => {};
    hideNextButton?: boolean;
    hidePreviousButton?: boolean;
    footerComponent?: ReactNode;
    showFirstStepPreviousButton?: boolean;
}
const Step = ({ children }: StepProps) => {
    return <>{children}</>;
};

export default Step;

/* eslint-disable react-native/no-inline-styles */
import React, {
  isValidElement,
  useEffect,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  useMemo,
} from "react";
import {
  LayoutRectangle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import ProcessFooter, { ProcessFooterProps } from "./ProcessFooter";
import { ProcessContext } from "../context/ProcessContextProvider";
import { StepProps } from "./Step";
import StepIcon, { StepIconProps } from "./StepIcon";

export interface ProcessFlowProps
  extends StepProps,
    ProcessFooterProps,
    StepIconProps {
  // isComplete not perfectly working now
  // isComplete = false,
  children: ReactElement<ProcessFlowProps, any>[];

  onChangeStep?: (
    currentStepIndex?: number,
    nextStepIndex?: number,
    previousStepIndex?: number
  ) => {} | undefined;

  // Buttons Config
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
  showLabelAboveSteps?: boolean;
}

const ProcessFlow = ({
  // isComplete not perfectly working now
  // isComplete = false,
  children,

  onChangeStep,

  // Buttons Config
  onNext,
  onPrevious,
  onSubmit,
  nextButtonStyle,
  nextButtonText = "Next",
  nextButtonTextStyle,
  previousButtonStyle,
  previousButtonText = "Previous",
  previousButtonTextStyle,
  finishButtonText = "Submit",
  nextButtonDisabled = false,
  previousButtonDisabled = false,
  removeButtonRow = false,
  footerComponent,
  labelStyle,
  showLabelAboveSteps = false,
  ...props
}: ProcessFlowProps) => {
  const { activeStep, currentStep, numberOfSteps, totalSteps } =
    useContext(ProcessContext);
  const { width } = useWindowDimensions();
  const [stepIconWidthOffSet, setStepIconWidthOffSet] = useState<
    Array<{
      layout: LayoutRectangle;
      target?: number | null | undefined;
    }>
  >([]);

  useEffect(() => {
    if (activeStep >= 0 && activeStep < totalSteps) {
      if (onChangeStep) {
        onChangeStep(activeStep, activeStep + 1, activeStep - 1);
      }
    }
  }, [onChangeStep, activeStep, totalSteps]);

  // useEffect(() => {
  //   if (isComplete) {
  //     currentStep(totalSteps - 1);
  //   }
  // }, [currentStep, isComplete, totalSteps]);

  const renderChildren = React.useMemo(() => {
    const tmp = React.Children.map(children, (ele) => {
      if (ele && React.isValidElement(ele) && !ele?.props?.hide) {
        return React.cloneElement(ele);
      }
    });
    numberOfSteps(tmp?.length);
    return tmp;
  }, [children, numberOfSteps]);

  const renderStepIcons = () => {
    let step = [];
    let i = 0;

    while (i !== totalSteps) {
      const isCompletedStep = i < activeStep;
      const isActiveStep = i === activeStep;
      step.push(
        <View
          key={i}
          style={{ flex: 1 }}
          onLayout={({ nativeEvent: offSet }) => {
            setStepIconWidthOffSet((s) => {
              return [...s, offSet].slice(-totalSteps).sort((a, b) => {
                return a.layout.x - b.layout.x;
              });
            });
          }}
        >
          <StepIcon
            {...{ ...props, showLabelAboveSteps }}
            stepNumber={i + 1}
            label={renderChildren[i]?.props?.label ?? ""}
            labelStyle={
              labelStyle
                ? labelStyle
                : renderChildren[i]?.props?.labelStyle
                ? renderChildren[i]?.props?.labelStyle
                : undefined
            }
            isCompletedStep={isCompletedStep}
            isActiveStep={isActiveStep}
          />
        </View>
      );
      i++;
    }
    return step;
  };

  const onNextStep = async () => {
    const isThereError = onNext && !!(await onNext(activeStep + 1));
    const isError =
      renderChildren[activeStep]?.props?.onNext &&
      !!(await renderChildren[activeStep]?.props?.onNext(activeStep + 1));
    // Return out of method before moving to next step if errors exist.
    if (isThereError || isError) {
      return;
    }
    currentStep(activeStep + 1);
  };

  const onPreviousStep = async () => {
    const isThereError = onPrevious && !!(await onPrevious(activeStep + 1));
    const isError =
      renderChildren[activeStep]?.props?.onPrevious &&
      !!(await renderChildren[activeStep]?.props?.onPrevious(activeStep + 1));

    if (isThereError || isError) {
      return;
    }
    // Changes active index and calls previous function passed by parent
    if (activeStep >= 0) {
      currentStep(activeStep - 1);
    }
  };

  const onSubmitHandler = async () => {
    onSubmit && onSubmit();
  };

  const indicatorTop = useMemo(
    () =>
      showLabelAboveSteps
        ? (width * 10) / 100 >= 50
          ? 77
          : (width * 27) / 100 / 2
        : (width * 10) / 100 >= 50
        ? 30
        : (width * 10) / 100 / 2,
    [width, showLabelAboveSteps]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 10,
          maxHeight: 115,
        }}
      >
        {totalSteps < 9 && (
          <View
            style={[
              styles.stepIcons,
              {
                maxHeight: 115,
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                height: (width * 20) / 100,
                width: width,
              },
            ]}
          >
            {renderStepIcons()}
            <View
              style={[
                styles.stepIndicatorOuter,
                {
                  top: indicatorTop,
                  width: stepIconWidthOffSet[totalSteps - 1]?.layout?.x,
                },
              ]}
            >
              <View
                style={[
                  styles.stepIndicatorInner,
                  {
                    width: stepIconWidthOffSet[activeStep]?.layout?.x,
                    borderWidth: 1.5,
                  },
                ]}
              />
            </View>
          </View>
        )}
        {totalSteps >= 9 && (
          <ScrollView
            horizontal={true}
            bounces={false}
            contentContainerStyle={[
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              },
            ]}
            style={[
              {
                maxHeight: 115,
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
                height: (width * 20) / 100,
                width: width,
                backgroundColor: "white",
              },
            ]}
          >
            {renderStepIcons()}
            <View
              style={[
                styles.stepIndicatorOuter,
                {
                  // Scrollable
                  top: indicatorTop,
                  width: stepIconWidthOffSet[totalSteps - 1]?.layout?.x,
                },
              ]}
            >
              <View
                style={[
                  styles.stepIndicatorInner,
                  {
                    width: stepIconWidthOffSet[activeStep]?.layout?.x,
                    borderWidth: 1.5,
                  },
                ]}
              />
            </View>
          </ScrollView>
        )}
      </View>
      <View style={styles.bodyContainer}>
        {isValidElement(renderChildren[activeStep]) &&
          React.cloneElement(renderChildren[activeStep])}
      </View>

      <ProcessFooter
        footerComponent={
          footerComponent ||
          renderChildren[activeStep]?.props?.footerComponent ? (
            <>
              {footerComponent && footerComponent}
              {renderChildren[activeStep]?.props?.footerComponent &&
                renderChildren[activeStep]?.props?.footerComponent}
            </>
          ) : undefined
        }
        removeButtonRow={
          !removeButtonRow &&
          !renderChildren[activeStep]?.props?.removeButtonRow
        }
        hidePreviousButton={
          !renderChildren[activeStep]?.props?.hidePreviousButton &&
          (!(activeStep === 0) ||
            renderChildren[activeStep]?.props?.showFirstStepPreviousButton)
        }
        previousButtonStyle={previousButtonStyle}
        previousButtonText={
          previousButtonText
            ? renderChildren[activeStep]?.props?.previousButtonText
              ? renderChildren[activeStep]?.props?.previousButtonText
              : previousButtonText
            : ""
        }
        previousButtonDisabled={previousButtonDisabled}
        onPreviousStep={onPreviousStep}
        previousButtonTextStyle={previousButtonTextStyle}
        hideNextButton={!renderChildren[activeStep]?.props?.hideNextButton}
        nextButtonStyle={nextButtonStyle}
        nextButtonTitle={
          activeStep === totalSteps - 1
            ? finishButtonText
            : renderChildren[activeStep]?.props?.nextButtonText
            ? renderChildren[activeStep]?.props?.nextButtonText
            : nextButtonText
        }
        onNextStep={
          activeStep === totalSteps - 1 ? onSubmitHandler : onNextStep
        }
        nextButtonTextStyle={nextButtonTextStyle}
        nextButtonDisabled={nextButtonDisabled}
      />
    </SafeAreaView>
  );
};

export default ProcessFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicatorOuter: {
    zIndex: -1,
    backgroundColor: "lightgray",
    position: "absolute",
    alignSelf: "center",
  },
  stepIndicatorInner: {
    borderColor: "#4BB543",
  },
  bodyContainer: {
    flex: 1,
  },
  stepIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
  },
});

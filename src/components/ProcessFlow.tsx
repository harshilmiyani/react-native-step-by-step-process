/* eslint-disable react-native/no-inline-styles */
import React, {
  isValidElement,
  useEffect,
  useState,
  Children,
  useContext,
  ReactNode,
  ReactElement,
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
  nextBtnText?: string;
  previousBtnText?: string;
  finishBtnText?: string;
  nextBtnDisabled?: boolean;
  previousBtnDisabled?: boolean;
  removeBtnRow?: boolean;
  footerComponent?: ReactNode;
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
  nextBtnStyle,
  nextBtnText = "Next",
  nextBtnTextStyle,
  previousBtnStyle,
  previousBtnText = "Previous",
  previousBtnTextStyle,
  finishBtnText = "Submit",
  nextBtnDisabled = false,
  previousBtnDisabled = false,
  removeBtnRow = false,
  footerComponent,
  labelStyle,
  ...props
}: ProcessFlowProps) => {
  const { activeStep, currentStep, numberOfSteps, totalSteps } =
    useContext(ProcessContext);
  const { width } = useWindowDimensions();
  const [renderChildren, setRenderChildren] = useState<
    Array<ReactElement<ProcessFlowProps>>
  >([]);
  const [stepIconWidthOffSet, setStepIconWidthOffSet] = useState<
    Array<{
      layout: LayoutRectangle;
      target?: number | null | undefined;
    }>
  >([]);

  useEffect(() => {
    let countChildren = 0;
    const tmpRenderChildren: Array<ReactElement<ProcessFlowProps>> = [];
    Children.map(children, (child: ReactElement<ProcessFlowProps, any>) => {
      if (child && isValidElement(child) && !child?.props?.hide) {
        countChildren++;
        tmpRenderChildren.push(child);
      }
    });
    setRenderChildren(tmpRenderChildren);
    numberOfSteps(countChildren);
  }, [children, numberOfSteps]);

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
            {...props}
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

  //100 - [[100 - circleWidth * totalSteps] / totalSteps]},
  // let indicatorWidth =
  //   width - stepIconWidthOffSet[setStepIconWidthOffSet.length - 1];
  // (width * (100 - [[100 - 10 * totalSteps] / totalSteps])) / 100;
  // let filledIndicator =
  //   (width *
  //     (parseFloat([10 * activeStep]) +
  //       parseFloat(
  //         activeStep !== 0
  //           ? [(100 - 10 * totalSteps) / totalSteps] * activeStep
  //           : 0,
  //       ))) /
  //   100;

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
                  top: (width * 10) / 100 >= 50 ? 30 : (width * 10) / 100 / 2,
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
                  top: (width * 10) / 100 >= 50 ? 30 : (width * 10) / 100 / 2,
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
        removeBtnRow={
          !removeBtnRow && !renderChildren[activeStep]?.props?.removeBtnRow
        }
        hidePreviousButton={
          !renderChildren[activeStep]?.props?.hidePreviousButton &&
          (!(activeStep === 0) ||
            renderChildren[activeStep]?.props?.showFirstStepPreviousButton)
        }
        previousBtnStyle={previousBtnStyle}
        previousBtnText={previousBtnText ? previousBtnText : ""}
        previousBtnDisabled={previousBtnDisabled}
        onPreviousStep={onPreviousStep}
        previousBtnTextStyle={previousBtnTextStyle}
        hideNextButton={!renderChildren[activeStep]?.props?.hideNextButton}
        nextBtnStyle={nextBtnStyle}
        nextBtnTitle={
          activeStep === totalSteps - 1 ? finishBtnText : nextBtnText
        }
        onNextStep={
          activeStep === totalSteps - 1 ? onSubmitHandler : onNextStep
        }
        nextBtnTextStyle={nextBtnTextStyle}
        nextBtnDisabled={nextBtnDisabled}
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

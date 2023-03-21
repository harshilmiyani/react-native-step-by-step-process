import React, { ReactNode } from "react";
import { View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import ProgressButton from "./UI/ProgressButton";

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
const ProcessFooter = ({
  removeButtonRow,
  hidePreviousButton,
  previousButtonStyle,
  previousButtonText,
  previousButtonDisabled,
  onPreviousStep,
  previousButtonTextStyle,
  hideNextButton,
  nextButtonStyle,
  nextButtonTitle,
  onNextStep,
  nextButtonTextStyle,
  nextButtonDisabled,
  footerComponent,
}: ProcessFooterProps) => {
  return removeButtonRow ? (
    <View style={styles.footerContainer}>
      <View style={styles.footerNestedContainer}>
        {!footerComponent && (
          <View style={styles.footerBtnContainer}>
            {hidePreviousButton ? (
              <ProgressButton
                style={previousButtonStyle}
                title={previousButtonText ? previousButtonText : ""}
                disabled={previousButtonDisabled}
                onPress={onPreviousStep}
                titleStyle={previousButtonTextStyle}
              />
            ) : (
              <View />
            )}
            <View>
              {hideNextButton && (
                <ProgressButton
                  style={nextButtonStyle}
                  title={nextButtonTitle}
                  onPress={onNextStep}
                  titleStyle={nextButtonTextStyle}
                  disabled={nextButtonDisabled}
                />
              )}
            </View>
          </View>
        )}

        {footerComponent && (
          <View style={styles.footerComponentContainer}>{footerComponent}</View>
        )}
      </View>
    </View>
  ) : null;
};

export default ProcessFooter;

const styles = StyleSheet.create({
  footerContainer: {
    overflow: "hidden",
    backgroundColor: "transparent",
    paddingTop: "2%",
    height: "10%",
    minHeight: 70,
    maxHeight: 100,
  },
  footerNestedContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  footerComponentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  footerBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "10%",
    flex: 1,
    backgroundColor: "white",
  },
});

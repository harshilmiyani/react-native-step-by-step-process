/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ProcessContext } from "../context/ProcessContextProvider";
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

const StepIcon = ({
  label,
  labelStyle,
  stepNumber,
  isActiveStep,
  isCompletedStep,
  completedStepIconColor = "#4BB543",
  activeStepIconColor = "#87CEEB",
  activeStepNumColor = "black",
  disabledStepNumColor = "white",
  completedCheckColor = "white",
}: StepIconProps) => {
  const { width } = useWindowDimensions();

  const { totalSteps } = useContext(ProcessContext);

  let stylesConfig: {
    circleStyle?: StyleProp<ViewStyle>;
    stepNum?: StyleProp<TextStyle>;
  } = {};

  if (isActiveStep) {
    stylesConfig = {
      circleStyle: {
        backgroundColor: activeStepIconColor,
        shadowColor: activeStepIconColor,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,

        elevation: 6,
      },
      stepNum: {
        color: activeStepNumColor,
        fontSize: RFValue(12),
      },
    };
  } else if (isCompletedStep) {
    stylesConfig = {
      circleStyle: {
        backgroundColor: completedStepIconColor,
      },
    };
  } else {
    stylesConfig = {
      circleStyle: {
        backgroundColor: "lightgray",
      },
      stepNum: {
        color: disabledStepNumColor,
        fontSize: RFValue(12),
      },
    };
  }

  return (
    <View style={styles.stepIconContainer}>
      <View style={styles.stepIconInnerContainer}>
        <View style={styles.stepIconCircleContainer}>
          <View
            style={[
              {
                width: (width * 10) / 100,
                height: (width * 10) / 100,
                borderRadius: (width * 10) / 100 / 2,
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 60,
                maxWidth: 60,
              },
              stylesConfig.circleStyle,
            ]}
          >
            <Text style={styles.circleText}>
              {isCompletedStep ? (
                <Text style={{ color: completedCheckColor }}>&#10003;</Text>
              ) : (
                <Text style={stylesConfig?.stepNum}>{stepNumber}</Text>
              )}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.labelContainer,
            {
              alignItems: "center",
              height: (width * 10) / 100,
              maxHeight: 50,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              labelStyle,
              {
                width: width / totalSteps - 4,
                color: isActiveStep
                  ? labelStyle?.color
                    ? labelStyle?.color
                    : "black"
                  : "transparent",
              },
            ]}
            numberOfLines={2}
            minimumFontScale={0.8}
            adjustsFontSizeToFit={true}
          >
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StepIcon;

const styles = StyleSheet.create({
  stepIconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIconInnerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIconCircleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 60,
    maxWidth: 60,
  },
  labelContainer: {
    width: "100%",
    paddingVertical: "5%",
  },
  label: {
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
  circleText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});

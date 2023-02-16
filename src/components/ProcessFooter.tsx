import React, { ReactNode } from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import ProgressButton from './UI/ProgressButton';

export interface ProcessFooterProps {
    removeBtnRow?: boolean;
    hidePreviousButton?: boolean | undefined;
    previousBtnStyle?: ViewStyle;
    previousBtnText?: string;
    previousBtnDisabled?: boolean;
    onPreviousStep?: () => {};
    previousBtnTextStyle?: TextStyle;
    hideNextButton?: boolean | undefined;
    nextBtnStyle?: ViewStyle;
    nextBtnTitle?: string;
    onNextStep?: () => {};
    nextBtnTextStyle?: TextStyle;
    nextBtnDisabled?: boolean;
    footerComponent?: ReactNode;
}
const ProcessFooter = ({
    removeBtnRow,
    hidePreviousButton,
    previousBtnStyle,
    previousBtnText,
    previousBtnDisabled,
    onPreviousStep,
    previousBtnTextStyle,
    hideNextButton,
    nextBtnStyle,
    nextBtnTitle,
    onNextStep,
    nextBtnTextStyle,
    nextBtnDisabled,
    footerComponent
}: ProcessFooterProps) => {
    return removeBtnRow ? (
        <View style={styles.footerContainer}>
            <View style={styles.footerNestedContainer}>
                {!footerComponent && (
                    <View style={styles.footerBtnContainer}>
                        {hidePreviousButton ? (
                            <ProgressButton
                                style={previousBtnStyle}
                                title={previousBtnText ? previousBtnText : ''}
                                disabled={previousBtnDisabled}
                                onPress={onPreviousStep}
                                titleStyle={previousBtnTextStyle}
                            />
                        ) : (
                            <View />
                        )}
                        <View>{hideNextButton && <ProgressButton style={nextBtnStyle} title={nextBtnTitle} onPress={onNextStep} titleStyle={nextBtnTextStyle} disabled={nextBtnDisabled} />}</View>
                    </View>
                )}

                {footerComponent && <View style={styles.footerComponentContainer}>{footerComponent}</View>}
            </View>
        </View>
    ) : null;
};

export default ProcessFooter;

const styles = StyleSheet.create({
    footerContainer: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        paddingTop: '2%',
        height: '10%',
        minHeight: 70,
        maxHeight: 100
    },
    footerNestedContainer: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
    footerComponentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    footerBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
        flex: 1,
        backgroundColor: 'white'
    }
});

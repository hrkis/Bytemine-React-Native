import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../utils/colors';
import normalize from 'react-native-normalize';

const Toggle = ({ isOn, onPress }: { isOn: boolean; onPress: any }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: isOn ? Colors.lightgreen : Colors.darkGrey,
              ...Platform.select({
                ios: {
                  left: !isOn ? -normalize(0) : normalize(25),
                },
                android: {
                  left: !isOn ? -normalize(4) : normalize(25),
                },
              }),
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightgrey,
    width: normalize(40),
    height: normalize(10),
    borderRadius: normalize(15),
    position: 'relative',
    marginVertical: normalize(5),
  },
  circle: {
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(10),
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: normalize(-5),
      },
      android: {
        top: normalize(-2),
      },
    }),
  },
});

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {P} from '..';
import {Colors} from '../../utils/colors';

const ToogleTabs = ({options, selected, setSelected, style}: any) => {
  const onPress = (val: string) => setSelected(val);

  return (
    <View style={[styles.container, style]}>
      {options.map((item: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.common,
            item === selected ? styles.selected : styles.unselected,
          ]}
          onPress={() => onPress(item)}>
          <P
            style={
              item === selected ? styles.selectedText : styles.unselectedText
            }>
            {item}
          </P>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ToogleTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },

  common: {
    paddingVertical: normalize(9),
    paddingHorizontal: normalize(18),
    borderRadius: normalize(20),
  },
  selected: {
    backgroundColor: Colors.black,
    fontSize: normalize(16),
    fontWeight: '500',
  },
  unselected: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    fontSize: normalize(16),
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.white,
    fontSize: normalize(14),
    fontWeight: '500',
  },
  unselectedText: {
    color: Colors.black,
    fontSize: normalize(14),
    fontWeight: '400',
  },
});

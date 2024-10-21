import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';
import FastImage from 'react-native-fast-image';

const CustomTab = ({state, descriptors, navigation}: any) => {
  const getImage = (label: string, isFocused: boolean) => {
    switch (label) {
      case 'Strategies':
        return (
          <FastImage
            source={
              isFocused
                ? require(`../../assets/images/chess_red.png`)
                : require(`../../assets/images/chess_white.png`)
            }
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        );

      case 'OrderBook':
        return (
          <FastImage
            source={
              isFocused
                ? require(`../../assets/images/book_red.png`)
                : require(`../../assets/images/book_white.png`)
            }
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        );

      case 'Discover':
        return (
          <FastImage
            source={
              isFocused
                ? require(`../../assets/images/discover_red.png`)
                : require(`../../assets/images/discover_white.png`)
            }
            style={{width: 30, height: 30, marginBottom: 10}}
            resizeMode="contain"
          />
        );
    }
  };

  return (
    <View style={{flexDirection: 'row', backgroundColor: Colors.white}}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            accessible={false}
            onPress={onPress}
            key={index}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: normalize(15),
                backgroundColor: Colors.black,
                borderTopLeftRadius: index !== 0 ? 0 : normalize(25),
                borderTopRightRadius: index !== 2 ? 0 : normalize(25),
              }}>
              {isFocused && (
                <View
                  style={{
                    position: 'absolute',
                    width: '80%',
                    height: normalize(5),
                    backgroundColor: Colors.red,
                    top: 0,
                  }}
                />
              )}
              {getImage(label, isFocused)}
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(13),
                  fontWeight: '700',
                }}>
                {label === 'OrderBook' ? 'Order Book' : label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default CustomTab;

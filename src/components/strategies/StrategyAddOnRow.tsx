import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import Toggle from './Toggle';
import { common } from '../../utils/common';
import ToggleSwitch from 'toggle-switch-react-native'

export const StrategyAddOnRow = (props) => {

    const [isOn, setOn] = useState(false);

    return (
        <View style={{ marginVertical: normalize(10), marginHorizontal: normalize(10) }}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <H2 style={{ fontWeight: '400', fontSize: normalize(18) }}>{props.title}</H2>

                    <P style={{ fontSize: normalize(12), width: common.ScreenWidth * 0.6 }}>{props.description}</P>
                </View>
                <View style={{ flex: 1 }} />
                {/* <Toggle
                    isOn={props.isOn}
                    onPress={() => props.toggleState()}
                /> */}
                <ToggleSwitch
                    isOn={props.isOn}
                    onColor={Colors.green}
                    offColor={Colors.red}
                    // label="Example label"
                    labelStyle={{ display: 'none' }}
                    size="medium"
                    onToggle={isOn => props.toggleState()}
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    title: {

    },
    description: {

    },
});
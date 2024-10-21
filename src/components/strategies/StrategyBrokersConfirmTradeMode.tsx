import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import { AppButton } from '../common/Buttons';
import { saveApiKeys } from '../../services/strategiesService';
import { showToast } from '../../utils/alert';
import DropDownPicker from 'react-native-dropdown-picker';

export const StrategyBrokerConfirmTradeMode = (props) => {
    const { user } = useSelector((state: any) => state);
    const user_id = user?.user_id
    const [showBrokerModal, setShowBrokerModal] = useState(true);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Spot');
    const [items, setItems] = useState([
        { 'label': 'Spot', 'value': 'Spot' },
        { 'label': 'Margin', 'value': 'Margin' },
    ]);

    const broker = props.broker;


    return (
        <View style={styles.centeredView}>
            <RNModal
                isVisible={showBrokerModal}
                backdropColor={Colors.darkGrey}
                backdropOpacity={0.85}
                onBackdropPress={() => {
                    props.reset()
                    setShowBrokerModal(false)
                }}
                onBackButtonPress={() => {
                    props.reset()
                    setShowBrokerModal(false)
                }}>
                <View style={styles.modalView}>
                    <H2 style={[styles.title, { color: '#F6234E' }]}>Confirm Trade Mode</H2>
                    <Text style={{ fontSize: 15, color: Colors.black, marginVertical: 20 }}>Please select the Trade mode before deploying live.</Text>
                    <P style={{ marginBottom: 20 }}>{`Trade mode will determine whether to place orders using Margin from your broker or trade in SPOT mode.`}</P>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select Trade Mode"
                    />
                    <AppButton onPress={() => { props.tradeMode(value) }} style={[styles.button]} text="Save" />
                </View>
            </RNModal>
        </View>
    );
};

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        position: 'absolute',
    },
    modalView: {
        margin: 5,
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        marginBottom: normalize(18),
        // color: Colors.red,
        fontSize: normalize(16),
    },
    title2: {
        marginBottom: normalize(30),
        color: Colors.darkestGrey,
        fontWeight: '600',
        fontSize: normalize(15),
    },
    title3: { fontSize: normalize(12) },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: normalize(30),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    redText: {
        textAlign: 'center',
        fontSize: normalize(35),
        color: Colors.red,
    },
    smallHeader: {
        fontSize: normalize(10),
        fontWeight: '600',
        color: Colors.black,
        marginBottom: normalize(20),
    },
    smallText: {
        fontSize: normalize(10),
        fontWeight: '400',
        color: Colors.black,
    },
    price: {
        color: Colors.black,
        fontWeight: '500',
        marginRight: normalize(3),
    },
    button: {
        width: normalize(100),
        paddingHorizontal: normalize(5),
        ...Platform.select({
            android: {
                height: normalize(40),
            },
            ios: {
                height: normalize(40),
            },
        }),
        marginTop: normalize(30)
    },
});

import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import { StrategyAddOnRow } from './StrategyAddOnRow';
import { common } from '../../utils/common';
import { WebView } from 'react-native-webview';
import { AppButton } from '../common/Buttons';
import { getAllBrokers } from '../../services/strategiesService';
import FastImage from 'react-native-fast-image';

export const StrategyBrokerList = (props) => {
    const state = useSelector((state: any) => state);
    const [showBrokerModal, setShowBrokerModal] = useState(true);
    const flatlistRef = useRef(null);
    const [brokerList, setBrokerList] = useState([]);

    useEffect(() => {
        getBrokerList()
    }, [])

    const getBrokerList = () => {
        getAllBrokers()
            .then((res: any) => {
                // console.log(res)
                setBrokerList(res)
            })
            .catch(err => console.log(err.message))
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', position: 'relative', marginVertical: normalize(5), marginHorizontal: normalize(5), flex: 1, justifyContent: 'space-evenly' }}>
                <FastImage source={{ uri: item.image_url }}
                    style={{ width: normalize(100), height: normalize(60) }}
                    resizeMode="contain" />
                <View style={{ flex: 1 }} />
                <AppButton onPress={() => props.selectBroker(item)} style={[styles.button]} text="Deploy" />
            </View>
        )
    }

    return (
        <View style={styles.centeredView}>
            <RNModal
                isVisible={showBrokerModal}
                backdropColor={Colors.darkGrey}
                backdropOpacity={0.85}
                onBackdropPress={() => setShowBrokerModal(false)}
                onBackButtonPress={() => setShowBrokerModal(false)}
                onModalHide={() => props.reset()}>
                <View style={styles.modalView}>
                    <H2 style={[styles.title, { color: '#F6234E' }]}>Deploy your strategies to your preferred broker</H2>

                    <WebView
                        style={{ marginTop: normalize(20), flex: 1 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: 'https://www.youtube.com/embed/v7xoMpVuIJQ' }}
                        startInLoadingState={true}
                    />

                    <FlatList
                        ref={flatlistRef}
                        style={{ height: common.ScreenHeight * 0.5, marginTop: normalize(20), width: '100%' }}
                        data={brokerList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `key-${index}`}
                    />

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
    },
});

import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import { AppButton } from '../common/Buttons';
import { deployStrategyLiveApi, saveApiKeys } from '../../services/strategiesService';
import { showToast } from '../../utils/alert';
import DropDownPicker from 'react-native-dropdown-picker';

export const StrategyDeployConfirmation = (props) => {
    const { user } = useSelector((state: any) => state);
    const user_id = user?.user_id
    const [showBrokerModal, setShowBrokerModal] = useState(true);

    const broker = props.broker;


    const deployStrategyLive = (now) => {
        if (now) {
            let obj: any = {
                'user_id': user_id,
                'broker_id': broker.id,
                'vsb_key': props.vsbKey,
                'order_type': props.tradeMode
            }
            console.log(obj)
            deployStrategyLiveApi(obj)
                .then((res: any) => {
                    console.log(res)
                    showToast(res.message, 'success')
                    props.strategyDeployed()
                    setShowBrokerModal(false)
                })
                .catch(err => console.log(err))
        } else {
            props.strategyDeployed()
            setShowBrokerModal(false)
        }
    }

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
                    <H2 style={[styles.title, { color: '#F6234E' }]}>Deploy Confirmation</H2>
                    <P style={{ marginVertical: 20 }}>{`When you click on confirm and deploy below, your algorithm will be live and trades will be executed immediately with your selected broker when the conditions are met.
Please ensure that you have enough balance in your trading account so that the algorithm doesn't leave any open orders.

Market Dynamics will automatically notify you if the broker starts rejecting order requests due to some reason. If this happens then the strategy will be automatically un-deployed and your manual intervention may be needed.`}</P>

                    <View style={{ flexDirection: 'row' }}>
                        <AppButton onPress={() => { deployStrategyLive(false) }} style={[styles.button, { backgroundColor: Colors.darkGrey }]} text="Close" />
                        <View style={{ width: 20 }} />
                        <AppButton onPress={() => { deployStrategyLive(true) }} style={[styles.button, { width: 160 }]} text={`Confirm & Deploy`} />
                    </View>
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

import { FlatList, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import AppTextInput from '../common/TextInput';
import { AppButton } from '../common/Buttons';
import { saveApiKeys } from '../../services/strategiesService';
import { showToast } from '../../utils/alert';
import { commonStyles } from '../../assets/styles';

export const StrategyBrokerDetailModal = (props) => {
    const { user } = useSelector((state: any) => state);
    const user_id = user?.user_id
    const [showBrokerModal, setShowBrokerModal] = useState(true);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [passPhrase, setPassPhrase] = useState('');

    const [apiKeyError, setApiKeyError] = useState('');
    const [apiSecretError, setApiSecretError] = useState('');
    const broker = props.broker;

    const checkToSaveApiKeys = () => {
        var error = true
        setApiKeyError('')
        setApiSecret('')
        if (apiKey.trim().length == 0) {
            setApiKeyError('Please enter API Key')
        } else if (apiSecret.trim().length == 0) {
            setApiSecretError('Please enter API Secret')
        } else {
            error = false
        }

        if (!error) {
            let obj: any = {
                'key': apiKey.trim(),
                'secret': apiSecret.trim(),
                'passphrase': passPhrase.trim(),
                'broker_id': broker.id,
                'user_id': user_id
            }
            console.log(obj)
            saveApiKeys(obj)
                .then((res: any) => {
                    console.log(res)
                    showToast(res.message, 'success')
                    props.apiKeySaved()
                })
                .catch(err => console.log(err))
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
                    <H2 style={[styles.title, { color: '#F6234E' }]}>Setup your {broker.broker_name} keys</H2>

                    <AppTextInput
                        label="API Key"
                        value={apiKey}
                        error={apiKeyError}
                        onChangeText={(txt) => setApiKey(txt)}
                        placeholder="example - ae45fsdaw92nnsil20"
                    />

                    <AppTextInput
                        label="API Secret"
                        value={apiSecret}
                        error={apiSecretError}
                        onChangeText={(txt) => setApiSecret(txt)}
                        placeholder="head over to the help link below to find out your API secret"
                    />

                    <AppTextInput
                        label="Passphrase (If applicable)"
                        value={passPhrase}
                        onChangeText={(txt) => setPassPhrase(txt)}
                        placeholder="head over to the help link below to find out your Passphrase"
                    />

                    <P style={{ textAlign: 'left', alignSelf: 'flex-start' }}>{`Note: API keys and secrets are stored and encrypted securely using SHA-256 hashing.`}</P>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start', width: '100%' }}>
                        <Text style={[commonStyles.p, { textAlign: 'left' }]}>Please read </Text>
                        <TouchableOpacity onPress={() => Linking.openURL(broker.doc_url)}>
                            <Text style={[commonStyles.p, { color: Colors.red, textAlign: 'left', textDecorationLine: 'underline' }]}>{broker.broker_name}'s</Text>
                        </TouchableOpacity>
                        <Text style={[commonStyles.p, { textAlign: 'left' }]}> documentation on how to </Text>
                    </View>
                    <P style={{ justifyContent: 'flex-start', alignContent: 'flex-start', textAlign: 'left', alignSelf: 'flex-start' }}>fetch API key and secret.</P>
                    <P style={{ textAlign: 'left', alignSelf: 'flex-start' }}>{`Please ensure API key(s) and secret(s) are correct. Market Dynamics will not be able to place orders if the keys are wrong.`}</P>

                    <AppButton onPress={() => { checkToSaveApiKeys() }} style={[styles.button]} text="Save" />
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
        marginTop: normalize(10)
    },
});

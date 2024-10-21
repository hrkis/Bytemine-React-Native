import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import RNModal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { Colors } from '../../utils/colors';
import { H2, P } from '../common/Text';
import { StrategyAddOnRow } from './StrategyAddOnRow';
import { common } from '../../utils/common';
import DropDownPicker from 'react-native-dropdown-picker';
import momentTZ from 'moment-timezone';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import timezone from '../../utils/timezones.json';
import { AppButton, PrevButton } from '../common/Buttons';
import { commonStyles } from '../../assets/styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AppTextInput from '../common/TextInput';
import { array } from 'yup';
import { saveAddons } from '../../services/strategiesService';
import { showToast } from '../../utils/alert';

export const StrategyAddOns = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [dropDownvalue, setDropDownvalue] = useState('');
    const state = useSelector((state: any) => state);
    const [showAddOnModal, setShowAddOnModal] = useState(true);
    const flatlistRef = useRef(null);
    // const [addOns, setAddOns] = useState([
    //     { title: 'Day Switch', description: 'Switch a strategy on or off depending on the specified day.', state: false },
    //     { title: 'Mobile Notification', description: 'Receive Trade notifications to your device.', state: false },
    //     { title: 'Strategy Expiration', description: 'Automatically kill a strategy within a specified period of time.', state: false },
    //     { title: 'Kill Switch', description: 'Turn off the strategy after X number of trades have been triggered.', state: false },
    //     { title: 'Loss realization shutdown', description: 'Turn off a strategy after a maximum loss of X USD.', state: false },
    //     { title: 'Cooldown Period', description: 'A period of time (candles) that must pass before a new trade is initiated', state: false },
    //     { title: 'Time Switch', description: 'Switch a strategy on or off depending on the specified time.', state: false },
    //     { title: 'Webhook', description: 'Get a Webhook notification whenever a signal is generated.', state: false },
    //     { title: 'Profit satisfaction shutdown', description: 'Turn off the strategy after a maximum profit of X USD.', state: false },
    //     { title: 'Change Timeframe or Symbol', description: 'Apply a different Timeframe or Symbol to the Strategy.', state: false },
    //     { title: 'Position Builder', description: 'Configure Trailing TP% and SL% to keep building your position.', state: false },
    // ]);

    const [daySwitch, setDaySwitch] = useState(false)
    const [mobileNotification, setMobileNotification] = useState(false)
    const [strategyExpiration, setStrategyExpiration] = useState(false)
    const [killSwitch, setKillSwitch] = useState(false)
    const [lossSwitch, setLossSwitch] = useState(false)
    const [cooldownSwitch, setCooldownSwitch] = useState(false)
    const [timeSwitch, setTimeSwitch] = useState(false)
    const [webhookSwitch, setWebhookSwitch] = useState(false)
    const [profitSwitch, setProfitSwitch] = useState(false)
    const [timeframeSwitch, setTimeframeSwitch] = useState(false)
    const [positionSwitch, setPositionSwitch] = useState(false)

    const [sunday, setSunday] = useState(false)
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thrusday, setThrusday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [selectedExpirationDate, setSelectedExpirationDate] = useState('Select a date')
    const [killSwitchValue, setKillSwitchValue] = useState('')
    const [killSwitchError, setKillSwitchError] = useState('')
    const [lossRealizationValue, setLossRealizationValue] = useState('')
    const [lossRealizationError, setLossRealizationError] = useState('')
    const [cooldownPeriodValue, setCooldownPeriodValue] = useState('')
    const [cooldownPeriodError, setCooldownPeriodError] = useState('')
    const [startTimeVisible, setStartTimeVisibility] = useState(false)
    const [startTime, setStartTime] = useState('Start Time')
    const [endTimeVisible, setEndTimeVisibility] = useState(false)
    const [endTime, setEndTime] = useState('End Time')
    const [webhookValue, setWebhookValue] = useState('')
    const [webhookError, setWebhookError] = useState('')
    const [instrumentValue, setInstrumentValue] = useState('')
    const [instrumentError, setInstrumentError] = useState('')
    const [openTimeframe, setOpenTimeframe] = useState(false);
    const [timeframeValue, setTimeframeValue] = useState('15m');
    const [timeFrameItems, setTimeFrameItems] = useState([
        { 'label': '15 Min', 'value': '15m' },
        { 'label': '30 Min', 'value': '30m' },
        { 'label': '60 Min', 'value': '60m' },
        { 'label': '1 Day', 'value': '1d' },
        { 'label': '5 Days', 'value': '5d' },
    ]);
    const [profitSatisfactionValue, setProfitSatisfactionValue] = useState('')
    const [profitSatisfactionError, setProfitSatisfactionError] = useState('')
    const [profitTakeValue, setProfitTakeValue] = useState('')
    const [profitTakeError, setProfitTakeError] = useState('')
    const [stopLossValue, setStopLossValue] = useState('')
    const [stopLossError, setStopLossError] = useState('')

    useEffect(() => {
        // console.log(momentTZ.tz.names())
        // DropDownPicker.setTheme("DARK")
        let arr = [];
        console.log('timezone ', items)
        console.log('timezone guess ', momentTZ.tz.guess())
        timezone.forEach(it => {
            let item = {
                'label': it.text,
                'value': it.utc[0],
            };
            arr.push(item)
        })
        setItems(arr);
        setDropDownvalue(momentTZ.tz.guess())
    }, [])

    useEffect(() => {
        console.log('Props strategy_id ', props.strategyId)
    }, [props])

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
        setStartTimeVisibility(false)
        setEndTimeVisibility(false)
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date + " - " + moment(date).format('DD/MM/YYYY'));
        setSelectedExpirationDate(moment(date).format('DD/MM/YYYY'))
        hideDatePicker();
    };

    const handleStartTimeConfirm = (date) => {
        console.warn("A start time has been picked: ", date + " - " + moment(date).format('HH:mm'));
        setStartTime(moment(date).format('HH:mm'))
        hideDatePicker();
    };

    const handleEndTimeConfirm = (date) => {
        console.warn("A end time has been picked: ", date + " - " + moment(date).format('HH:mm'));
        setEndTime(moment(date).format('HH:mm'))
        hideDatePicker();
    };

    const getDayValue = () => {
        let arr = [];
        if (sunday) {
            arr.push('Sunday')
        }
        if (monday) {
            arr.push('Monday')
        }
        if (tuesday) {
            arr.push('Tuesday')
        }
        if (wednesday) {
            arr.push('Wednesday')
        }
        if (thrusday) {
            arr.push('Thrusday')
        }
        if (friday) {
            arr.push('Friday')
        }
        if (saturday) {
            arr.push('Saturday')
        }
        return arr
    }

    const handleNextButton = () => {
        let obj: any = {
            'strategy_id': props.strategyId,
        }
        if (timeSwitch) {
            obj['startTime'] = startTime
            obj['endTime'] = endTime
        }
        if (mobileNotification)
            obj['mobile_notification'] = "on"
        if (webhookSwitch)
            obj['webhook'] = webhookValue
        if (strategyExpiration)
            obj['strategy_expiration'] = selectedExpirationDate
        if (timeframeSwitch) {
            obj['instruments_input'] = instrumentValue
            obj['timeframe'] = timeframeValue
        }
        if (killSwitch)
            obj['killSwitch'] = killSwitchValue
        if (profitSwitch)
            obj['profit'] = profitSatisfactionValue
        if (lossSwitch)
            obj['loss'] = lossRealizationValue
        if (cooldownSwitch)
            obj['cooldown_period'] = cooldownPeriodValue
        if (positionSwitch) {
            obj['tp'] = profitSatisfactionValue
            obj['sl'] = stopLossValue
        }
        if (daySwitch)
            obj['day_switch'] = getDayValue().join(',')


        // console.log('Saving addOns ', JSON.stringify(obj))

        saveAddons(obj)
            .then((res: any) => {
                console.log('res ', res)
                showToast(res.message, 'success')
                props.addOnList(obj)
                setShowAddOnModal(false)
            })
            .catch(err => {
                console.log('err', JSON.stringify(err))
            });
    }

    return (
        <View style={styles.centeredView}>
            <RNModal
                isVisible={showAddOnModal}
                backdropColor={Colors.darkGrey}
                backdropOpacity={0.85}
                onBackdropPress={() => {
                    props.reset()
                    setShowAddOnModal(false)
                }}
                onBackButtonPress={() => {
                    props.reset()
                    setShowAddOnModal(false)
                }}>
                <View style={styles.modalView}>
                    <H2 style={[styles.title, { color: '#F6234E' }]}>Strategy Add-Ons</H2>
                    <P>Trade more conveniently. Strategy add-ons are extra features that can make your strategy more powerful and precise. (Optional to add)</P>
                    <Text style={{ marginTop: normalize(20) }}>Timezone</Text>
                    <DropDownPicker
                        open={open}
                        value={dropDownvalue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select timezone"
                    />
                    <ScrollView nestedScrollEnabled={true} style={{ height: common.ScreenHeight * 0.5, marginTop: normalize(20), paddingRight: 10 }}>
                        <StrategyAddOnRow key={1} title={'Day Switch'} description={'Switch a strategy on or off depending on the specified day.'} isOn={daySwitch} toggleState={() => setDaySwitch(!daySwitch)} />
                        {daySwitch ? <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal={true}>
                                <TouchableOpacity onPress={() => { setSunday(!sunday) }}>
                                    <Text style={{ padding: 8, backgroundColor: sunday ? Colors.red : '#cbd5e0', color: !sunday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Sun</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setMonday(!monday) }}>
                                    <Text style={{ padding: 8, backgroundColor: monday ? Colors.red : '#cbd5e0', color: !monday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Mon</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setTuesday(!tuesday) }}>
                                    <Text style={{ padding: 8, backgroundColor: tuesday ? Colors.red : '#cbd5e0', color: !tuesday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Tue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setWednesday(!wednesday) }}>
                                    <Text style={{ padding: 8, backgroundColor: wednesday ? Colors.red : '#cbd5e0', color: !wednesday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Wed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setThrusday(!thrusday) }}>
                                    <Text style={{ padding: 8, backgroundColor: thrusday ? Colors.red : '#cbd5e0', color: !thrusday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Thu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setFriday(!friday) }}>
                                    <Text style={{ padding: 8, backgroundColor: friday ? Colors.red : '#cbd5e0', color: !friday ? Colors.black : Colors.white, borderRadius: 5, marginRight: 2 }}>Fri</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setSaturday(!saturday) }}>
                                    <Text style={{ padding: 8, backgroundColor: saturday ? Colors.red : '#cbd5e0', color: !saturday ? Colors.black : Colors.white, borderRadius: 5 }}>Sat</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View> : null}
                        <StrategyAddOnRow key={2} title={'Mobile Notification'} description={'Receive Trade notifications to your device.'} isOn={mobileNotification} toggleState={() => setMobileNotification(!mobileNotification)} />
                        <StrategyAddOnRow key={3} title={'Strategy Expiration'} description={'Automatically kill a strategy within a specified period of time.'} isOn={strategyExpiration} toggleState={() => setStrategyExpiration(!strategyExpiration)} />
                        {strategyExpiration ? <View>
                            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                                <Text style={{ backgroundColor: Colors.grey, paddingHorizontal: 40, paddingVertical: 10, color: Colors.black, textAlign: 'center' }}>{selectedExpirationDate}</Text>
                            </TouchableOpacity>
                        </View> : null}
                        <StrategyAddOnRow key={4} title={'Kill Switch'} description={'Turn off the strategy after X number of trades have been triggered.'} isOn={killSwitch} toggleState={() => setKillSwitch(!killSwitch)} />
                        {killSwitch ? <View>
                            <AppTextInput
                                value={killSwitchValue}
                                error={killSwitchError}
                                onChangeText={(txt) => setKillSwitchValue(txt)}
                                type={'number'}
                                placeholder="Kill switch value"
                            />
                        </View> : null}
                        <StrategyAddOnRow key={5} title={'Loss realization shutdown'} description={'Turn off a strategy after a maximum loss of X USD.'} isOn={lossSwitch} toggleState={() => setLossSwitch(!lossSwitch)} />
                        {lossSwitch ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                            {/* <Text style={{ backgroundColor: Colors.grey, paddingHorizontal: 15, marginRight: 5, paddingVertical: 14, borderRadius: 5, color: Colors.black }}>$</Text> */}
                            <View style={{ marginTop: 15, flex: 1 }}>
                                <AppTextInput
                                    value={lossRealizationValue}
                                    error={lossRealizationError}
                                    onChangeText={(txt) => setLossRealizationValue(txt)}
                                    type={'number'}
                                    placeholder="Loss realization shutdown"
                                />
                            </View>
                        </View> : null}
                        <StrategyAddOnRow key={6} title={'Cooldown Period'} description={'A period of time (candles) that must pass before a new trade is initiated'} isOn={cooldownSwitch} toggleState={() => setCooldownSwitch(!cooldownSwitch)} />
                        {cooldownSwitch ? <View>
                            <AppTextInput
                                value={cooldownPeriodValue}
                                error={cooldownPeriodError}
                                onChangeText={(txt) => setCooldownPeriodValue(txt)}
                                type={'number'}
                                placeholder="Cooldown Period value"
                            />
                        </View> : null}
                        <StrategyAddOnRow key={7} title={'Time Switch'} description={'Switch a strategy on or off depending on the specified time.'} isOn={timeSwitch} toggleState={() => setTimeSwitch(!timeSwitch)} />
                        {timeSwitch ? <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setStartTimeVisibility(true)}>
                                <Text style={{ backgroundColor: Colors.grey, paddingHorizontal: 40, paddingVertical: 10, color: Colors.black, textAlign: 'center' }}>{startTime}</Text>
                            </TouchableOpacity>
                            <View style={{ width: normalize(20) }} />
                            <TouchableOpacity onPress={() => setEndTimeVisibility(true)}>
                                <Text style={{ backgroundColor: Colors.grey, paddingHorizontal: 40, paddingVertical: 10, color: Colors.black, textAlign: 'center' }}>{endTime}</Text>
                            </TouchableOpacity>
                        </View> : null}
                        <StrategyAddOnRow key={8} title={'Webhook'} description={'Get a Webhook notification whenever a signal is generated.'} isOn={webhookSwitch} toggleState={() => setWebhookSwitch(!webhookSwitch)} />
                        {webhookSwitch ? <View>
                            <AppTextInput
                                value={webhookValue}
                                error={webhookError}
                                onChangeText={(txt) => setWebhookValue(txt)}
                                placeholder="Webhook url"
                            />
                        </View> : null}
                        <StrategyAddOnRow key={9} title={'Change Timeframe or Symbol'} description={'Apply a different Timeframe or Symbol to the Strategy.'} isOn={timeframeSwitch} toggleState={() => setTimeframeSwitch(!timeframeSwitch)} />
                        {timeframeSwitch ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: normalize(150), marginTop: 20 }}>
                                <AppTextInput
                                    value={instrumentValue}
                                    error={instrumentError}
                                    onChangeText={(txt) => setInstrumentValue(txt)}
                                    placeholder="Instrument Name"

                                />
                            </View>
                            <View style={{ width: normalize(20) }} />
                            <View style={{ flex: 1 }}>
                                <DropDownPicker
                                    open={openTimeframe}
                                    value={timeframeValue}
                                    items={timeFrameItems}
                                    setOpen={setOpenTimeframe}
                                    setValue={setTimeframeValue}
                                    setItems={setTimeFrameItems}
                                    placeholder="Choose Time"
                                />
                            </View>
                        </View> : null}
                        <StrategyAddOnRow key={10} title={'Profit satisfaction shutdown'} description={'Turn off the strategy after a maximum profit of X USD.'} isOn={profitSwitch} toggleState={() => setProfitSwitch(!profitSwitch)} />
                        {profitSwitch ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Text style={{ backgroundColor: Colors.grey, paddingHorizontal: 15, marginRight: 5, paddingVertical: 15, borderRadius: 5, color: Colors.black }}>$</Text> */}
                            <View style={{ marginTop: 15, flex: 1 }}>
                                <AppTextInput
                                    value={profitSatisfactionValue}
                                    error={profitSatisfactionError}
                                    onChangeText={(txt) => setProfitSatisfactionValue(txt)}
                                    type={'number'}
                                    placeholder="Profit satisfaction shutdown"
                                />
                            </View>
                        </View> : null}
                        <StrategyAddOnRow key={11} title={'Position Builder'} description={'Configure Trailing TP% and SL% to keep building your position.'} isOn={positionSwitch} toggleState={() => setPositionSwitch(!positionSwitch)} />
                        {positionSwitch ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: normalize(130) }}>
                                <AppTextInput
                                    label='Trailing Profit Take %'
                                    value={profitTakeValue}
                                    error={profitTakeError}
                                    onChangeText={(txt) => setProfitTakeValue(txt)}
                                    placeholder="Trailing Profit Take %"
                                />
                            </View>
                            <View style={{ width: normalize(20) }} />
                            <View style={{ width: normalize(130) }}>
                                <AppTextInput
                                    label='Trailing Stop Loss %'
                                    value={stopLossValue}
                                    error={stopLossError}
                                    onChangeText={(txt) => setStopLossValue(txt)}
                                    placeholder="Trailing Stop Loss %"
                                />
                            </View>
                        </View> : null}
                        {openTimeframe ? <View style={{ height: 100 }} /> : null}
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <AppButton onPress={() => {
                            handleNextButton()
                        }} style={[styles.button]} text="Next" />
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowAddOnModal(false)}
                        style={{ position: 'absolute', right: normalize(5), top: normalize(5), padding: 10 }}>
                        <MaterialCommunityIcons
                            name="close"
                            size={normalize(30)}
                            color={Colors.darkGrey}
                        />
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={startTimeVisible}
                        mode="time"
                        onConfirm={handleStartTimeConfirm}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={endTimeVisible}
                        mode="time"
                        onConfirm={handleEndTimeConfirm}
                        onCancel={hideDatePicker}
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
        marginBottom: normalize(30),
        // color: Colors.red,
        // fontSize: normalize(15),
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

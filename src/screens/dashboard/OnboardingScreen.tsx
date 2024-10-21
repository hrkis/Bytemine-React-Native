import React from 'react';
import { Colors } from '../../utils/colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import normalize from 'react-native-normalize';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/ScreenNames';
import { setIsFirstTime } from '../../redux/data/actions';

export const OnboardingScreen = () => {

    const navigation = useNavigation<any>()

    const slides = [
        {
            key: 1,
            title: 'Drag and drop strategy builder',
            text: 'Our visual strategy builder tool makes it easy to create complex and powerful trading strategies without the need for a single line of code.',
            image: require('../../assets/images/onboarding_1.png')
        },
        {
            key: 2,
            title: 'Replicate top performing strategies',
            text: 'Get started instantly by replicating a wide variety of pre-configured and tested trading strategies.',
            image: require('../../assets/images/onboarding_2.png')
        },
        {
            key: 3,
            title: 'Fully automated trading',
            text: 'Remove the stress associated with trading by avoiding the need to constantly monitor the markets.',
            image: require('../../assets/images/onboarding_3.png')
        },
        {
            key: 4,
            title: 'Trade from anywhere',
            text: 'All the features you need to monitor the performance of your strategies and trade wherever you are, whenever you want',
            image: require('../../assets/images/onboarding_4.png')
        }
    ]

    const renderSlider = ({ item }: { item: any }) => {
        return (
            <View style={styles.slide}>
                <View style={{ width: '84%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={item.image}
                        style={{
                            width: normalize(180),
                            height: normalize(180)
                        }}
                        resizeMode="contain" />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        )
    }

    const renderNextButton = () => {
        return (
            <Text style={styles.buttonText}>NEXT</Text>
        )
    }

    const renderDoneButton = () => {
        return (
            <Text style={styles.buttonText}>COMPLETE</Text>
        )
    }

    const renderSkipButton = () => {
        return (
            <Text style={styles.buttonText}>SKIP</Text>
        )
    }

    const onSkipOrDone = () => {
        setIsFirstTime(false)
        navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.LOGIN_SCREEN }]
        })
    }

    return (
        <View style={styles.container}>
            <AppIntroSlider
                data={slides}
                onSkip={onSkipOrDone}
                onDone={onSkipOrDone}
                showSkipButton={true}
                renderItem={renderSlider}
                dotStyle={styles.dotStyle}
                renderNextButton={renderNextButton}
                renderDoneButton={renderDoneButton}
                renderSkipButton={renderSkipButton}
                activeDotStyle={styles.activeDotStyle}
            />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    buttonText: {
        color: Colors.black
    },
    slide: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: normalize(30),
        fontSize: normalize(24),
        color: Colors.black,
        fontWeight: '700',
        textAlign: 'center'
    },
    text: {
        marginTop: normalize(30),
        fontSize: normalize(16),
        color: Colors.black,
        textAlign: 'center'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.grey,
        marginBottom: 25
    },
    activeDotStyle: {
        width: 10,
        height: 10,
        marginBottom: 25,
        backgroundColor: Colors.red
    }
})

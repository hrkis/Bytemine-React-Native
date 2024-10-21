import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import normalize from 'react-native-normalize'
import { H1, P } from '../common/Text'

const ProfitContainer = ({ title, item1, value1, item2, value2, item1Color, item2Color }: {
    title: string, item1: string, value1?: string, item2: string,
    value2?: string, item1Color?: string, item2Color?: string
}) => {

    return (
        <View style={styles.container}>
            <H1 style={styles.titleStyle}>{title}</H1>
            <P style={[styles.titleStyle, { marginVertical: normalize(5) }]}>
                {item1}
                <P style={[styles.titleStyle, {
                    color: item1Color ? item1Color : Colors.white
                }]}>{value1 ? value1 : ''}</P>
            </P>
            <P style={styles.titleStyle}>
                {item2}
                <P style={[styles.titleStyle, {
                    color: item2Color ? item2Color : Colors.white
                }]}>{value2 ? value2 : ''}</P>
            </P>
        </View>
    )
}

export default ProfitContainer;

const styles = StyleSheet.create({
    container: {
        width: '49%',
        borderRadius: normalize(10),
        backgroundColor: Colors.black,
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15)
    },
    titleStyle: {
        fontWeight: "bold",
        color: Colors.white,
        fontSize: normalize(12)
    }
})
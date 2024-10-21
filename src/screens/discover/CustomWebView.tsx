import React, { useState } from 'react'
import WebView from 'react-native-webview'
import { Colors } from '../../utils/colors'
import normalize from 'react-native-normalize'
import { goBack } from '../../utils/navigation'
import Loader from '../../components/common/Loader'
import { useRoute } from '@react-navigation/native'
import { strategyStyles } from '../../assets/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomWebView = () => {

    const route = useRoute()
    const [loading, setLoading] = useState(false)

    return (
        <View style={strategyStyles.container}>
            <SafeAreaView edges={['top']} style={styles.headerView}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={styles.backBtnView}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={normalize(25)}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </SafeAreaView>

            {loading && <Loader style={{ height: '90%' }} />}
            <WebView
                style={[strategyStyles.container]}
                source={{ uri: route.params?.url }}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)} />
        </View>
    )
}

export default CustomWebView

const styles = StyleSheet.create({
    headerView: {
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(15)
    },
    backBtnView: {
        alignItems: 'center',
        width: normalize(40),
        height: normalize(40),
        justifyContent: 'center',
        borderRadius: normalize(20),
        backgroundColor: Colors.red
    }
})

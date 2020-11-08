import { StatusBar } from 'expo-status-bar'
import React, { FC, memo, useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { arrowRightWhite, beadsLight, prabhupada, vaishnavaseva } from '../../assets'
import { Card } from '../components/Card'
import { RadialGradient } from '../components/RadialGradient'
import { configureLayoutAnimationFromKeyboardEvent, Device, GRAY_LIGHT, TINT, TINT_LIGHT, WHITE } from '../constants'

let keyboardMarginBottom = 0

export const LoginScreen: FC = memo(() => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    //TODO: add keyboard handlers for Android
    useEffect(() => {
        const listener = Keyboard.addListener('keyboardWillChangeFrame', e => {
            keyboardMarginBottom = Device.height - e.endCoordinates.screenY
            configureLayoutAnimationFromKeyboardEvent(e)
            setKeyboardVisible(e.endCoordinates.screenY < Device.height)
        })
        return () => listener.remove()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <RadialGradient
                containerStyle={styles.gradient}
                width={Device.width}
                height={Device.height}
                colors={['#FFB651', '#623D3D']}
            />
            <Image source={prabhupada} style={styles.prabhupada} />
            <Image source={vaishnavaseva} style={styles.vaishnavaseva} />
            {isKeyboardVisible && <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000', opacity:0.6 }} />}
            <View style={{ ...styles.content, marginBottom:keyboardMarginBottom}}>
                <Image source={beadsLight} style={styles.beads} />
                <Text style={styles.title}>Садхана</Text>
                <Card style={styles.card} contentStyle={styles.cardContent} >
                    <TextInput placeholder='Логин' style={styles.input}  keyboardAppearance='dark' />
                    <View style={styles.separator} />
                    <TextInput placeholder='Пароль' style={styles.input} secureTextEntry keyboardAppearance='dark' />
                    <TouchableHighlight style={styles.button} underlayColor={TINT_LIGHT} onPress={() => { }}>
                        <Text style={styles.buttonText}>Войти  <Image source={arrowRightWhite} style={styles.arrow} /></Text>
                    </TouchableHighlight>
                </Card>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
    gradient: { position: 'absolute', flex: 1, left: 0, top: 0, zIndex: -3 },
    prabhupada: { position: 'absolute', left: 0, top: 0, zIndex: -2 },
    content: { alignItems: 'center' },
    beads: {},
    title: { fontSize: 41, color: WHITE, fontWeight: '300' },
    card: { width: '70%', marginTop: 38 },
    cardContent: { alignItems: 'stretch', backgroundColor: WHITE },
    input: { height: 45, paddingHorizontal: 10, textAlign: 'center', fontSize:17 },
    separator: { height: 1, backgroundColor: GRAY_LIGHT },
    button: { backgroundColor: TINT, height: 60, justifyContent: 'center' },
    buttonText: { color: WHITE, fontSize: 20, textAlign: 'center', textAlignVertical: 'center', fontWeight: '500' },
    arrow: { transform: [{ translateY: 1 }] },
    vaishnavaseva: { position: 'absolute', right: Device.width * 0.04, bottom: Device.height * 0.03, zIndex: -1 }
})






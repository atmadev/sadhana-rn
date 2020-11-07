import React, { FC, useEffect } from 'react'
import { Animated, Easing, Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { arrowRightWhite, beadsLight, prabhupada, vaishnavaseva } from '../../assets'
import { Card } from '../components/Card'
import { RadialGradient } from '../components/RadialGradient'
import { Device, GRAY_LIGHT, TINT, TINT_LIGHT, WHITE } from '../constants'

const cardMarginBottom = new Animated.Value(0)
const dimm = new Animated.Value(0)

export const LoginScreen: FC = () => {
    useEffect(() => {
        const listener = Keyboard.addListener('keyboardWillChangeFrame', e => {
            const isKeyboardVisible = e.endCoordinates.screenY < Device.height
            const baseConfig = {
                duration: e.duration,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            }
            Animated.parallel([
                Animated.timing(cardMarginBottom, {
                    ...baseConfig,
                    toValue: -(Device.height - e.endCoordinates.screenY) / 2,
                }),
                Animated.timing(dimm, {
                    ...baseConfig,
                    toValue: isKeyboardVisible ? 0.6 : 0
                })
            ]).start()
        })
        return () => listener.remove()
    }, [])

    return (
        <View style={styles.container}>
            <RadialGradient
                containerStyle={styles.gradient}
                width={Device.width}
                height={Device.height}
                colors={['#FFB651', '#623D3D']}
            />
            <Image source={prabhupada} style={styles.prabhupada} />
            <Image source={vaishnavaseva} style={styles.vaishnavaseva} />
            <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000', opacity: dimm }}></Animated.View>
            <Animated.View style={{ ...styles.content, transform: [{ translateY: cardMarginBottom }] }}>
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
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
    gradient: { position: 'absolute', flex: 1, left: 0, top: 0, zIndex: -3 },
    prabhupada: { position: 'absolute', left: 0, top: 0, zIndex: -2 },
    content: { alignItems: 'center' },
    beads: {},
    title: { fontSize: 41, color: WHITE, fontWeight: '300' },
    card: { width: '70%', marginTop: 38 },
    cardContent: { alignItems: 'stretch', backgroundColor: WHITE },
    input: { height: 45, paddingHorizontal: 10, textAlign: 'center' },
    separator: { height: 1, backgroundColor: GRAY_LIGHT },
    button: { backgroundColor: TINT, height: 60, justifyContent: 'center' },
    buttonText: { color: WHITE, fontSize: 20, textAlign: 'center', textAlignVertical: 'center', fontWeight: '500' },
    arrow: { transform: [{ translateY: 1 }] },
    vaishnavaseva: { position: 'absolute', right: Device.width * 0.04, bottom: Device.height * 0.03, zIndex: -1 }
})






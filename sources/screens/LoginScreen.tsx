import { StatusBar } from 'expo-status-bar'
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Easing, Image, Keyboard, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { arrowRightWhite, beadsLight, prabhupada, vaishnavaseva } from '../../assets'
import { Card } from '../components/Card'
import { RadialGradient } from '../components/RadialGradient'
import { configureLayoutAnimationFromKeyboardEvent, Device, GRAY_LIGHT, TINT, TINT_LIGHT, WHITE } from '../constants'
import * as Haptics from 'expo-haptics'

let keyboardMarginBottom = 0
const formHorizontalOffset = new Animated.Value(0)

let email = ''
let password = ''

export const LoginScreen: FC = memo(() => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isInputValid, setInputValid] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const emailInput = useRef<TextInput>(null)
    const passwordInput = useRef<TextInput>(null)

    useEffect(() => {
        const listener = Keyboard.addListener('keyboardWillChangeFrame', e => {
            const keyboardVisible = e.endCoordinates.screenY < Device.height
            if (keyboardVisible == isKeyboardVisible) return

            setKeyboardVisible(() => {
                keyboardMarginBottom = Device.height - e.endCoordinates.screenY
                configureLayoutAnimationFromKeyboardEvent(e)
                return keyboardVisible
            })
        })
        return () => listener.remove()
    }, [isKeyboardVisible])

    const login = useCallback(() => {
        if (!isInputValid) return
        setLoading(true)
        setError(null)

        setTimeout(() => {
            Animated.timing(formHorizontalOffset, {
                toValue: 1,
                useNativeDriver: true,
                duration: 600,
                easing: Easing.linear
            }).start(() => formHorizontalOffset.setValue(0))

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            setLoading(false)
            setError('Неправильный пароль')
        }, 1000)
    }, [isInputValid, setLoading, setError])

    const validate = useCallback(() => {
        const state = email.length > 0 && password.length > 0
        setInputValid(state)
        setError(null)
    }, [setInputValid, setError])

    const onEmailChange = useCallback(text => {
        email = text
        validate()
    }, [])

    const onPasswordChange = useCallback(text => {
        password = text
        validate()
    }, [])

    const buttonDisabled = isLoading || !isInputValid

    return (
        <View style={styles.container} pointerEvents={isLoading ? 'none' : 'auto'}>
            <StatusBar style='light' />
            <RadialGradient
                containerStyle={styles.gradient}
                width={Device.width}
                height={Device.height}
                colors={gradientColors}
            />
            <Image source={prabhupada} style={styles.prabhupada} />
            <Image source={vaishnavaseva} style={styles.vaishnavaseva} />
            {isKeyboardVisible && <View style={styles.dim} />}

            <View style={{ ...styles.content, marginBottom: keyboardMarginBottom }}>
                <Image source={beadsLight} style={styles.beads} />
                <Text style={styles.title}>Садхана</Text>

                <Animated.View style={cardContainerStyle}>
                    <Card style={styles.card} contentStyle={styles.cardContent} >
                        <TextInput
                            ref={emailInput}
                            placeholder='Логин или e-mail'
                            style={styles.input}
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            enablesReturnKeyAutomatically
                            onSubmitEditing={() => passwordInput.current?.focus()}
                            onChangeText={onEmailChange}
                        />
                        <View style={styles.separator} />
                        <TextInput
                            ref={passwordInput}
                            placeholder='Пароль'
                            style={styles.input}
                            secureTextEntry
                            keyboardAppearance='dark'
                            returnKeyType='done'
                            enablesReturnKeyAutomatically
                            onSubmitEditing={login}
                            onChangeText={onPasswordChange}
                        />
                        <TouchableHighlight
                            style={{ ...styles.button, backgroundColor: buttonDisabled ? GRAY_LIGHT : TINT }}
                            underlayColor={TINT_LIGHT}
                            activeOpacity={1}
                            onPress={login}
                            disabled={buttonDisabled}
                        >
                            {isLoading ? <ActivityIndicator color={WHITE} /> : (
                                <Text style={styles.buttonText}>{'Войти  '}
                                    <Image source={arrowRightWhite} style={styles.arrow} />
                                </Text>
                            )}
                        </TouchableHighlight>
                    </Card>
                </Animated.View>
                {error && <Text style={styles.error}>⚠️ {error}</Text>}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
    gradient: { position: 'absolute', flex: 1, left: 0, top: 0, zIndex: -3 },
    prabhupada: { position: 'absolute', left: 0, top: 0, zIndex: -2 },
    dim: { position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.6 },
    content: { alignItems: 'center' },
    beads: {},
    title: { fontSize: Device.height * 0.05, color: WHITE, fontWeight: '300' },
    card: { width: '100%', marginTop: Device.height * 0.03 },
    cardContent: { alignItems: 'stretch', backgroundColor: WHITE },
    input: { height: 45, paddingHorizontal: 10, textAlign: 'center', fontSize: 17 },
    separator: { height: StyleSheet.hairlineWidth, backgroundColor: GRAY_LIGHT, marginHorizontal: 8 },
    button: { height: , justifyContent: 'center' },
    buttonText: { color: WHITE, fontSize: 20, textAlign: 'center', textAlignVertical: 'center', fontWeight: '500' },
    arrow: { transform: [{ translateY: 1 }] },
    error: { position: 'absolute', bottom: -26, textAlign: 'center', color: WHITE, fontSize: 14 },
    vaishnavaseva: { position: 'absolute', right: Device.width * 0.04, bottom: Device.height * 0.03, zIndex: -1 }
})

const cardContainerStyle: Animated.WithAnimatedObject<ViewStyle> = {
    alignItems: 'stretch',
    width: '70%',
    transform: [{
        translateX: formHorizontalOffset.interpolate({
            inputRange: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0.0, -15.0, 15.0, -10.0, 10.0, -5.0, 5.0, -2.5, 2.5, 0.0, 0.0]
        })
    }]
}

const gradientColors = ['#FFB651', '#623D3D']
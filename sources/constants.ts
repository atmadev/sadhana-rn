import { Platform, Dimensions, LayoutAnimation, Easing, KeyboardEventEasing, KeyboardEvent } from "react-native"
import { initialWindowMetrics } from "react-native-safe-area-context"
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const Device = {
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    majorIOSVersion:Number.parseInt(Platform.Version as string),
    statusBarHeight:getStatusBarHeight(),
    safeBottomInset:initialWindowMetrics?.insets.bottom ?? 0,
    small: Dimensions.get('window').height < 600
}

export const WHITE = 'white'
export const BLACK = 'black'
export const GRAY_LIGHT = '#F2F4F5'
export const GRAY = '#686868'
export const TINT = '#FF8C00'
export const TINT_LIGHT = '#FFBD56'
export const YELLOW = '#FFDB00'
export const RED = '#FF0048'
export const BLUE = '#007AFF'

export const configureLayoutAnimationFromKeyboardEvent = (e:KeyboardEvent) => 
LayoutAnimation.configureNext(LayoutAnimationKeyboardConfig(e.duration, e.easing))

export const LayoutAnimationKeyboardConfig = (duration = 250, type:KeyboardEventEasing = 'keyboard' ) => ({
    duration,
    create: {type, property: LayoutAnimation.Properties.opacity},
    update: { type },
    delete: { type, property:LayoutAnimation.Properties.opacity},
  })

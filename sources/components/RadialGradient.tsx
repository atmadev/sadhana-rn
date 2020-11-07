import React, { FC, memo } from 'react'
import { View, StyleSheet, Text, ViewStyle } from 'react-native'
import { Svg, Defs, RadialGradient as SVGRadialGradient, Stop, Ellipse } from 'react-native-svg'

export const RadialGradient: FC<{ containerStyle: ViewStyle, width: number, height: number, colors: string[] }> =
    memo(({ containerStyle, width, height, colors }) => {
        const cx = width / 2
        const cy = height / 2
        const rx = width / 1.6
        const ry = height / 1.6
        return (
            <Svg style={{...containerStyle, backgroundColor:colors[1]}} width={width} height={height}>
                <Defs>
                    <SVGRadialGradient
                        id="grad"
                        cx={cx}
                        cy={cy}
                        rx={rx}
                        ry={ry}
                        fx={cx}
                        fy={cy}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0" stopColor={colors[0]} stopOpacity="1" />
                        <Stop offset="1" stopColor={colors[1]} stopOpacity="1" />
                    </SVGRadialGradient>
                </Defs>
                <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#grad)" />
            </Svg>

        )
    })

const styles = StyleSheet.create({
    container: { flex: 1 }
})

/*
background: radial-gradient(47.53% 47.53% at 52.8% 45.73%, #FFB651 0%, #623D3D 100%);

*/
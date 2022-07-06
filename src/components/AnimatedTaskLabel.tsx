import React, { useEffect, memo } from 'react'
import { Pressable } from 'react-native'
import { Text, HStack, Box } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

interface Props {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = memo(
  ({
    strikethrough,
    textColor,
    inactiveTextColor,
    onPress,
    children
  }: Props) => {
    const hstackOffset = useSharedValue(0)
    const hstackAnimatedStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateX: hstackOffset.value }]
      }),
      [strikethrough]
    )
    const textColorProgress = useSharedValue(0)
    const textColorAnimatedStyles = useAnimatedStyle(
      () => ({
        color: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        )
      }),
      [strikethrough, textColor, inactiveTextColor]
    )
    const strikethroughWidth = useSharedValue(0)
    const strikethroughAnimatedStyles = useAnimatedStyle(
      () => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0, 1],
          [textColor, inactiveTextColor]
        )
      }),
      [strikethrough, textColor, inactiveTextColor]
    )

    useEffect(() => {
      const easing = Easing.out(Easing.quad)
      if (strikethrough) {
        hstackOffset.value = withSequence(
          withTiming(4, { duration: 200, easing }),
          withTiming(0, { duration: 200, easing })
        )
        textColorProgress.value = withDelay(
          1000,
          withTiming(1, { duration: 400, easing })
        )
        strikethroughWidth.value = withTiming(1, { duration: 400, easing })
      } else {
        strikethroughWidth.value = withTiming(0, { duration: 400, easing })
        textColorProgress.value = withTiming(0, { duration: 400, easing })
      }
    })
    return (
      <Pressable onPress={onPress}>
        <AnimatedStack alignItems="center" style={[hstackAnimatedStyles]}>
          <AnimatedText
            fontSize={19}
            noOfLines={1}
            isTruncated
            px={1}
            style={[textColorAnimatedStyles]}
          >
            {children}
          </AnimatedText>
          <AnimatedBox
            position="absolute"
            h={1}
            borderBottomWidth={1}
            style={[strikethroughAnimatedStyles]}
          />
        </AnimatedStack>
      </Pressable>
    )
  }
)

export default AnimatedTaskLabel

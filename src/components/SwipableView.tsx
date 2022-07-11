import React from 'react'
import { Dimensions } from 'react-native'
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated'
import { Box } from 'native-base'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(Animated.View)

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipeLeft?: () => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_TRESHOLD = -SCREEN_WIDTH * 0.2

const SwipeView = ({
  children,
  backView,
  onSwipeLeft,
  simultaneousHandlers
}: Props) => {
  const translateX = useSharedValue(0)
  const panGesture = Gesture.Pan()
    .onUpdate(
      event =>
        (translateX.value = Math.max(-128, Math.min(0, event.translationX)))
    )
    .onEnd(() => {
      const shouldBeMissed = translateX.value < SWIPE_TRESHOLD
      if (shouldBeMissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        translateX.value = withTiming(0)
      }
    })

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))
  return (
    <StyledView w="full">
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <GestureDetector gesture={panGesture}>
        <StyledView style={facadeStyle}>{children}</StyledView>
      </GestureDetector>
    </StyledView>
  )
}

export default SwipeView

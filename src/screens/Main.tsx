import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import {
  Text,
  Box,
  Center,
  VStack,
  themeTools,
  useTheme,
  useColorMode,
  useColorModeValue
} from 'native-base'
import ThemeToggle from '../components/ThemeToggle'
import AnimatedCheckbox from '../components/AnimatedCheckbox'
import TaskItem from '../components/TaskItem'

const Main = () => {
  const [checked, setChecked] = useState(false)
  const [subject, setSubject] = useState('task item')
  const [isEditing, setIsEditing] = useState(false)
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isEditing={isEditing}
          isDone={checked}
          onToggleCheckbox={handlePressCheckbox}
          subject={subject}
          onPressLabel={() => setIsEditing(true)}
          onChangeSubject={setSubject}
          onFinishEditing={() => setIsEditing(false)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default Main

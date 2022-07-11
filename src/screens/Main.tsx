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
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/ThemeToggle'
import AnimatedCheckbox from '../components/AnimatedCheckbox'
import TaskItem from '../components/TaskItem'
import TaskList from '../components/TaskList'
import SwipableView from '../components/SwipableView'
import shortid from 'shortid'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'buy tickets',
    done: false
  },
  { id: shortid.generate(), subject: 'Make tutorial', done: false }
]

const Main = () => {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const handleToggleTaskItem = useCallback(item => {
    setData(prevData =>
      prevData.map(prevItem => {
        if (prevItem.id === item.id) {
          return { ...prevItem, done: !prevItem.done }
        }
        return prevItem
      })
    )
  }, [])
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData =>
      prevData.map(prevItem => {
        if (prevItem.id === item.id) {
          return { ...prevItem, subject: newSubject }
        }
        return prevItem
      })
    )
  }, [])
  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback(item => {
    setData(prevData => prevData.filter(i => i !== item))
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default Main

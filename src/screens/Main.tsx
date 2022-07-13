import React, { useCallback, useState } from 'react'
import {
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon,
  useColorMode
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/AnimatedColorBox'
import ThemeToggle from '../components/ThemeToggle'
import TaskList from '../components/TaskList'
import shortid from 'shortid'
import Masthead from '../components/Masthead'
import Navbar from '../components/Navbar'

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
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead
        title="What's up, Victor!"
        image={require('../../assets/masthead.png')}
      >
        <Navbar />
      </Masthead>
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
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darlBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([{ id, subject: '', done: false }, ...data])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}

export default Main

import React from 'react'
import { Text, Box, Center } from 'native-base'

const Main = () => {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <Box>
        <Text>Hello</Text>
      </Box>
    </Center>
  )
}

export default Main

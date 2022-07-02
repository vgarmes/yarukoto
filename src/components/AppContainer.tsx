import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'

type Props = {
  children: React.ReactNode
}

const AppContainer = (props: Props) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>{props.children}</NativeBaseProvider>
    </NavigationContainer>
  )
}

export default AppContainer

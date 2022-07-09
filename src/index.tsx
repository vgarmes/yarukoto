import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Main from './screens/Main'
import About from './screens/About'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export default App

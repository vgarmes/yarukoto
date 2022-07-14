import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Main from './screens/Main'
import About from './screens/About'
import Sidebar from './components/Sidebar'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export default App

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './screen/Home'
import ListMovie from './screen/ListMovie'
import Detail from './screen/Detail'


export type kieuDLManHinh={
  Home: undefined
  List: undefined
  Detail:{
    id: string
  }
}

const Stack= createNativeStackNavigator<kieuDLManHinh>()

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator 
        // screenOptions={{headerShown:false}}
        >
          <Stack.Screen name="Home" component={Home}>
          </Stack.Screen>
          <Stack.Screen name="List" component={ListMovie}></Stack.Screen>
          <Stack.Screen name='Detail' component={Detail}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

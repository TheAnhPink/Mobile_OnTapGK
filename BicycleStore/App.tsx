import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import ListProduct from './components/ListProduct';
import ProductDetail from './components/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type dinhNghiaManHinh={
  Home: undefined,
  List: undefined,
  Detail: {
    id: string
  }
}

const Stack= createNativeStackNavigator<dinhNghiaManHinh>()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          
          <Stack.Screen name='Home' component={Home}></Stack.Screen>
          <Stack.Screen name="List" component={ListProduct}/>
          <Stack.Screen name="Detail" component={ProductDetail}></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

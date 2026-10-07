import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

function Home({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text>A premium online store for sporter and their stylish choice</Text>
      <View>
        <Image source={require('../assets/xehome.png')} ></Image>
        <Text>POWER BIKE SHOP</Text>
      </View>
      <Pressable onPress={()=>(navigation.navigate("List"))}>
        <Text>Get Started</Text>
      </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        // flex: 1,
        
    }
})

export default Home

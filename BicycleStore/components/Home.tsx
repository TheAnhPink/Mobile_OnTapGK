import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

function Home({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text style={styles.txthead}>A premium online store for sporter and their stylish choice</Text>
      <View style={styles.bgimg}>
        <Image style={styles.img} source={require('../assets/xehome.png')} ></Image>
        
      </View>
      <Text style={styles.txthead}>POWER BIKE SHOP</Text>

      <Pressable style={styles.btn} onPress={()=>(navigation.navigate("List"))}>
        <Text style={{color: "white", fontSize: 25, fontWeight:"bold"}}>Get Started</Text>
      </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center"
    },
    txthead:{
      fontSize: 30,
      fontFamily: "Time",
      width: "80%",
      textAlign:"center"
    },
    bgimg:{
      height: "70%",
      width: "95%",
      backgroundColor: "pink",
      borderRadius: 30,
      justifyContent: "center"
    }
    ,
    img:{
      width: "80%",
      aspectRatio: 1/1,
      alignSelf: "center",
      resizeMode: "contain"
    },
    btn:{
      height: 45,
      width: "90%",
      backgroundColor: "#eb6060",
      alignItems: "center",
      justifyContent:"center",
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 1
    }
})

export default Home

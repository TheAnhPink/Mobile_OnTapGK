import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function Home({navigation}:any) {
  return (
    <View>
      <h1>Chao ban den voi web xem phimmmmm</h1>
      <TouchableOpacity onPress={()=>{navigation.navigate("List")}}>
        <Text>Di den danh sach</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

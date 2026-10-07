import { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'

export type kieuDLXe={
  id:number,
  title: string,
  price: string,
  genre: string,
  poster: string
}

function ListProduct({navigation}:any) {
  const [dsXe, setDsXe]= useState<kieuDLXe[]>([])
  const [loading,setLoading]= useState(true)
  useEffect(()=>{
    fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/bicyclestore")
    .then(resp=>resp.json())
    .then(data=>{setDsXe(data)})
    .catch(err=>{console.log(err)})
    .finally(()=>{setLoading(false)})
  },[])

  return (
    <View style={{flex:1}}>
      <View>
        <Text>The world's Best bike</Text>
        <Pressable>
          <Text>All</Text>
        </Pressable>
        <Pressable>
          <Text>Roadbike</Text>
          </Pressable>
        <Pressable>  
          <Text>Mountain</Text>
        </Pressable>
      </View>
      


      <FlatList data={dsXe} numColumns={1} renderItem={({item})=>(
        <Pressable onPress={()=>{navigation.navigate("Detail",{id: item.id.toString()})}}>
          <View>
          <Image style={{height: 50, width:50}} source={{uri: item.poster}}/>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
        </View>
        </Pressable>
      )}
        keyExtractor={item=>(item.id.toString())}

      >

      </FlatList>

    </View>
  )
}

export default ListProduct

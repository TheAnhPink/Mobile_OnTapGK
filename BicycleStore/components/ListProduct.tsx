import { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native'


export type kieuDLXe={
  id:number,
  title: string,
  price: string,
  genre: string,
  poster: string
}



function ListProduct({navigation}:any) {
  
  
  const [cot,setCot]= useState(false)

  const [dsXe, setDsXe]= useState<kieuDLXe[]>([])
  const [chon, setChon]= useState("All")
  const dsXeHT= chon=="All"? dsXe : dsXe.filter(xe=>xe.genre==chon)
  
  const [loading,setLoading]= useState(true)
  useEffect(()=>{
    fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/bicyclestore")
    .then(resp=>resp.json())
    .then(data=>{setDsXe(data)})
    .catch(err=>{console.log(err)})
    .finally(()=>{setLoading(false)})
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text>The world's Best bike</Text>
        <View style={{flexDirection:"row", gap:15, justifyContent:"space-around"}}>
          <Pressable style={styles.btnloc} onPress={()=>{setChon("All")}}>
          <Text style={[styles.chu, {color: chon=="All"? "pink" : "gray"}] }>All</Text>
        </Pressable>
        <Pressable style={styles.btnloc} onPress={()=>{setChon("Roadbike")}}>
          <Text style={[styles.chu, {color: chon=="Roadbike"? "pink" : "gray"}]}>Roadbike</Text>
          </Pressable>
        <Pressable style={styles.btnloc} onPress={()=>{setChon("Mountain")}}>  
          <Text style={[styles.chu, {color: chon=="Mountain"? "pink": "gray"}]}>Mountain</Text>
        </Pressable>
        </View>
      </View>
      
      <Switch value={cot} onValueChange={(vlmoi)=>setCot(vlmoi)}></Switch>

      <FlatList data={dsXeHT} key={cot? "1cot" : "2cot"} numColumns={cot? 2:1} renderItem={({item})=>(
        <Pressable style={styles.cardWrap} onPress={()=>{navigation.navigate("Detail",{id: item.id.toString()})}}>
          <View style={styles.card}>
          <Image style={styles.img} source={{uri: item.poster}}/>
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

const styles= StyleSheet.create({
  container:{
    flex:1,

  },
  cardWrap:{
    flex:1
  },
  card:{
    width: "95%",
    height: "95%",
    borderRadius: 15,
    backgroundColor:"rgba(213, 205, 181, 0.2)",
    margin: 5,
    alignItems: "center"

  },
  img:{
    width: "80%",
    aspectRatio: 3/2,
    resizeMode:"contain"
  },
  btnloc:{
    borderColor: "pink",
    borderRadius: 10,
    borderWidth: 1,
    width: "30%",
    alignItems: "center",
    
  },
  chu:{
    fontWeight:"bold",
    fontSize: 20,
    color:"gray"
  },
  
})

export default ListProduct

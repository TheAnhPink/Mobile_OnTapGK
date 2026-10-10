import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, RefreshControl, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard , { Movie } from '../components/MovieCard';




function ListMovie() {
    const [dlPhim, setDLPhim] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [loi, setLoi] = useState("")
  const [dangLuoi, setDangLuoi] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [tenSearch, setTenSearch] = useState("")
  const [loaiTim, setLoaiTim] = useState("All")

  const getData = async () => {
    const resp = await fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/movies")
    if (!resp.ok) {
      setLoi(`${resp.status}`)
    }
    const data = await resp.json()
    setDLPhim(data);

  }

  useEffect(() => {

    const load = async () => {
      await getData()
      setLoading(false)
    }

    load()
  }, [])

  const onSelect = (id: string) => {
    const phim = dlPhim.find(p => p.id.toString() === id)
    const nd = `Phim ban chon: ${phim?.title ?? " Khong tim thay"} `
    Platform.OS === "web" ? window.alert(nd) : Alert.alert(nd)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }

  // Xu ly tim
  const dlHienThi = (loaiTim ==="All" ? dlPhim: dlPhim.filter(p=>p.genre ==loaiTim))
                    .filter(p => p.title.toLowerCase().includes(tenSearch.toLowerCase()))

  return (
    <SafeAreaProvider >
      <SafeAreaView style={{flex:1}}>
        <View style={{ flexDirection: "row", marginTop: 10, backgroundColor: "pink", padding: 5, justifyContent: "space-around" }}>
          <Text>Movie App</Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text>Dạng lưới:</Text>
            <Switch value={dangLuoi} onValueChange={setDangLuoi}></Switch>
          </View>
        </View>

        {/* Search */}
        <TextInput onChangeText={setTenSearch} placeholder='Nhap ten de tim'
          style={styles.search}>
        </TextInput>

        <View style={{ justifyContent:"space-around",flexDirection:"row"}}>
          <TouchableOpacity style={styles.btnTim } onPress={()=>{setLoaiTim("All")}}>
            <Text style={{color:loaiTim=="All"? "white" : "black"}}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTim} onPress={()=>{setLoaiTim("Sci-Fi")}}>
            <Text  style={{color:loaiTim=="Sci-Fi"? "white" : "black"}}>Sci-Fi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTim} onPress={()=>{setLoaiTim("Biography")}}>
            <Text  style={{color:loaiTim=="Biography"? "white" : "black"}}>Biography</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTim} onPress={()=>{setLoaiTim("Action")}}>
            <Text  style={{color:loaiTim=="Action"? "white" : "black"}}>Action</Text>
          </TouchableOpacity>

        </View>

        <View style={{flex:1}}>

          {loading ? <ActivityIndicator /> :
            (
              <FlatList style={{flex:1}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { onRefresh() }} ></RefreshControl>}
                columnWrapperStyle={dangLuoi ? { justifyContent: "space-around" } : undefined}
                key={dangLuoi ? "hai" : "mot"} numColumns={dangLuoi ? 2 : 1}
                // 
                data={dlHienThi}

                renderItem={({ item }) => (
                  <MovieCard movie={item} layout={dangLuoi ? "tile" : "row"} onSelect={onSelect}></MovieCard>
                )}

                keyExtractor={item => item.id.toString()}
              >

              </FlatList>
            )}

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  search: {
    width: "100%",
    height: 30,
    borderColor: "pink",
    borderWidth: 1,
    borderRadius: 15,
    margin: 10
  },
  btnTim:{
     
    backgroundColor:"pink",
    width: 80,
    height: 40,
    alignItems:"center",
    justifyContent: "center",
    borderRadius: 10
  }
});

export default ListMovie

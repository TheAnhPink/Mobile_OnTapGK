import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from './components/MovieCard';


export type Movie = {
  id: number,
  title: string,
  genre: string,
  year: number,
  rating: number,
  poster: string,
  isShowing: boolean
}

export default function App() {
  const [dlPhim, setDlPhim] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [loi, setLoi] = useState("")
  const [haiCot, setHaiCot] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    try {
      const resp = await fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/movies")
      if (!resp.ok) {
        setLoi("loi res ok")
      }
      const data = await resp.json()
      setDlPhim(data)
      setLoi("")
    } catch (error) {
      setLoi("Loi fetch")
    }
  }

  const getData1 = () => {
    fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/movies")
      .then(resp => resp.json())
      .then(data => setDlPhim(data))
      .catch(err => setLoi("Loi fetch"))
  }

  useEffect(() => {
    const loadData = async () => {
      await getData()
      setLoading(false)
    }

    loadData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }

  const alertTenPhim = (id: string) => {
    const phim = dlPhim.find(p => p.id.toString() == id)
    // window.alert(`Phim ban chon: ${phim?.title}`)
      Platform.OS === 'web' ? window.alert(`Phim ban chon: ${phim?.title}`) : Alert.alert(`Phim ban chon: ${phim?.title}`)

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Text>Movie App</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text>Dạng lưới:</Text>
              <Switch value={haiCot} onValueChange={(val) => { setHaiCot(val) }}></Switch>
            </View>
          </View>

          <View>
            <Text>{loi}</Text>
            {loading ? (<ActivityIndicator></ActivityIndicator>) :

              (<FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
                columnWrapperStyle={haiCot ? { justifyContent: "space-between" } : undefined}
                key={haiCot ? "hai" : "mot"} numColumns={haiCot ? 2 : 1} data={dlPhim} renderItem={({ item }) => (
                  <MovieCard movie={item} layout={haiCot ? "tile" : "row"} onSelect={alertTenPhim}></MovieCard>
                )} keyExtractor={item => item.id.toString()}
              >

              </FlatList>)
            }
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

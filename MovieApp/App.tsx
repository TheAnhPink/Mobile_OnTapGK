import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { KieuDLPhim } from './components/MovieCard';

export default function App() {
  const [dsPhim, setDsPhim] = useState<KieuDLPhim[]>([])
  const [loading, setLoading] = useState(true)
  const [haiCot, setHaiCot] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [loi, setLoi]= useState("")

  const hienThiTenPhim = (id: string) => {
    const phim = dsPhim.find(p => p.id.toString() == id)
    window.alert(`Phim bạn chọn: ${phim?.title ?? "Không tìm thấy"}`)
  }

  // ✅ Hàm getData — có try/catch + đóng đúng
  const getData = async () => {
    try {
      const resp = await fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/movies")
      if (!resp.ok) {
      setLoi(`Lỗi: ${resp.status}`)
    }
      const data = await resp.json()
      setDsPhim(data)
      setLoi("")
    } catch (error) {
      setLoi("Không kết nối đến dc api")
    }
  }

  // ✅ useEffect gọi getData lần đầu
  useEffect(() => {
    const loadData = async () => {
      await getData()
      setLoading(false)
    }
    loadData()
  }, [])

  // ✅ Hàm refresh
  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Movie App</Text>
        </View>

        <Switch value={haiCot} onValueChange={(val) => setHaiCot(val)} />

        <View style={{ flex: 1 }}>
          <Text>{loi}</Text>
          {loading ? <ActivityIndicator /> : (
            <FlatList
              key={haiCot ? "hai" : "mot"}
              data={dsPhim}
              numColumns={haiCot ? 2 : 1}
              columnWrapperStyle={haiCot ? { justifyContent: "space-between" } : undefined}
              renderItem={({ item }) => (
                <MovieCard movie={item} layout={haiCot? "tile":"row"} onSelect={hienThiTenPhim} />
              )}
              keyExtractor={item => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})
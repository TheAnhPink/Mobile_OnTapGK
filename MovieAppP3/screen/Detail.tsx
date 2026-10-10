import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { kieuDLManHinh } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Movie } from '../components/MovieCard'

type navProps = NativeStackScreenProps<kieuDLManHinh, "Detail">
function Detail({ navigation,route }: navProps) {
    const [dlPhim, setDLPhim] = useState<Movie>()
    const [loading, setLoading] = useState(true)
    const [loi, setLoi] = useState("")

    const {id}= route.params

    const getData = async () => {
        const resp = await fetch(`https://6ab224c45b9b60f39d345cdd.mockapi.io/movies/${id}`)
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


    return (
        <View>
            <Image style={{height: 300, width: 200}} source={{uri: dlPhim?.poster}}></Image>
            <Text>{dlPhim?.title}</Text>

            <TouchableOpacity onPress={()=>{navigation.goBack()}}> 
                <Text>QUay lai</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Detail

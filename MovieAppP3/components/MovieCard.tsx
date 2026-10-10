import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { kieuDLManHinh } from '../App'

export type Movie = {
    id: number,
    title: string,
    genre: string,
    year: number,
    rating: number,
    poster: string,
    isShowing: boolean
}

type MovieCardProps = {
    movie: Movie,
    layout?: "tile" | "row"
    onSelect: (id: string) => void
    
}

function MovieCard({ movie, layout = "row", onSelect}: MovieCardProps) {
    const navigation= useNavigation<NativeStackNavigationProp<kieuDLManHinh>>()
    
    let isRow = layout == "row"

    return (
        <>                                                                                          
        <TouchableOpacity style={[{flex:1},!isRow && {maxWidth:"50%"}]} 
                        // onSelect(movie.id.toString())
        onPress={() => { navigation.navigate("Detail",{id:movie.id.toString()}) }}>
            <View style={isRow ? styles.cardNgang : styles.cardDoc}>

                <View style={{ position: "relative" }}>
                    <Image style={isRow ? styles.imgNgang : styles.imgDoc} source={{ uri: movie.poster }}></Image>
                    {!isRow && <Text style={styles.nhanDan}>⭐{movie.rating.toFixed(1)}</Text>}
                </View>

                <View>
                    <Text>{movie.title}</Text>
                    {isRow && <View>
                        <Text>{movie.genre}</Text>
                        <Text>{movie.year}</Text>
                        <Text>⭐{movie.rating.toFixed(1)}</Text>
                    </View>}



                    <Text>{movie.isShowing ? "✅" : "❌"}</Text>
                </View>
            </View>
        </TouchableOpacity>
        </>
        

        
    )
}

const styles = StyleSheet.create({
    cardNgang: {
        flexDirection: "row",
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        padding: 8,
        margin: 8
    },
    cardDoc: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        padding: 8,
        margin: 8
    },

    imgNgang: {
        width: 70,
        height: 100,
        margin: 5
    },
    imgDoc: {
        width: "100%",
        aspectRatio: 2 / 3,

    },
    nhanDan: {
        position: "absolute",
        top: 6,
        right: 6,
        color: "white"
    },
    

})

export default MovieCard

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Movie } from '../App'

type MovieCardProps = {
    movie: Movie,
    layout?: "row" | "tile",
    onSelect: (id: string) => void
}

function MovieCard({ movie, layout = "row", onSelect }: MovieCardProps) {
    const isRow = layout == "row"
    return (
        <TouchableOpacity style={{flex:1}} onPress={() => { onSelect(movie.id.toString()) }}>

            <View style={[isRow ? styles.cardNgang : styles.cardDoc]}>

                <View>
                    <Image source={{ uri: movie.poster }} style={[isRow ? styles.imgNgang : styles.imgDoc]}></Image>
                    {!isRow && <Text style={styles.nhan}>⭐{movie.rating.toFixed(1)}</Text>}
                </View>

                <View>
                     {isRow && <Text>{movie.genre}</Text>}
                    {isRow && <Text>{movie.year}</Text>}
                    {isRow && <Text>⭐{movie.rating.toFixed(1)}</Text>}
                    <Text>{movie.isShowing ? "✅" : "❌"}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardNgang: {
        flexDirection: "row",
        flex:1,
        // width: "100%",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    cardDoc: {
        flex:1,
        // width: "100%",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderRadius: 10

    },
    imgNgang: {
        width: 70,
        height: 100,
        margin:5

    },
    imgDoc: {
        width: "100%",
        aspectRatio: 2 / 3

    },
    nhan: {
        position: "absolute",
        top: 10,
        right: 10,
        color: "white"
    }
})

export default React.memo(MovieCard)

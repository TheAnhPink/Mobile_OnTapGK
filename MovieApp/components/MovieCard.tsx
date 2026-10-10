    import React from 'react'
    import { Image, StyleSheet, Text,  TouchableOpacity, View } from 'react-native'

    export type KieuDLPhim = {
    id: number
    title: string
    genre: string
    year: number
    rating: number
    poster: string
    isShowing: boolean  
    }
    type movieProps={
        movie: KieuDLPhim,
        layout?: 'row' | 'tile'
        onSelect: (id: string)=>void
    }

    function MovieCard({movie,layout="row",onSelect}:movieProps) {
        const isRow= layout=='row'

    return (
        <TouchableOpacity style={{flex:1}} onPress={()=>{onSelect(movie.id.toString())}}>
            <View style={[isRow? styles.cardNgang:styles.card]}>
            <View style={[!isRow&& {position:"relative", width:200}]}>
                <Image style={isRow? styles.imgNgang: styles.imgDoc}  source={{uri:movie.poster}}></Image>
            
                {!isRow && <Text style={{position:"absolute", top:10,right:22, color: "yellow"}}>☆ {movie.rating.toFixed(1)}</Text>}
            
            </View>
            <View>
                <Text>{movie.title}</Text>
            <Text>{movie.genre}</Text>
            <Text>{movie.year}</Text>
            {isRow && <Text>{movie.rating.toFixed(1)}</Text>}
            <Text>{movie.isShowing?  "✅" : "❌"}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
    }

    const styles= StyleSheet.create({
        card:{
            alignItems: "center",
            justifyContent:"center",
            borderColor:"gray",
            borderWidth:1,
            borderRadius: 15,
            paddingBottom: 10,
            flex: 1

        },
        cardNgang:{
            flexDirection:"row"
        },
        imgDoc:{
            width:"90%",
            aspectRatio: 2/3,
            resizeMode: 'contain',
            margin: 10
        },
        imgNgang:{
            width:70,
            height:100,
            resizeMode: 'contain',
            margin: 10
        }
    })
    export default React.memo(MovieCard)

import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { dinhNghiaManHinh } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { kieuDLXe } from './ListProduct';

type Props= NativeStackScreenProps<dinhNghiaManHinh,"Detail">;

function ProductDetail({route}:Props) {
  const {id}= route.params
  const [xe, setXe]= useState<kieuDLXe>()
  useEffect(()=>{
    fetch(`https://6ab224c45b9b60f39d345cdd.mockapi.io/bicyclestore/${id}`)
    .then(resp=>resp.json())
    .then(data=>{setXe(data)})
    .catch(err=>{console.log(err)})
  },[])

  return (
    <View>
      <Image style={{aspectRatio:1/1}} source={{uri: xe?.poster}}></Image>
      <Text>{xe?.title}</Text>
      <Text>{xe?.price}</Text>
      <Text>{xe?.genre}</Text>
    </View>
  )
}

export default ProductDetail

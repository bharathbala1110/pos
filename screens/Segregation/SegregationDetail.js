import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function SegregationDetail() {
   const {params}= useRoute()
   console.log(params)
  return (
    <View>
      <Text>SegregationDetail</Text>
    </View>
  )
}
import React from "react"
import { View,Text } from "react-native"

function Comp1(props){
  console.log(props)
  return (
    <View>
      <Text>Comp2</Text>
    </View>
  )
}
export default Comp1
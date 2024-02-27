import React from "react"
import { View,Text,StyleSheet,Button } from "react-native"

function Comp1({navigation}){
  
  return (
    <View>
      <Text style={style.text}>Comp1</Text>
      <Button onPress={()=>navigation.navigate("comp2",{a:1,b:2})} title="跳转Com2"></Button>
    </View>
  )
}
const style = StyleSheet.create({
  text:{
    fontSize:20,
  }
})
export default Comp1
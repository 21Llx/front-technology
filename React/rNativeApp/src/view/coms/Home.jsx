import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Comp1 from "./comp1";
import Comp2 from "./comp2";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function Home() {
  /* //顶部导航
  return (
    <Stack.Navigator>
      <Stack.Screen options={{
        title: 'Comp1', headerStyle: { backgroundColor: "orange" }, headerRight: () => (
          <TouchableOpacity onPress={() => {
            Alert.alert("分享操作")
          }}>
            <Text>分享</Text>
          </TouchableOpacity>
        )
      }} name="comp1" component={Comp1} />
      <Stack.Screen name="comp2" component={Comp2} />
    </Stack.Navigator>
  ) */
  // 底部导航
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="comp1" component={Comp1} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="comp2" component={Comp2} />
    </Tab.Navigator>
  )
}
const style = StyleSheet.create({
  text: {
    fontSize: 20,
  }
})
export default Home
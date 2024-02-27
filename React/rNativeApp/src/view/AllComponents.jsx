import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  Switch,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Modal,
  RefreshControl,
  Alert
} from 'react-native';
// style={{width:"100%",height:"100%",}}
export default function AllCom() {
  let [text, setText] = useState('xxx');
  let [switchValue, setSwitchValue] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVis, setModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i,
      name: `item${i + 1}`,
    });
  }
  useEffect(() => {});
  const _onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log(123213)

    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={style.box}>
      <ImageBackground style={style.box1}>
        <Text
          onPress={() => {
            console.log('rwerewrewr');
          }}>
          rewrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        </Text>
        <ActivityIndicator
          color="blue"
          size="large"
          animating={false}></ActivityIndicator>
      </ImageBackground>
      <View style={style.box2}>
        <Image
          style={style.image1}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}></Image>
        <Image
          blurRadius={10}
          fadeDuration={3000}
          style={style.image1}
          source={require('../assets/images/work.webp')}></Image>
      </View>
      <View style={style.box4}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          value={text}
          // textAlign={"right"}
          clearButtonMode={'always'}
          // multilinewq
          onChangeText={e => {
            setText(e);
          }}></TextInput>
        <Text>{text}</Text>
      </View>
      <ScrollView style={style.box5}>
        <Button
          title="按钮1"
          onPress={() => {
            console.log('按钮1点击');
            console.log(modalVis);
            // setModalVis(true);
            Alert.alert(
              "Alert Title",
              "My Alert Msg",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }}></Button>
        <Switch
          value={switchValue}
          onValueChange={e => {
            setSwitchValue(e);
          }}></Switch>
      </ScrollView>
      <View style={style.box4}>
        <FlatList
          style={{height: '100%'}}
          data={list}
          renderItem={({item, index}) => {
            const backgroundColor =
              item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
            return (
              <View style={style.item}>
                <Text
                  onPress={() => {
                    setSelectedId(item.id);
                  }}
                  style={{backgroundColor}}>
                  {index}--{item.name}
                </Text>
              </View>
            );
          }}
          refreshing={refreshing}
          onRefresh={()=>{
            console.log(123)
            return <RefreshControl refreshing={refreshing} onRefresh={_onRefresh}></RefreshControl>
           }} 
          >
           
          </FlatList>
      </View>
      <ImageBackground
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={style.box4}></ImageBackground>
      <View style={style.box3}></View>
      <Modal
        visible={modalVis}
        animationType="slide"
        onRequestClose={() => {
          console.log('qweqwe');
          setModalVis(false);
        }}>
        <View>
          <Text>弹框内容</Text>
          <Button
            title="关闭弹框"
            onPress={() => {
              setModalVis(false);
            }}></Button>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
  },
  box1: {
    flex: 1,
    backgroundColor: 'red',
  },
  box2: {
    flex: 1,
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
  },
  box3: {
    flex: 3,
    backgroundColor: 'pink',
  },
  box4: {
    flex: 2,
    backgroundColor: '#fff',
  },
  box5: {
    flex: 1,
    backgroundColor: 'orange',
  },
  image1: {
    width: '20%',
    height: '50%',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'orange',
  },
});

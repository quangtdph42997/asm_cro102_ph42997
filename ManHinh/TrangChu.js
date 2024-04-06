import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
export const URL = 'http://192.168.0.103:3000';
const TrangChu = ({ navigation }) => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [listChauCay, setlistChauCay] = useState([])
  const [listPhuKien, setlistPhuKien] = useState([])

 
  const getCay = async()=>{
    await fetch(URL + `/cayTrong`)
      .then(res => res.json())
      .then(data => {
        setdata(data)
        setloading(false)
      }).catch(err => console.log(err))
  }
  const getChau= async()=>{
    await fetch(URL + `/chauCay`)
      .then(res => res.json())
      .then(data => {
        setlistChauCay(data)
        setloading(false)
      }).catch(err => console.log(err))
  }
  const getPhu= async()=>{
    await fetch(URL + `/phuKien`)
      .then(res => res.json())
      .then(data => {
        setlistPhuKien(data)
        setloading(false)
      }).catch(err => console.log(err))
  }
  useEffect(() => {
    getCay()
    getChau()
    getPhu()
  }, [])

  const renderCayTrong = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('chiTietCt',{item : item})}>
      <View style={{ margin: 20 }}>
        <Image style={{ width: 180, height: 170, backgroundColor: '#CCCCCC', borderRadius: 10, padding: 20 }} source={{ uri: `${item.img}` }} />
        <Text style={{ fontSize: 19, color: 'black', marginTop: 10 }}>{item.name}</Text>
        {item.status ? <Text>Ưa Bóng</Text> : <Text>Ưa sáng</Text>}
        <Text style={{ color: 'green', fontSize: 19 }}>{item.money}đ</Text>
      </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.conner}>
      <ScrollView>
        <Image source={require('../Img/image_9.png')} style={{ width: '100%', marginTop: 115, marginBottom: 20 }} />
        <Text style={[styles.txt, { position: 'absolute', top: 50 }]}>Planta - toả sáng{'\n'}không gian nhà bạn{'\n'}
          <TouchableOpacity onPress={()=>navigation.navigate('xemHangMv')}>
            <Text style={[{ color: 'green', fontSize: 18 }]}>Xem hàng mới về -{'>'}</Text></TouchableOpacity></Text>
            <TouchableOpacity style={{position: 'absolute',alignSelf:'flex-end',margin:50,right:0}} onPress={()=>navigation.navigate('gioHang')}>
            <Image style={{width:30,height:30,}} source={require('../Img/cart.png')}/>
</TouchableOpacity>
        <Text style={styles.txt}>Cây Trồng</Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={item => item.id}
          numColumns={2}
          data={data.filter((item, index) => index < 4)}
          renderItem={renderCayTrong}
        />
        <TouchableOpacity onPress={() => navigation.navigate('xemThemCt', { data: data })}>
          <Text style={{ textAlign: 'right', margin: 20, textDecorationLine: 'underline', fontSize: 20, color: 'black' }}>Xem thêm cây trồng</Text>
        </TouchableOpacity>

        <Text style={styles.txt}>Chậu Cây Trồng</Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={item => item.id}
          numColumns={2}
          data={listChauCay.filter((item, index) => index < 6)}
          renderItem={renderCayTrong}
        />
        <TouchableOpacity onPress={() => navigation.navigate('xemThemChauCt', { data: listChauCay })}>
          <Text style={{ textAlign: 'right', margin: 20, textDecorationLine: 'underline', fontSize: 20, color: 'black' }}>Xem thêm chậu cây trồng</Text>
        </TouchableOpacity>

        <Text style={styles.txt}>Phụ kiện chăm sóc</Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={item => item.id}
          numColumns={2}
          data={listPhuKien.filter((item, index) => index < 6)}
          renderItem={renderCayTrong}
        />
        <TouchableOpacity onPress={() => navigation.navigate('xemThemChauCt', { data: listPhuKien })}>
          <Text style={{ textAlign: 'right', margin: 20, textDecorationLine: 'underline', fontSize: 20, color: 'black' }}>Xem thêm Phụ kiện</Text>
        </TouchableOpacity>
        <Text style={styles.txt}>Combo chăm sóc (Mới)</Text>
        <Image style={{width:400,margin:20}} source={require('../Img/Frame2419.png')}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TrangChu

const styles = StyleSheet.create({
  conner: {
    color: 'white'
  },
  txt: {
    fontSize: 25,
    color: 'black',
    marginLeft: 25,
    margin: 2,
  }
})
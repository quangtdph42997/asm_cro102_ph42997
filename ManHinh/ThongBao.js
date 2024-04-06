import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu'

const ThongBao = () => {
  const [data, setdata] = useState([])
  const getlist =()=>{
    fetch(URL+'/notices')
    .then(res=>res.json())
    .then(data=>{
      setdata(data)
    }).catch(err=>console.log(err))
  }
  useEffect(()=>{
    getlist()
  },[])


  const renderItem =({item})=>{
    return(
      <View>
      <View style={{backgroundColor:'gray',height:1, width:'100%'}}/>
      <View style={{ flexDirection: 'row', margin: 10, padding: 10, }}>
        <Image style={{ width: 100, height: 100, backgroundColor: '#DDDDDD', borderRadius: 20, marginRight: 20 }} source={{ uri: item.anhHd }} />
        <View style={{}}>
          <Text style={[styles.txt,{color:'green'}]}>Đặt hàng thành công</Text>
          <Text style={styles.txt}>{item.tenHd}</Text>
          <Text style={styles.txt}>{item.countHd} sản phẩm</Text>

          </View>
      </View></View>
    )
  }
  return (
    <ScrollView>
      <Text style={{textAlign:'center',fontSize:20,color:'black',margin:20}}>Thông báo</Text>
      <FlatList 
      data={data}
      renderItem={renderItem}
      scrollEnabled={false}
      />
    </ScrollView>
  )
}

export default ThongBao

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 18,
    margin: 3
  }
})
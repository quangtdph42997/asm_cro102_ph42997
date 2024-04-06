import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu'

const GioHang = ({ navigation }) => {

  const [dem, setdem] = useState(0)
  const [data, setdata] = useState([])
  const handleTang = () => {
    setdem(dem + 1)

  }
  const tongTien = data.reduce((accumulator, currentValue) => accumulator + currentValue.tongTien, 0);
  const getData = async () => {
    await fetch(URL + '/cart')
      .then(res => res.json())
      .then(data => {
        setdata(data)
      }).catch(err => console.log(err))
  }



  useEffect(() => {
    getData()
  }, [])

  const handDelete = (id) => {
    fetch(URL + '/cart/' + id, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          getData()
          Alert.alert("Xóa khỏi giỏ hàng thành công")
        } else {
          Alert.alert("Xóa khỏi giỏ hàng khong thành công")
        }
      })
  }

  const handleDeleteAll = () => {
    Alert.alert(
      'Xác nhận',
      'Xóa tất cả các đơn hàng?',


      [
        {
          text: 'Hủy bỏ',
          onPress: () => ToastAndroid.show('Hủy xóa', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            const deletedItems = data.filter(item => item.isChecked);
            try {
              // Lặp qua từng mục được chọn và gửi yêu cầu DELETE đến cơ sở dữ liệu
              for (const item of deletedItems) {
                await fetch(URL + '/cart/' + item.id, {
                  method: 'DELETE'
                });
              }
              const updatedCart = data.filter(item => !item.isChecked);
              setdata(updatedCart);
              ToastAndroid.show('Đã xóa', ToastAndroid.SHORT);
            } catch (error) {
              console.log('Lỗi khi xóa dữ liệu:', error);
            }
          },


        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => {
    setdem(item.count)

    return (
      <View style={{ flexDirection: 'row', margin: 10, borderWidth: 1, padding: 10, borderRadius: 20, borderColor: 'gray' }}>
        <Image style={{ width: 100, height: 100, backgroundColor: '#DDDDDD', borderRadius: 20, marginRight: 20 }} source={{ uri: item.anhCrat }} />
        <View style={{}}>
          <Text style={styles.txt}>{item.tenCrat}</Text>
          <Text style={[styles.txt, { color: 'green' }]}>{item.giaCrat}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity
                // onPress={() => { handleGiam() }}
                style={styles.btn}>
                <Image source={require('../Img/subtract.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={{ fontSize: 19, color: 'black', marginHorizontal: 20 }}>{item.count}</Text>
              <TouchableOpacity
                onPress={() => { handleTang() }}
                style={styles.btn}>
                <Image source={require('../Img/add.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              id = item.id
              handDelete(id)
            }}>
              <Text style={[styles.txt, { marginLeft: 100, textDecorationLine: 'underline' }]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{ width: 20, height: 20 }}
                source={require('../Img/back.png')} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Giỏ hàng</Text>
            <TouchableOpacity style={{ width: 50 }}
              onPress={() => handleDeleteAll()}
            >
              <Image style={{ width: 26, height: 26 }}
                source={require('../Img/delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={data}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <View style={{ margin: 10, position: 'absolute', top: 680, width: '95%', backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.txt}>Tạm tính: </Text>
          <Text style={[styles.txt, { color: 'green' }]}>{tongTien}đ</Text>
        </View>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('PaymentScreen',{tongTien: tongTien})
        }}>
        <Text style={{ backgroundColor: 'green', fontSize: 18, padding: 10, color: 'white', borderRadius: 10 }}>Tiến hành thanh toán</Text>
     </TouchableOpacity> 
     </View>
    </View>

  )
}

export default GioHang

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    color: 'white', marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20
  },
  icon: {
    width: 10,
    height: 10
  },
  btn: {
    padding: 9,
    borderRadius: 4,
    borderWidth: 2,
  },
  txt: {
    color: 'black',
    fontSize: 18,
    margin: 3
  }
})
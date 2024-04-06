import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu';

const ChiTietCayTrong = ({ navigation, route }) => {
  const { item } = route.params;

  const [count, setcount] = useState(0)
  const [TongTien, setTongTien] = useState(0)

  const themGioHang = async()=>{

    const newCart ={
      anhCrat: item.img,
      tenCrat: item.name,
      giaCrat: item.money,
      count : count,
      tongTien: TongTien
    }
    try{
     const res= await fetch(URL+`/cart`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(newCart)
      })
      if(res.ok){
        console.log("Thêm thành công");
      }else{
          console.log("Thêm thất bại");
      }

    }catch(err){
      console.log(err);
    }
  }

  const handleTang = () => {
    setcount(count + 1);
  }

  const handleGiam = () => {
    count > 0 ? setcount(count - 1) : setcount(count);
  }

  const getTongTien = () => {
    const Tong = (item.money) * count;
    setTongTien(Tong);
  }


  useEffect(() => {
    getTongTien()
  }, [count])


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ width: 20, height: 20 }}
              source={require('../Img/back.png')} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
          <TouchableOpacity style={{ width: 50 }}
          onPress={()=>navigation.navigate('gioHang')}
          >
            <Image style={{ width: 26, height: 26 }}
              source={require('../Img/cart.png')} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: '#E8E8E8', height: 280, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image style={{ width: 230, height: 250 }} source={{ uri: `${item.img}` }} />

        </View>

        <View style={{ margin: 10 }}>
          {item.type ? <Text style={{ fontSize: 20, backgroundColor: 'green', color: 'white', width: 120, textAlign: 'center', padding: 5, borderRadius: 10 }}>Sản Phẩm</Text> : <Text style={{ fontSize: 20, backgroundColor: 'green', color: 'white', width: 120, textAlign: 'center', padding: 5, borderRadius: 10 }}>Cầy Trồng</Text>}
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <Text style={{ fontSize: 25, color: 'green' }}>{item.money}đ</Text>
          <Text style={{ fontSize: 19, color: 'black', marginTop: 20 }}>Chi tiết sản phẩm</Text>
          <View style={{ backgroundColor: 'black', height: 2, marginTop: 5 }} />
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 19, color: 'black' }}>Kích cỡ</Text>
            <Text style={{ fontSize: 19, color: 'black' }}>{item.size}</Text>
          </View>
          <View style={{ backgroundColor: 'gray', height: 2, marginTop: 5 }} />

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 19, color: 'black' }}>Xuất Xứ</Text>
            <Text style={{ fontSize: 19, color: 'black' }}>{item.from}</Text>
          </View>
          <View style={{ backgroundColor: 'gray', height: 2, marginTop: 5 }} />

          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 19, color: 'black' }}>Tình trạng</Text>
            <Text style={{ fontSize: 19, color: 'black' }}>{item.quantity}</Text>
          </View>
          <View style={{ backgroundColor: 'gray', height: 2, marginTop: 5 }} />
        </View>
        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 19 }}>Đã chon {count} sản phẩm</Text>
            <Text style={{ fontSize: 19 }}>Tạm tính</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '42%' }}>
              <TouchableOpacity
                onPress={() => { handleGiam() }}
                style={styles.btn}>
                <Image source={require('../Img/subtract.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={{ fontSize: 19, color: 'black' }}>{count}</Text>
              <TouchableOpacity
                onPress={() => { handleTang() }}
                style={styles.btn}>
                <Image source={require('../Img/add.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 25, color: 'black' }}>{TongTien}đ</Text>
          </View>

        </View>

        <TouchableOpacity
          onPress={() => {
            if (count == 0) {
              Alert.alert("Thông Báo", "Vui lòng chọn số lượng")
            } else {
              Alert.alert("Đã thêm vào giỏ hàng")
              themGioHang()
            }

          }}
          style={{ borderRadius: 9, padding: 12, margin: 10, alignItems: 'center', backgroundColor: count == 0 ? 'gray' : 'green' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Chọn Mua</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ChiTietCayTrong

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
  }
})
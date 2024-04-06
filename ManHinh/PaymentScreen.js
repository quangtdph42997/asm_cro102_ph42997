import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { URL } from './TrangChu';

const PaymentScreen = ({ navigation, route }) => {
  const {tongTien} = route.params
  const { totalPrice, data } = route.params;
  const initialUsername = route.params?.username || '';
  const initialEmail = route.params?.email || '';
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [address, setAddress] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedPay, setSelectedPay] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [showErrors, setshowErrors] = useState(false);
  const [errors, seterrors] = useState({});
  const total = tongTien+shippingFee

  // useEffect(() => {
  //   const getLoginInfo = async () => {
  //     try {
  //       const username = await AsyncStorage.getItem('username');
  //       const email = await AsyncStorage.getItem('email');
  //       if (username !== null && email !== null) {
  //         setusername(username);
  //         setEmail(email);

  //       } else {
  //         // Nếu không tìm thấy email trong AsyncStorage, cập nhật email thành giá trị ban đầu
  //         setEmail(initialEmail);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getLoginInfo();
  // }, []);

  // const onPayment = async () => {
  //   const resopnseCart = await fetch(URL/cart);
  //   const dataCart = await resopnseCart.json();
  //   const listIdCart = dataCart.map(item => item.id);
  //   if(listIdCart.length){
  //     for (let i = 0; i < listIdCart.length; i++) {
  //       const id = listIdCart[i];
  //       await fetch(`${URL}/carts/${id}`, {method: 'DELETE'})
  //     }
  //   }
  //   for (let i = 0; i < data.length; i++) {
  //     const element = data[i];
  //     let totalPrice = 0;
  //     for (let j = 0; j < element.giaSP.length; j++) {
  //       const {price, size} = element.giaSP[j];
  //       totalPrice += (Number(price) * (element.data[size] || 0))
  //     }
  //     if(totalPrice){
  //       await fetch(`${URL}/orders`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           idSP: element.idSP,
  //           createAt: Date.now()+"",
  //           data: element.data,
  //           totalPrice: Number(totalPrice.toFixed(2))
  //         })
  //       })
  //     }
  //   }
   
  // }

  const getErrors = (email, username, sdt, address) => {
    const errors = {};

    if (!email) {
      errors.email = "Vui lòng nhập Email"
    } else if (!email.includes('@') || !email.includes('.')) {
      errors.email = "Email không hợp lệ";
    }

    if (!username) {
      errors.username = "Vui lòng nhập Username"
    } else if (username.length < 6) {
      errors.username = "Username phải có tối thiểu 6 ký tự"
    }

    if (!sdt) {
      errors.sdt = "Vui lòng nhập số điện thoại"
    } else if (sdt.length > 10) {
      errors.sdt = "Số điện thoại chỉ chứa tối đa 10 ký tự"
    }

    if (!address) {
      errors.address = "Vui lòng nhập địa chỉ"
    }
    return errors;
  }



  const handelSave =  () => {
    navigation.navigate('BankCardScreen',
    {username: username,
      email:email,
      address: address,
       sdt: sdt,
       tongTien: tongTien,
       shippingFee: shippingFee, 
       total:total,
       shippingMethod:selectedShippingMethod})
  }
    

  const handleShippingMethodSelection = (method) => {
    if (method === 'Giao hàng nhanh') {
      setShippingFee(15000); // Cập nhật phí vận chuyển cho giao hàng nhanh
    } else if (method === 'Giao hàng COD') {
      setShippingFee(20000); // Cập nhật phí vận chuyển cho giao hàng COD
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{ width: 20, height: 20 }}
                source={require('../Img/back.png')} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Thanh Toán</Text>
           <Text></Text>
          </View>
        </View>

      <View style={{ marginHorizontal: 20 }}>
        {/* Thông tin khách hàng */}

        <ScrollView>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal' }}>Thông tin khách hàng</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

          <TextInput
            style={styles.text}
            value={username}
            onChangeText={(txt) => { setusername(txt) }}
            placeholder="Họ và tên"
            placeholderTextColor="gray"
          />
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
          {showErrors && errors && errors.username && (
            <Text style={{ fontSize: 16, color: 'red' }}>
              {errors.username}
            </Text>
          )}

          <TextInput
            style={styles.text}
            value={email}
            onChangeText={(txt) => { setEmail(txt) }}
            placeholder="Email"
            placeholderTextColor="gray"
          />
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
          {showErrors && errors && errors.email && (
            <Text style={{ fontSize: 16, color: 'red' }}>
              {errors.email}
            </Text>
          )}

          <TextInput
            style={styles.text}
            value={sdt}
            onChangeText={(txt) => { setSdt(txt) }}
            placeholder="Số điện thoại"
            placeholderTextColor="gray"
          />
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
          {showErrors && errors && errors.sdt && (
            <Text style={{ fontSize: 16, color: 'red' }}>
              {errors.sdt}
            </Text>
          )}
          <TextInput
            style={styles.text}
            value={address}
            onChangeText={(txt) => { setAddress(txt) }}
            placeholder="Địa chỉ"
            placeholderTextColor="gray"
          />
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
          {showErrors && errors && errors.address && (
            <Text style={{ fontSize: 16, color: 'red' }}>
              {errors.address}
            </Text>
          )}
          {/* Phương thức vận chuyển */}
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', marginTop: 20 }}>Phương thức vận chuyển</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

          <TouchableOpacity onPress={() => { handleShippingMethodSelection('Giao hàng nhanh'); setSelectedShippingMethod('Giao hàng nhanh'); }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.shippingMethod, selectedShippingMethod === 'Giao hàng nhanh' && styles.selectedShippingMethod]}>
                Giao hàng nhanh - 15.000đ
              </Text>
              {selectedShippingMethod === 'Giao hàng nhanh' && <Image source={require('../Img/check.png')} style={{ marginLeft: 120, width: 30, height: 30, top: 20 }} />}
            </View>
          </TouchableOpacity>

          <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', }}>Dự kiến giao hàng 10-15/3</Text>


          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

          <TouchableOpacity onPress={() => { handleShippingMethodSelection('Giao hàng COD'); setSelectedShippingMethod('Giao hàng COD'); }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.shippingMethod, selectedShippingMethod === 'Giao hàng COD' && styles.selectedShippingMethod]}>
                Giao hàng COD - 20.000đ
              </Text>
              {selectedShippingMethod === 'Giao hàng COD' && <Image source={require('../Img/check.png')} style={{ marginLeft: 120, width: 30, height: 30, top: 20 }} />}
            </View>
          </TouchableOpacity>

          <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', }}>Dự kiến giao hàng 8-10/3</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
          {/* Hình thức thanh toán */}

          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', marginTop: 20 }}>Hình thức thanh toán</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

          <TouchableOpacity onPress={() => setSelectedPay('VISA')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.shippingMethod, selectedPay === 'VISA' && styles.selectedShippingMethod]}>
                Thẻ VISA/MASTERCREDIT
              </Text>
              {selectedPay === 'VISA' && <Image source={require('../Img/check.png')} style={{ marginLeft: 120, width: 30, height: 30, top: 10 }} />}
            </View>
          </TouchableOpacity>


          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

          <TouchableOpacity onPress={() => setSelectedPay('ATM')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[styles.shippingMethod, selectedPay === 'ATM' && styles.selectedShippingMethod]}>
                Thẻ ATM
              </Text>
              {selectedPay === 'ATM' && <Image source={require('../Img/check.png')} style={{ marginLeft: 250, width: 30, height: 30, top: 20 }} />}
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>


      {/* Thanh toán */}

      <View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginHorizontal: 20 }}>

          <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal' }}>Tạm tính</Text>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>{tongTien} đ</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

          <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal' }}>Phí vận chuyển</Text>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>{shippingFee} đ</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>

          <Text style={{ color: 'gray', fontSize: 20, fontWeight: 'normal' }}>Tổng cộng</Text>
          <Text style={{ color: 'green', fontSize: 18, fontWeight: 'normal' }}>{total} đ</Text>
        </View>

        <TouchableOpacity onPress={() => handelSave()}
          style={{ backgroundColor: "green", width: '95%', margin: 10, borderRadius: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, padding: 10, fontWeight: 'bold' }}>Tiếp tục </Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: "black",
    marginTop: 5,
    marginLeft: 130
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  shippingMethod: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 15,
  },
  selectedShippingMethod: {
    color: 'green',
    fontWeight: 'bold',
  },
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

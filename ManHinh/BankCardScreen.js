import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu';

const BankCardScreen = ({ navigation, route }) => {
  const { username, email, address, sdt, tongTien, shippingFee, total, shippingMethod } = route.params
  const [soThe, setSoThe] = useState('');
  const [chuThe, setChuThe] = useState('');
  const [ngay, setNgay] = useState('');
  const [CVV, setCVV] = useState('');
  const [listCart, setlistCart] = useState([])

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  useEffect(() => {
    getList()
  }, [])
  const getErrors = (soThe, chuThe, ngay, CVV) => {
    const errors = {};

    if (!soThe) {
      errors.soThe = "Vui lòng nhập số thẻ"
    }

    if (!chuThe) {
      errors.chuThe = "Vui lòng nhập tên chủ thẻ"
    }

    if (!ngay) {
      errors.ngay = "Vui lòng nhập ngày hết hạn"
    }

    if (!CVV) {
      errors.CVV = "Vui lòng nhập CVV"
    }

    return errors;
  }

  const getList = async () => {
    await fetch(URL + '/cart')
      .then(res => res.json())
      .then(data => {
        setlistCart(data)
      }).catch(err => console.log(err))
  }

  const getThongBao = async () => {
    for (const ds of listCart) {
      const newData = {
        anhHd: ds.anhCrat,
        tenHd: ds.tenCrat,
        giaHd: ds.giaCrat,
        countHd: ds.count,
        tongTienHd: ds.tongTien
      }

      try {
        const res = await fetch(URL + '/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData)
        })
        if (res.ok) {
          console.log("Thêm thành công");
        } else {
          console.log("Thêm thất bại");
        }

      } catch (err) {
        console.log(err);
      }

    }

  }

  const handleSave = () => {
    getThongBao()
  };

  const handleConfirm = () => {
    Alert.alert(
      'Xác nhận',
      'Xác nhận thanh toán?',
      [
        {
          text: 'Hủy bỏ',
          onPress: () => ToastAndroid.show('Hủy', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: handleSave,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
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
          <ScrollView>
            <Text style={styles.sectionTitle}>Nhập thông tin thẻ</Text>
            <View style={styles.separator} />

            <TextInput
              style={styles.textInput}
              value={soThe}
              onChangeText={setSoThe}
              placeholder="Nhập số thẻ"
              placeholderTextColor="gray"
            />
            {showErrors && errors.soThe && (
              <Text style={styles.errorText}>{errors.soThe}</Text>
            )}

            <TextInput
              style={styles.textInput}
              value={chuThe}
              onChangeText={setChuThe}
              placeholder="Tên chủ thẻ"
              placeholderTextColor="gray"
            />
            {showErrors && errors.chuThe && (
              <Text style={styles.errorText}>{errors.chuThe}</Text>
            )}

            <TextInput
              style={styles.textInput}
              value={ngay}
              onChangeText={setNgay}
              placeholder="Ngày hết hạn"
              placeholderTextColor="gray"
            />
            {showErrors && errors.ngay && (
              <Text style={styles.errorText}>{errors.ngay}</Text>
            )}

            <TextInput
              style={styles.textInput}
              value={CVV}
              onChangeText={setCVV}
              placeholder="CVV"
              placeholderTextColor="gray"
            />
            {showErrors && errors.CVV && (
              <Text style={styles.errorText}>{errors.CVV}</Text>
            )}

            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
            <View style={styles.separator} />
            <Text style={styles.userInfoText}>{username}</Text>
            <Text style={styles.userInfoText}>{email}</Text>
            <Text style={styles.userInfoText}>{address}</Text>
            <Text style={styles.userInfoText}>{sdt}</Text>

            <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
            <View style={styles.separator} />
            <Text style={styles.shippingMethodText}>{shippingMethod}</Text>
            <Text style={styles.deliveryEstimateText}>(Dự kiến giao hàng 10-15/3)</Text>
          </ScrollView>
        </View>

        <View>
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Tạm tính</Text>
            <Text style={styles.totalText}>{tongTien} đ</Text>
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Phí vận chuyển</Text>
            <Text style={styles.totalText}>{shippingFee} đ</Text>
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Tổng cộng</Text>
            <Text style={[styles.totalText, styles.totalAmount]}>{total} đ</Text>
          </View>

          <TouchableOpacity onPress={handleConfirm} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default BankCardScreen;

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
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginTop: 20
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 5
  },
  textInput: {
    fontSize: 16,
    marginTop: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  errorText: {
    fontSize: 16,
    color: 'red'
  },
  userInfoText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 10
  },
  shippingMethodText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 15
  },
  deliveryEstimateText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'normal',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15
  },
  totalText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'normal'
  },
  totalAmount: {
    color: 'green'
  },
  continueButton: {
    backgroundColor: "green",
    width: '95%',
    margin: 10,
    borderRadius: 10
  },
  continueButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold'
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
});

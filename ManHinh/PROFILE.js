import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PROFILE = ({navigation}) => {
  return (
      <ScrollView style={styles.conner}>
      <Text style={{textAlign:'center',color:'black',fontSize:18,margin:20}}>PROFILE</Text>

      <View style={{flexDirection:'row'}}>
        <Image style={{width:50,height:50,borderRadius:50,marginRight:30}}
         source={{uri:'https://cdnphoto.dantri.com.vn/YAfcu9nd4T5dX06hhpaf19_QvY8=/thumb_w/960/2021/05/15/co-gai-noi-nhu-con-vi-anh-can-cuoc-xinh-nhu-mong-nhan-sac-ngoai-doi-con-bat-ngo-hon-2-1621075314070.jpg'}}/>
        <Text style={{fontSize:18,color:'black'}}>Đào Duy Minh Long
          {'\n'}
          <Text style={{fontSize:17,color:'gray'}}>long@gamil.com</Text>
        </Text>
        </View>
        <Text style={styles.txt2}>Chung</Text>
        <View style={{backgroundColor:'gray',height:1,marginVertical:5}}/>
        <Text style={styles.txt1}>Chỉnh sửa thông tin</Text>
        <Text style={styles.txt1}>Câm nang trồng cây</Text>
        <Text style={styles.txt1}>Lịch sử giao dịch</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('qanda')}>
        <Text style={styles.txt1}>Q & A</Text></TouchableOpacity>
        <Text style={styles.txt2}>Bảo mật và Điều Khoản</Text>
        <View style={{backgroundColor:'gray',height:1,marginVertical:5}}/>
        <Text style={styles.txt1}>Điều khoản và điều kiện</Text>
        <Text style={styles.txt1}>Chính sách riêng tư</Text>
        <Text style={[styles.txt1,{color:'red'}]}>Đăng Xuất</Text>
        </ScrollView>
  )
}

export default PROFILE

const styles = StyleSheet.create({
  conner:{
    marginHorizontal:50
  },
  txt1:{
    fontSize:17,
    marginVertical:10,
    color:'black'
  },txt2:{
    fontSize:17,
    marginTop:50,
  }
})
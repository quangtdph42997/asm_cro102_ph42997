import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { URL } from './TrangChu';

const DangKy = ({navigation}) => {
    const [getpass, setpass] = useState('')
    const [getemail, setemail] = useState('');
    const [getErrStr, setErrStr] = useState('');
    const [getModalVisible, setModalVisible] = useState(false);
    const [getPassVisible, setPassVisible] = useState(false);
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')

    const handleAddUser = () => {
        if (name.trim() == '') {
            setErrStr('Name không được bỏ trống!');
            return;
        }
        if (getemail.trim() == '') {
            setErrStr('Email không được bỏ trống!');
            return;
        }
        if (phone.trim() == 'Phone không được bỏ trống!') {
            setErrStr('');
            return;
        }
        if (getpass.trim() == '') {
            setErrStr('Pass không được bỏ trống!');
            return;
        }

        // Tạo một đối tượng chứa dữ liệu của user mới
        const newUser = {
            name: name,
            email: getemail,
            phone: phone,
            pass: getpass,
        }
        // gọi API để thêm user mới vào JSON SERVER
        let url = `${URL}/users`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => {
                if (res.ok) {
                    ToastAndroid.show('Đăng ký thành công',0);
                    navigation.navigate('dangNhap',{
                        email: getemail
                    })
                    setErrStr('')
                } else {
                    Alert.alert('Error', 'Đăng ký không thành công');
                }
            })

    }

    return (
        <ScrollView style={styles.contenner}>
            <Image style={styles.img} source={require('../Img/Ellipse1.png')} />

            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: 'black', margin: 10 }}>Đăng ký{'\n'}
                <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'black' }}>Tạo tài Khoản</Text>
            </Text>
            <TextInput style={styles.input} placeholder='Họ tên' onChangeText={(txt)=>setname(txt)}/>
            <TextInput style={styles.input} placeholder='E - mail' onChangeText={(txt)=>setemail(txt)}/>
            <TextInput style={styles.input} placeholder='Số điện thoại' onChangeText={(txt)=>setphone(txt)}/>
            <TextInput style={styles.input} placeholder='Mật khẩu' onChangeText={(txt)=>setpass(txt)}/>
            <Text style={{color:'red',fontSize:15,margin:10}}>{getErrStr}</Text>
            
            <Text style={{textAlign:'center',color:'black',fontSize:15,margin:10}}>Để đăng ký tài khoản, bạn đồng ý <Text style={{color:'green',textDecorationLine:'underline'}}>Terms & {'\n'}Conditions <Text style={{color:'black',textDecorationLine:'none'}}>and</Text> Privacy Policy</Text></Text>

            <TouchableOpacity style={{alignItems:'center',margin:10}} onPress={()=>handleAddUser()}>
            <Text style={{fontSize:30,fontWeight:'bold',color:'white',backgroundColor:'green',width:400,textAlign:'center',padding:5,borderRadius:10}}>Đăng Ký</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:2,backgroundColor:'green',height:1,margin:10}}></View>
                <Text style={{color:'black',fontWeight:'bold'}}>Hoặc</Text>
                <View style={{flex:2,backgroundColor:'green',height:1,margin:10}}></View>
            </View>
            <View style={{flexDirection:'row',margin:10,justifyContent:'center'}}>
                <TouchableOpacity>
                <Image style={{marginRight:15}} source={require('../Img/fb.png')}/></TouchableOpacity>
                <TouchableOpacity>
                <Image source={require('../Img/gog.png')}/></TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",justifyContent:'center'}}>
            <Text style={{fontSize:15,margin:10,color:'black'}}>Bạn đã có tài khoản 
            </Text>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('dangNhap')}>
            <Text style={{color:'green',fontSize:15}}>Đăng nhập</Text></TouchableOpacity>
            </View>
        </ScrollView>
  )
}

export default DangKy

const styles = StyleSheet.create({
    contenner: {
    },
    img: {
        width: '100%',
        height: 250
    },
    input: {
        alignItems: 'center',
        borderColor: '#252A32',
        borderWidth: 1,
        width: '95%',
        borderRadius: 8,
        color: 'black',
        marginTop: 20,
        paddingStart: 20,
        fontWeight: 'bold',
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    input1: {
        fontWeight: 'bold',
        paddingStart: -2,
        width: '90%',
        color: 'black',
    },
    eyeImage: {
        width: 20,
        height: 20,
        tintColor: 'gray'
    },
})
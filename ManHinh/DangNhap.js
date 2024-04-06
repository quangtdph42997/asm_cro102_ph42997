import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './TrangChu';

const DangNhap = ({navigation}) => {
    const [getpass, setpass] = useState('')
    const [getemail, setemail] = useState('');
    const [getErrStr, setErrStr] = useState('');
    const [getModalVisible, setModalVisible] = useState(false);
    const [getPassVisible, setPassVisible] = useState(false);
    const [getcheckbox, setcheckbox] = useState(true);
    const [checkTK, setcheckTK] = useState(true)
    const [checkMK, setcheckMK] = useState(true)

    const btnDangNhap=()=>{
        if (getemail == '') {
            setErrStr('Email không được bỏ trống!');
            setModalVisible(true);
            return;
        }
        if (getpass == '') {
            setErrStr('Password không được bỏ trống!');
            setModalVisible(true);
            return;
        }
        // lấy dữ liệu về
        let url = `${URL}/users?email=` + getemail;

        fetch(url)
            .then((res) => { return res.json() })
            .then(async (res_login) => {
                if (res_login.length != 1) {
                    setErrStr('Email không chính xác!')
                    setModalVisible(true);
                    return;
                } else {
                    let obj = res_login[0];
                    if (obj.pass != getpass) {
                        setErrStr('Password không chính xác!');
                        setModalVisible(true);
                        return;
                    } else {
                        try {
                            await AsyncStorage.setItem('LoginInfo', JSON.stringify(obj));
                            navigation.navigate('menu')
                            setErrStr('')
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            })
    }

    return (
        <ScrollView style={styles.contenner}>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <Image style={styles.img} source={require('../Img/Ellipse2.png')} />

            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: 'black', margin: 10 }}>Chào Mừng Bạn{'\n'}
                <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'black' }}>Đang Nhạp Tài Khoản</Text>
            </Text>
            <TextInput style={styles.input} value={getemail} onChangeText={(txt=>setemail(txt))} placeholder='Nhập Email hoặc số điên thoại' />
            
            <View style={styles.input} >
                <TextInput style={styles.input1}
                    placeholder='Nhập Mật Khẩu'
                    placeholderTextColor={'#828282'}
                    onChangeText={(txt=>setpass(txt))}
                    secureTextEntry={getPassVisible ? false : true} />
                <TouchableOpacity
                    onPress={() => setPassVisible(!getPassVisible)}>
                    {getPassVisible
                        ?
                        <Image source={require('../Img/an.png')} style={styles.eyeImage} />
                        :
                        <Image source={require('../Img/hien.png')} style={styles.eyeImage} />}
                </TouchableOpacity>
            </View>
            <Text style={{color:'red',fontSize:15,margin:10}}>{getErrStr}</Text>
            <View style={{margin:10,flexDirection:'row'}}>
            <TouchableOpacity
            style={{marginRight:5}}
                    onPress={() => setcheckbox(!getcheckbox)}>
                    {getcheckbox
                        ?
                        <Image source={require('../Img/checkbox1.png')}/>
                        :
                        <Image source={require('../Img/checkbox2.png')}/>}
                </TouchableOpacity>
                <Text style={{}}>Nhớ Tài khoản</Text>
            <TouchableOpacity>
            <Text style={{color:'green',marginLeft:210}}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={{alignItems:'center',margin:10}} onPress={()=>{
                btnDangNhap()
            }
            }>
            <Text style={{fontSize:30,fontWeight:'bold',color:'white',backgroundColor:'green',width:400,textAlign:'center',padding:5,borderRadius:10}}>Đăng Nhập</Text>
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
            <Text style={{fontSize:15,margin:10,color:'black'}}>Bạn Không có tài khoản 
            </Text>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('dangKy')}>
            <Text style={{color:'green',fontSize:15}}>Tạo tài khoản</Text></TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

export default DangNhap

const styles = StyleSheet.create({
    contenner: {
        backgroundColor:'white',
    },
    img: {
        width: '100%',
        height: 400
    },
    input: {
        alignItems: 'center',
        borderColor: '#252A32',
        borderWidth: 1,
        width: '95%',
        borderRadius: 8,
        color: 'black',
        paddingStart: 20,
        fontWeight: 'bold',
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop:30
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
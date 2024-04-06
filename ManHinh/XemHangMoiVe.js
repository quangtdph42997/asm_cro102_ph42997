import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu'

const XemHangMoiVe = ({ navigation, route }) => {
    
    const [color1, setcolor1] = useState(false)
    const [color2, setcolor2] = useState(true)
    const [color3, setcolor3] = useState(false)
    const [color4, setcolor4] = useState(false)
    const [loc, setloc] = useState(`?new=0`)
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
      const url = URL + `/cayTrong`
      fetch(url+loc)
        .then(res => res.json())
        .then(data => {
          setdata(data)
          setloading(false)
        }).catch(err => console.log(err))
    }, [loc])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../Img/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Cây trồng</Text>
                    <TouchableOpacity style={{ width: 50 }}
                    onPress={()=>navigation.navigate('gioHang')}
                    >
                        <Image style={{ width: 26, height: 26 }}
                            source={require('../Img/cart.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', gap: 30, marginHorizontal: 5 }}>
                    <TouchableOpacity onPress={()=>{
                        setcolor1(true)
                        setcolor2(false)
                        setcolor3(false)
                        setcolor4(false)
                        setloc(``)
                    }}>
                    <Text style={{ color:color1? 'red':null }}>Tất cả</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>{
                        setcolor1(false)
                        setcolor2(true)
                        setcolor3(false)
                        setcolor4(false)
                        setloc(`?new=0`)
                    }}>
                    <Text style={{ color:color2? 'red':null }}>Hàng mới về</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setcolor1(false)
                        setcolor2(false)
                        setcolor3(true)
                        setcolor4(false)
                        setloc(`?status=1`)
                    }}>
                    <Text style={{ color:color3? 'red':null }}>Ưa bóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setcolor1(false)
                        setcolor2(false)
                        setcolor3(false)
                        setcolor4(true)
                        setloc(`?status=0`)
                    }}>
                    <Text style={{ color:color4? 'red':null }}>Ưa sáng</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    numColumns={2}
                    scrollEnabled={false}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                        onPress={() => navigation.navigate("chiTietCt", { item: item })}
                        >
                            <View style={{ margin: 13 }}>
                                <Image style={{ width: 180, height: 170, backgroundColor: '#CCCCCC', borderRadius: 10, padding: 20 }} source={{ uri: `${item.img}` }} />
                                <Text style={{ fontSize: 19, color: 'black', marginTop: 10 }}>{item.name}</Text>
                                {item.status ? <Text>Ưa Bóng</Text> : <Text>Ưa sáng</Text>}
                                <Text style={{ color: 'green',fontSize:19 }}>{item.money}đ</Text></View>
                        </TouchableOpacity >} >
                </FlatList>
            </View>
        </ScrollView>
    )
}

export default XemHangMoiVe

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    itemPlant: {
        backgroundColor: 'white',
        width: '45%',
        borderRadius: 12,
        padding: 12,
        margin: 10,
        gap: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 10
    },
    itemImage: {
        width: '100%',
        height: 130,
        borderRadius: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 17,
        fontWeight: '600',
        color: 'green'
    },
})

import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './TrangChu'

const XemThemChauCayChong = ({ navigation, route }) => {
    const { data } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../Img/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Sản Phẩm</Text>
                    <TouchableOpacity style={{ width: 50 }}
                    onPress={()=>navigation.navigate('gioHang')}
                    >
                        <Image style={{ width: 26, height: 26 }}
                            source={require('../Img/cart.png')} />
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
                                <Text style={{ color: 'green',fontSize:19 }}>{item.money}đ</Text></View>
                        </TouchableOpacity >} >
                </FlatList>
            </View>
        </ScrollView>
    )
}

export default XemThemChauCayChong

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

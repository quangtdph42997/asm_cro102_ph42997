import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrangChu from './TrangChu';
import TimKiem from './TimKiem';
import ThongBao from './ThongBao';
import PROFILE from './PROFILE';

const ButtomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: 'red',
      tabBarInactiveBackgroundColor: 'white',
      tabBarActiveBackgroundColor: 'white',
    }}

    
    >
      
      <Tab.Screen name=' ' component={TrangChu}
      options={{tabBarIcon:({color,size})=> <Image source={require('../Img/home.png')} tintColor={color}/>}}
      />
      <Tab.Screen name='  ' component={TimKiem}
      options={{tabBarIcon:({color,size})=> <Image source={require('../Img/Frame804.png')} tintColor={color}/>}}
      />
      <Tab.Screen name='   ' component={ThongBao}
            options={{tabBarIcon:({color,size})=> <Image source={require('../Img/Frame805.png')} tintColor={color}/>}}
      />
      <Tab.Screen name='    ' component={PROFILE}
            options={{tabBarIcon:({color,size})=> <Image source={require('../Img/Frame806.png')} tintColor={color}/>}}
/>
    </Tab.Navigator>
  )
}

export default ButtomMenu

const styles = StyleSheet.create({})
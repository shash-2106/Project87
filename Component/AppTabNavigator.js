import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonorScreen from '../screens/DonorScreen';
import VolunteerScreen from '../screens/VolunteerScreen';

export const TabNavigator = createBottomTabNavigator({
   Donate:{screen:DonorScreen},
   Volunteer:{screen:VolunteerScreen}
 },
 {
   defaultNavigationOptions:({navigation})=>({
     tabBarIcon:()=>{
       const routeName = navigation.state.routeName
       if(routeName=="Donate"){
         return(<Image source={require("../assets/donate.png")} style={{width:40,height:40}}></Image>)
       }
       else if(routeName=="Volunteer"){
         return(<Image source={require("../assets/volunteer.png")} style={{width:40,height:40}}></Image>)
       }
     }
   })
 })
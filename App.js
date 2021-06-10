import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SignupLogin from './screens/SignupLoginScreen';
import DonorScreen from './screens/DonorScreen';
import VolunteerScreen from './screens/VolunteerScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import SettingScreen from './screens/SettingScreen'
import CustomSideBarMenu from './Component/CustomSideBarMenu';
import {TabNavigator} from './Component/AppTabNavigator';
import {AppDrawerNavigator} from './Component/AppDrawerNavigator'

export default class App extends React.Component {
  render(){
  return (
    
     
      <AppContainer/>

  );
}
}


const SwitchNavigator = createSwitchNavigator({SignupLogin:{screen:SignupLogin},DrawerTab:{screen:AppDrawerNavigator}})
const AppContainer = createAppContainer(SwitchNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
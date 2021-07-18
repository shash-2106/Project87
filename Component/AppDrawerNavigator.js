import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './AppTabNavigator';
import SettingScreen from '../screens/SettingScreen';
import DonorScreen from '../screens/DonorScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import CustomSideBarMenu from './CustomSideBarMenu';
import MyBarters from '../screens/MyBarters';
import NotificationScreen from '../screens/NotificationScreen';
import MyDonatedItems from '../screens/MyDonatedItems';


export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:TabNavigator},
    Settings:{screen:SettingScreen},
    MyBarters:{screen:MyBarters},
    Notifications:{screen:NotificationScreen},
    DonatedItems:{screen:MyDonatedItems},
    },
{contentComponent:CustomSideBarMenu},
    {initialRouteName:'Home'}
    )
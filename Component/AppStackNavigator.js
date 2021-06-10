import React from 'react';
import DonorScreen from '../screens/DonorScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import DonorDetailsScreen from '../screens/DonorDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    VolunteerList:{screen:VolunteerScreen,navigationOptions:{headerShown:false}},
    DonorDetails:{screen:DonorDetailsScreen,navigationOptions:{headerShown:false}}
},
{initialRouteName:'VolunteerList'})
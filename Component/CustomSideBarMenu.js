import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import db from '../config';
import SignupLoginScreen from '../screens/SignupLoginScreen'

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flez:1}}>
                <DrawerItems {...this.props}></DrawerItems>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton}
                    onPress={()=>{this.props.navigation.navigate('SignupLoginScreen')
                    firebase.auth().signOut()}}>
                        <Text style={styles.logOutText}>Log Out</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logOutContainer : { flex:0.2, justifyContent:'flex-end', paddingBottom:30 },
    logOutButton : { height:30, width:'100%', justifyContent:'center', padding:10 },
    logOutText:{ fontSize: 30, fontWeight:'bold' }
})
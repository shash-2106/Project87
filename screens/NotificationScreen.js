import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


export default class NotificationScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }
    getNotifications=()=>{
        alert(this.state.userId)
        db.collection("all_notifications").where("notification_status","==","unread").where("targeted_user_id","==",this.state.userId).onSnapshot((snapshot)=>{
          var all_notification=[]
          snapshot.docs.map((doc)=>{
              var notifications=doc.data();
              notifications["doc_id"]=doc.id
              all_notification.push(notifications);
          })
          this.setState({
              allNotifications:all_notification
          })
          
        })
    }
    componentDidMount(){
        this.getNotifications()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,index})=>{
        return(
            <ListItem key={index} 
         
            title={item.item_name}
            subtitle={item.message}
            bottomDivider
            >

            </ListItem>
        )
    }
    
    render(){
        return(
<View style={{flex:1}}>
<Text>{this.state.allNotifications.length}</Text>
<View style={{flex:0.9}}>
{this.state.allNotifications.length==0
?(<View><Text>You have no notifications</Text></View>):
(<FlatList
keyExtractor={this.keyExtractor}
data={this.state.allNotifications}
renderItem={this.renderItem}>

</FlatList>)}
</View>
</View>
        )
    }
}
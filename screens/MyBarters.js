
import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Header, Icon, Card, ListItem} from 'react-native-elements';


export default class MyBarters extends React.Component{
    constructor(){
        super();
        this.state={
            volunteerId:firebase.auth().currentUser.email,
            volunteerName:'',
            all_barters:[]
        }
    }
    getVolunteerDetails=(volunteerId)=>{
        db.collection("users").where("email_id","==",volunteerId).get().then((snapshot)=>{snapshot.forEach(doc=>{this.setState({
            volunteerName:doc.data().first_name + " " + doc.data().last_name
        })})})
    }
    getAllBarters=()=>{
        db.collection("my_barters").where("volunteer_id","==",this.state.volunteerId).onSnapshot((snapshot)=>{var allBarters=[]
        snapshot.docs.map((doc)=>{
            var barter = doc.data()
            barter["doc_id"] = doc.id
            allBarters.push(barter)
        })
    this.setState({
        all_barters:allBarters
    })})
    }
    componentDidMount(){
        this.getVolunteerDetails(this.state.volunteerId)
        this.getAllBarters()
    }
    sendItem=(itemDetails)=>{
        if(itemDetails.status=="Item Sent"){
            var status = "Donor Interested"
            db.collection("my_barters").doc(itemDetails.doc_id).update({
                "status":"Donor Interested"
            })
            this.sendNotification(itemDetails,status)
        }
        else{
            var status = "Book Sent"
            db.collection("all_donations").doc(itemDetails.doc_id).update({
                "request_status":"Book Sent"
            })
            this.sendNotification(itemDetails,status)
        }
    }
    sendNotification=(itemDetails,status)=>{
        var requestId = itemDetails.request_id
        var volunteerId = itemDetails.volunteer_id
        db.collection("all_notifications").where("request_id","==",requestId).where("donor_id","==",volunteerId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
            var message = ""
            if(requestStatus=="Item Sent"){
                message = this.state.volunteerName + "sent you book"
            }
            else{
                message = this.state.volunteerName + "has shown interest in receiving the item"
            }
            db.collection("all_notifications").doc(doc.id).update({
                "message":message,
                "notification_status":"unread",
                "date":firebase.firestore.FieldValue.serverTimestamp()
            })
        })})
    }
    keyExtractor = (item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem key={i}
        title={item.item_name}
        subtitle={"donated by : "+item.donateRequest_by+"\nstatus : "+item.status}
       
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity onPress={()=>{this.sendItem(item)}}>
                <Text>Exchange</Text>
            </TouchableOpacity>
        }
        bottomDivider></ListItem>
    )
    render(){
        return(
            <View>
                <View>
                {
                this.state.all_barters.length === 0
                ?(
                  <View>
                    <Text>List Of All Item Donations</Text>
                  </View>
                )
                :(
                  <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.all_barters}
                  renderItem={this.renderItem}
                />
                )
              }
                </View>
            </View>
        )
    }
}
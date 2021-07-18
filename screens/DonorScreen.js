import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase'; 

export default class DonorScreen extends React.Component{
    constructor(){
        super();
        this.state={
           userId:firebase.auth().currentUser.email,
            itemName:"",
           cost:"",
           costForVolunteer:'',
           isItemRequestActive:"",
           requestedItemName:"",
           itemStatus:"",
           requestId:"",
           userDocId:"",
           docId:"",
           showFlatlist:false
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
      componentDidMount(){
        this.getItemRequest();
        this.getIsItemRequestActive();
      }
      getItemRequest=()=>{
        var itemRequest = db.collection("donations").where("user_id","==",this.state.userId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
          if(doc.data().item_status!="donated"){
           
            this.setState({
              requestId:doc.data().request_id,
              requestedItemName:doc.data().item_name,
              itemStatus:doc.data().item_status,
              docId:doc.id
            })
          }})})
      }
      getIsItemRequestActive=()=>{
        db.collection("users").where("email_id","==",this.state.userId).onSnapshot((snapshot)=>{snapshot.forEach((doc)=>{this.setState({
          isItemRequestActive:doc.data().isItemRequestActive,
          userDocId:doc.id
        })})})
      //  alert(this.state.userDocId)
      }
   
    addItem=async()=>{
      var amount = 0.25*this.state.cost
    

       var userId = this.state.userId;
       var randomRequestId = this.createUniqueId();
              db.collection("donations").add({
           "item_name":this.state.itemName,
           "cost":amount,
           "request_id":randomRequestId,
           "user_id":userId,
           "item_status":"donation_ready"
       })
       await this.getItemRequest()
       db.collection("users").where("email_id","==",userId).get().then((snapshot)=>{
         snapshot.forEach((doc)=>{db.collection("users").doc(doc.id).update({
           isItemRequestActive:true
         })})
       })
       this.setState({
           itemName:'',
           cost:'',
           costForVolunteer:'',
           isItemRequestActive:true
       })
    
    }
    sendNotification=()=>{
        db.collection("users").where("email_id","==",this.state.userId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
          var name = doc.data().first_name
          var lastName = doc.data().last_name
          db.collection("all_notifications").where("request_id","==",this.state.requestId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
       var volunteerId = doc.data().volunteer_id
       var itemName = doc.data().item_name
       db.collection("all_notifications").add({
         "targeted_user_id":volunteerId,
         "message":name + " " + lastName + " donated the item " + itemName,
         "notification_status":"unread",
         "item_Name":itemName  
       })
          })     
          })
        })})
      }
      updateItemRequestStatus=()=>{
       
      db.collection("donations").doc(this.state.docId).update({
        item_status:"donated",
      
      })
      db.collection("users").where("email_id","==",this.state.userId).get().then((snapshot)=>{snapshot.forEach((doc)=>{
        db.collection("users").doc(doc.id).update({
          isItemRequestActive:false
        })
      })})
      }
      donatedItems=(itemName)=>{
        var userId = this.state.userId
        var requestId = this.state.requestId
        db.collection("donated_items").add({
          "user_id":userId,
          "item_name":itemName,
          "request_id":requestId,
          "itemStatus":"donated"
        })
      }
    render(){
        if(this.state.isItemRequestActive==true){
            return(
              
              <View style={{flex:1, justifyContent:'center'}}>
                <View style={{borderColor:"blue",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                
                  <Text>Item Name</Text>
                  <Text>{this.state.requestedItemName}</Text>
                </View>
                <View style={{borderColor:"blue",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                  <Text>Item Status</Text>
                  <Text>{this.state.itemStatus}</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.sendNotification()
                this.updateItemRequestStatus()
                this.donatedItems(this.state.requesteditemName)
                }}>
                  <Text>I donated the item</Text>
                </TouchableOpacity>
              </View>
            )
          }
          else{
           
        return(
            <View>
            
            <TextInput style={styles.inputButton} placeholder={"Item name"} onChangeText={(text)=>{this.setState({
                itemName:text
            })}}></TextInput>
            <TextInput style={styles.inputButton} placeholder={"Cost of the item you wish to donate (in rupees)"} keyboardType={'numeric'} maxLength={5} onChangeText={(text)=>{this.setState({
               cost:text
            })}}></TextInput>
            <TouchableOpacity style={styles.button} onPress={()=>{this.addItem()}}>
                <Text>Add Item</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
}
const styles=StyleSheet.create({
    inputButton:{
      
            width:"90%",
            height:50,
            alignSelf:'center',
            borderColor:'#ffa3a9',
            borderRadius:10,
            borderWidth:1,
            marginTop:20,
            padding:10,
          },
    button:{
        width:"90%",
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    margin:10,
    padding:10,
    backgroundColor:"#bfebff",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    }
}
})
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase'; 
import {Header, Icon, Card} from 'react-native-elements';
import { ListItem, } from 'react-native-elements';
import DonorScreen from './DonorScreen';

export default class DonorDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            userName:'',
            donorId:this.props.navigation.getParam("details")["user_id"],
            requestId:this.props.navigation.getParam("details")["request_id"],
            itemName:this.props.navigation.getParam("details")["item_name"],
            cost:this.props.navigation.getParam("details")["cost"],
            donorName:'',
            donorContact:'',
            donorAddress:''
        }
    }
componentDidMount(){
    this.getDonorDetails()
    this.getUserDetails();
}
getUserDetails=()=>{
  db.collection("users").where("email_id","==",this.state.userId).get().then((snapshot)=>{snapshot.forEach(doc=>{this.setState({
      userName:doc.data().first_name + " " + doc.data().last_name
  })})})
}
getDonorDetails=()=>{
    db.collection("users").where("email_id","==",this.state.donorId).get().then((snapshot)=>{snapshot.forEach(doc=>{this.setState({
        donorName:doc.data().first_name,
        donorContact:doc.data().contact,
        donorAddress:doc.data().address
    })})})
}
addBarters=()=>{
db.collection("my_barters").add({
   item_name:this.state.itemName,
   request_id:this.state.requestId,
   donateRequest_by:this.state.donorName,
   volunteer_id:this.state.userId,
    status:"interested to donate"
})
}
    render(){
        return(
            <View>
             <View>
                 
             </View>
             <View>
                 <Card title="Item Information">
                <Card><Text>Name:{this.state.itemName}</Text></Card>
                <Card><Text>Cost:{this.state.cost}</Text></Card>
                 </Card>
             </View>
             <View>
                 <Card>
                     <Card><Text>Name:{this.state.donorName}</Text></Card>
                     <Card><Text>Contact:{this.state.donorContact}</Text></Card>
                     <Card><Text>Address:{this.state.donorAddress}</Text></Card>
                 </Card>
             </View>
             <View>
                 {this.state.donorId!=this.state.userId?(
                     <TouchableOpacity style={styles.button} onPress={()=>{this.addBarters()
                    this.props.navigation.navigate("MyBarters")}}>
                        <Text>I want to volunteer to receive</Text>
                    </TouchableOpacity>
                 ):null}
             </View>
            </View>
        )
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

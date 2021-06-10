import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { TextInput } from 'react-native';


export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            address:'',
            contact:'',
            docId:''
        }
    }
    componentDidMount(){
        this.getUserDetails()
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email
        db.collection("users").where("email_id","==",email).get().then((snapshot)=>{snapshot.forEach(doc=>{
            var data = doc.data()
           
            this.setState({
               
                email:data.email_id,
                firstName:data.first_name,
                lastName:data.last_name,
                contact:data.contact,
                address:data.address,
                docId:doc.id
            })
        })})
    // alert(this.state.email)
    }

    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            "first_name":this.state.firstName,
            "last_name":this.state.lastName,
            "address":this.state.address,
            "contact":this.state.contact
        })
        alert("user updated successfully");
    }
    render(){
        return(
            <View style={styles.container}>
             <View>
                 <TextInput value ={this.state.firstName} style={styles.textInput} maxLength={8} placeholder={"First Name"} onChangeText={(text)=>{this.setState({
                     firstName:text
                 })
                 }}></TextInput>
                  <TextInput value={this.state.lastName} style={styles.textInput} maxLength={8} placeholder={"Last Name"} onChangeText={(text)=>{this.setState({
                     lastName:text
                 })
                 }}></TextInput>
                  <TextInput value={this.state.contact} style={styles.textInput} maxLength={10} placeholder={"Contact"} keyboardType={'numeric'} onChangeText={(text)=>{this.setState({
                     contact:text
                 })
                 }}></TextInput>
                  <TextInput value={this.state.address} style={styles.textInput} multiline={true} placeholder={"Address"} onChangeText={(text)=>{this.setState({
                     address:text
                 })
                 }}></TextInput>
                 <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails()}}>
                     <Text style={styles.buttonText}>Save</Text>
                 </TouchableOpacity>
             </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : 
    { flex:1,
        alignItems: 'center',
         justifyContent: 'center' }, 
         formContainer:{ flex:1,
         width:'100%', 
         alignItems: 'center' 
        }, 
        textInput:{
            width:"90%",
            height:50,
            alignSelf:'center',
            borderColor:'#ffa3a9',
            borderRadius:10,
            borderWidth:1,
            marginTop:20,
            padding:10,
        },
        buttonText:{
             fontSize:25, 
             fontWeight:"bold", 
             color:"#fff" 
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
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase'; 

export default class SignupLoginScreen extends React.Component{
constructor(){
    super();
    this.state = {
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        contact:'',
        address:'',
        confirmPassword:'',
        isModalVisible:false,
        
    }
}
userLogIn=async(email,password)=>{
    try{
const response = await firebase.auth().signInWithEmailAndPassword(email,password)
if(response){
    this.props.navigation.navigate('Donate')
}}
  catch(error){
alert(error.message)
  }  
}
userSignUp=(email,password,confirmPassword)=>{
    if(password!=confirmPassword){
        alert("Password don't match")
    }
    else{
firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{db.collection("users").add({
    first_name:this.state.firstName,
    last_name:this.state.lastName,
    contact:this.state.contact,
    address:this.state.address,
    email_id:this.state.email
})
return alert("User added successfully","",[{text:'ok',onPress:()=>{this.setState({
    isModalVisible:false
})}}])

})
    }
}
showModal=()=>{
    return(
        <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
        <View>
         
            <ScrollView>
            <KeyboardAvoidingView>
                <TextInput style={styles.inputButton} placeholder="First name" maxLength={8} onChangeText={(text)=>{this.setState({
                    firstName:text
                })}}></TextInput>
                 <TextInput style={styles.inputButton} placeholder="Last name" maxLength={8} onChangeText={(text)=>{this.setState({
                    lastName:text
                })}}></TextInput>
                 <TextInput style={styles.inputButton} placeholder="Phone number" keyboardType='numeric' maxLength={10} onChangeText={(text)=>{this.setState({
                    contact:text
                })}}></TextInput>
                 <TextInput style={styles.inputButton} placeholder="Address" multiline={true} onChangeText={(text)=>{this.setState({
                   address:text
                })}}></TextInput>
                 <TextInput style={styles.inputButton} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text)=>{this.setState({
                   confirmPassword:text
                })}}></TextInput>
                <TouchableOpacity style={styles.button} onPress={()=>{this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)}}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{this.setState({
                    isModalVisible:false
                })}}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
            </ScrollView>
        </View>
        </Modal>
    )
}

    render(){
        return(
            <View>
                
                {this.showModal()} 
<TextInput style={styles.inputButton} keyboardType='email-address' placeholder="Email" onChangeText={(text)=>{this.setState({
    email:text
})

}}></TextInput>
<TextInput style={styles.inputButton} placeholder="Password" secureTextEntry={true} onChangeText={(text)=>{this.setState({
    password:text
})}}></TextInput>
<TouchableOpacity style={styles.button} onPress={()=>{this.setState({
    isModalVisible:true
})}}>
    <Text>Sign Up</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={()=>{this.userLogIn(this.state.email,this.state.password)}}>
    <Text>Log In</Text>
</TouchableOpacity>
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
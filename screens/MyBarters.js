
import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Header, Icon, Card, ListItem} from 'react-native-elements';
import { ThemeContext } from 'react-navigation';

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
    keyExtractor = (item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem key={i}
        title={item.book_name}
        subtitle={"donated by"+item.donateRequest_by+"\nstatus"+item.status}
        leftElement={<Icon name="book" type="font-awesome" color='black'></Icon>}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity>
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

import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase'; 
import { ListItem } from 'react-native-elements';
export default class MyDonatedItems extends React.Component{
  
    
  
    constructor(){
        super();
        this.state = {
           userId:firebase.auth().currentUser.email,
           donatedItemsList:[]
        }
      this.requestRef=null;
    }
    getDonatedItemsList=()=>{
       
        this.requestRef = db.collection("donations").where("user_id","==",this.state.userId).where("item_status","==","donated")
        .onSnapshot((snapshot)=>{
          var donation_list = snapshot.docs.map(document => document.data());
          this.setState({
            donatedItemsList : donation_list
          });
        })
    }
  componentDidMount(){
      this.getDonatedItemsList();
  }
  componentWillUnmount(){
      this.requestRef();
  }
      keyExtractor=(item,index)=> index.toString();
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.item_status}
            titleStyle={{color:'black',fontWeight:'bold'}}
            bottomDivider></ListItem>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
             <View style={{flex:1}}>
                
                  {this.state.donatedItemsList.length == 0
                  ?(<View>
                      <Text style={{color:'black', fontSize:30, marginTop:10}}>List of all donated items</Text>
                  </View>):
                  (<FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.donatedItemsList}
                  renderItem={this.renderItem}></FlatList>)}
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

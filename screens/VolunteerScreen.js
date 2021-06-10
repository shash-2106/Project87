import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


export default class VolunteerScreen extends Component{
  constructor(){
    super()
    this.state = {
     donationList : []
    }
  this.requestRef= null
  }

  getDonationsList =()=>{
    this.requestRef = db.collection("donations")
    .onSnapshot((snapshot)=>{
      var donation_list = snapshot.docs.map(document => document.data());
      this.setState({
        donationList : donation_list
      });
    })
  }

  componentDidMount(){
    this.getDonationsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.cost}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
       
        <View>
          {
            this.state.donationList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Donors</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.donationList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#bfebff",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
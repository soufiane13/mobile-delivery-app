import { StyleSheet, Text, View,Image } from 'react-native';
import React,{useEffect,useState} from 'react';
import { Button} from '@rneui/base';

import { ListItem,Avatar } from "@rneui/themed";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../fireBase';




const DeliverListItem = ({navigation }) => {
  
// get name from database 

let userID = auth.currentUser.uid
const  [Deliver,setDeliver] = useState(0);
const [origin,setOrigin] = useState("");
const [destination,setdestination] = useState("");


   

  useEffect(()=>{
      const unsubscrib = db.collection('users').doc(userID).onSnapshot(snapschot => (
        setDeliver(snapschot.get("delevries")),
        setdestination(snapschot.get("adderDestination")),
        setOrigin(snapschot.get("addrOrigin"))
        
      ))
      return unsubscrib
  },[])
  
  //end get name

if (Deliver == 1) {
  return (
    <ListItem style={{margin:15,width:"90%",flex:1,justifyContent:'space-around'}}>

          <View style={{flex:1,flexDirection:'column'}}>
          <Avatar 
                  size ="medium"
                  rounded
                  source={{
                      uri:
                      "https://gravatar.com/avatar/0312cbc6a559ae27ca2d8b2620a712ba?s=400&d=mp&r=x"
                  }}/>

            <View style={{marginTop:10}}>
              
              <View style={{flex:1 , flexDirection:'row',margin:5,marginBottom:10}}>
              <FontAwesome name="map-pin" size={18} color="black"  />
              <Text style={{marginLeft:6}}>{origin}</Text>
              </View>

              <View style={{flex:1 , flexDirection:'row',margin:2}}>
              <Entypo name="location-pin" size={20} color="black" />
              <Text style={{marginLeft:1}}>{destination}</Text>
              </View>

            </View>
        </View>

          

          <View style={{flex:1,flexDirection:'column',justifyContent:'space-around'}}>
          
            <Text style={{color:'orange',fontWeight:"bold",}}>IN PROGRESS</Text>
            <Button color="#dac79d" containerStyle={styles.button} onPress={()=> navigation.navigate("DetailsD")} title="DETAILS"/>
          
          </View>

    </ListItem>
  )
} else {
  return(



  
    <Image   style={{margin:15,marginLeft:"22%",marginBottom:0, width: '55%', height:200  }} source={require('C:/Users/aaa/Desktop/deliveryApp/images/image1.png')} />
 


  )
  
}
  
}

export default DeliverListItem;

const styles = StyleSheet.create({
  button :{
    marginTop:30,
  }

})
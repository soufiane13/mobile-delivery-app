import { StyleSheet, Text, View } from 'react-native';
import React , {useEffect,useState}from 'react';
import { Avatar ,Button} from '@rneui/base';
import { ListItem } from "@rneui/themed";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../fireBase';




const DeriverAccept = () => {

// get name from database 

let userID = auth.currentUser.uid
const  [origin,setOrigin] = useState("");
const  [destination,setDestination] = useState("");
   

  useEffect(()=>{
      const unsubscrib = db.collection('users').doc(userID).onSnapshot(snapschot => (
        setDestination(snapschot.get("adderDestination")),
        setOrigin(snapschot.get("addrOrigin"))
      ))
      return unsubscrib
  },[])
  
  //end get name

  return (
    <ListItem style={{flex:1,justifyContent:'space-around',width:"100%"}}>

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
          
            <Text style={{color:'green',fontWeight:"bold"}}>ACCEPTED</Text>
            <Text style={{marginLeft:6,color:'black',fontWeight:"bold"}}>NAME   :<Text style={{color:"#f7c894"}}>   James</Text> </Text>
            
          
          </View>

    </ListItem>
  )
}

export default DeriverAccept;

const styles = StyleSheet.create({
  button :{
    marginTop:30,
  }

})
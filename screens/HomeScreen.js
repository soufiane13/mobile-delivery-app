import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native'
import React , {useEffect,useLayoutEffect,useState} from 'react'
import DeliverListItem from '../components/DeliverListItem'
import {Button } from '@rneui/base';
import { auth, db } from '../fireBase';
import { AntDesign ,Ionicons} from '@expo/vector-icons';
import  AddDeliveryScreen from './AddDeliveryScreen';








const HomeScreen = ({navigation}) => {




      const signOut = () => {
        auth.signOut().then(() => {
          navigation.replace("Login");
        });
      };






   // date 
   const [currentDate,setcurrentDate]=useState('')
    
          useEffect(()=>{  
            var date = new Date().getDate()
            var month = new Date().getMonth()+1
            var year = new Date().getFullYear()
          
            setcurrentDate(
              date + '/' + month + '/' + year
            )

   },[])
  // end date


  //header start
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"DSS",
      headerTitleStyle :{ color : "#f7c894" },
      headerTintColor : "#fff",
          headerLeft: () => (
            <View style={{marginRight:117}}>
              <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
              <AntDesign name="logout" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight:8}}>
              <TouchableOpacity activeOpacity={0.5}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
    })
  },[])




// get name from database 

let userID = auth.currentUser.uid
const  [Dname,setDname] = useState("");

   

  useEffect(()=>{
      const unsubscrib = db.collection('users').doc(userID).onSnapshot(snapschot => (
        setDname(snapschot.get("Name"))
        
      ))
      return unsubscrib
  },[])
  
  //end get name
  

  


  return (
    <SafeAreaView>
      
      <ScrollView>
          <Text  style={{marginLeft:25,fontSize: 50,fontWeight: "bold"}}> welcome ,</Text>
          <Text h1 style={{marginLeft:90,fontSize: 35,}}>{Dname}</Text>
          <Text style={{marginLeft:50,fontSize: 22,}}> today : {currentDate} </Text>
          
          
        
          <DeliverListItem navigation={navigation}/>
       
         
          
       

          
         
         <Button color="#1f1e1f" containerStyle={styles.button}  title="Add Delivery" onPress={()=> navigation.navigate("AddDelivery")}/>

         
      </ScrollView>

    </SafeAreaView>
    
  )
}

export default HomeScreen






const styles = StyleSheet.create({
  button:{
    width:"90%",
    marginTop:10,
    margin:15,
    borderRadius:20,
  }

})

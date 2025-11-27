import { StyleSheet, Text, View, ActivityIndicator,TouchableOpacity, SafeAreaView, ScrollView,} from 'react-native'
import React, { useEffect, useState, } from 'react'
import DriverAccept from '../components/DriverAccept'
import {Button } from '@rneui/base';



const SearchDriverScreen = ({navigation}) => {

  


 const [show,setShow]=useState(true)


   
    useEffect(()=>{
      setInterval(()=>{
        setShow(!show)
      },4000)
    },[])

    
  


  
  
  return (
    <SafeAreaView>
      
      <ScrollView>
   <View>
    <View style={{margin : 50,width:"93%",marginLeft:10,marginTop:30,marginRight:5}}>
      {
        
        show?(
        <ActivityIndicator size="large" color="#f7c894"/>
        ):(
          <View>
         <DriverAccept />

         <Button color="#1f1e1f" containerStyle={styles.button}  title="Pay" onPress={()=> navigation.navigate("Paying")}/>
         </View>
        )
      }
      
      
      </View >
   
    </View>
    </ScrollView>
    </SafeAreaView>
    
  )
}

export default SearchDriverScreen ;

const styles = StyleSheet.create({
  button:{
    width:"90%",
    marginTop:10,
    margin:15,
    borderRadius:20,
  }
})
import { StyleSheet, View } from 'react-native'
import React from 'react'
import {Button } from '@rneui/base';
import { Input, Icon } from '@rneui/themed';
import { auth ,db} from '../fireBase';



const PayingScreen = ({navigation}) => {

  navigation.setOptions({
    headerBackVisible:false,
  })



  let Cuser = auth.currentUser.uid

  const OnPressGlobal = () => {
     navigation.navigate("Home");

    db.collection("users").doc(Cuser).update({
      delevries : 1,
    });
    
    
    
    
  };

  const OnPressGlobal2 = () => {
    navigation.navigate("Home");

   db.collection("users").doc(Cuser).update({
     delevries : 0,
   });
   
   
   
   
 };

  return (
   <View>
     <View style={{ margin:15,width:"93%",elevation:25,backgroundColor:"#eeeeee",alignSelf:'center',borderRadius:10}}>
     <Input
      placeholder='Card Holder'
     
      />
      <Input
      placeholder='Card Number'
      maxLength={16}
      keyboardType="phone-pad"	

     
      />
      <Input
      placeholder='DD/YY'
      maxLength={5}
      keyboardType="phone-pad"	
     
      />
      <Input
      placeholder='CVC'
      maxLength={3}
      keyboardType="phone-pad"	
     
      />
     </View>
    
    <Button color="#1f1e1f" containerStyle={styles.button} title="Pay" onPress={()=>OnPressGlobal()} />
    <Button  color="#f7c894" containerStyle={styles.button} title="Cancel" onPress={() =>OnPressGlobal2()} />
   
    </View>
  )
}

export default PayingScreen

const styles = StyleSheet.create({
  button:{
    width:"90%",
    marginTop:10,
    margin:15,
    borderRadius:20,
  }
})
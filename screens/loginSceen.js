import React, { useEffect, useState,useLayoutEffect } from 'react';
import {  StyleSheet, View ,KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image,Input, Button } from '@rneui/base';
import { auth } from '../fireBase';





const LoginS = ({navigation}) => {




  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      //console.log(authUser);
      if(authUser){
        navigation.replace("Home");
      }
    })
    return unsubscribe;
  },[]);


  const signIn =()=>{
    auth.signInWithEmailAndPassword(email,password)
    .catch(error => alert(error));

  }




  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"LOGIN",
      headerTitleStyle :{ color : "#f7c894" },
      headerTintColor : "#fff",
      
      
     headerRight: () => (
        <View style={{marginRight:1}}>
          
        </View>
      ),
    })
  },[])
  //header end 


 
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style="light"/>
      <Image 
      source = {require('C:/Users/aaa/Desktop/deliveryApp/images/logo1-01.png')}
      style={{width:150,height:150}}
      />
      <View style={styles.inputContainer}>
        <Input 
        placeholder="Email" 
         autoFocus 
         type="email"
         value={email}
         onChangeText={(text)=>setEmail(text)}
         />
        <Input 
        placeholder="Password"  
        secureTextEntry 
        type="password"
        value={password}
        onChangeText={(text)=>setPassword(text)}
        />

      </View>
      <Button color="#8c84dc" containerStyle={styles.button} onPress={signIn} title="Login"/>
      <Button onPress={()=>navigation.navigate("Register")}  containerStyle={styles.button} type="outline" title="Register"/>
      <View style={{height:30}}/>
      
       
    </KeyboardAvoidingView>
  )
}


export default LoginS





const styles = StyleSheet.create({

  inputContainer: {
      width:300,
  },
  container :{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     padding:10,
     backgroundColor:'white',
  },
  button:{
    width:200,
    marginTop:10,

  }
})
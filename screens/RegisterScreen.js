
import React, { useLayoutEffect,useState } from 'react';
import {  StyleSheet,View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Input, Button ,Text } from '@rneui/base';
import { auth, db } from '../fireBase';






const RegisterScreen = ({navigation}) => {

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"REGESTRATION",
      headerTitleStyle :{ color : "#f7c894" },
      headerTintColor : "#fff",
      
      
     headerRight: () => (
        <View style={{marginRight:1}}>
          
        </View>
      ),
    })
  },[])
  //header end 





    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [imageURL,setImageURL]=useState('');

    useLayoutEffect(()=>{
     navigation.setOptions({
        headerBackTitle:"Back to Login",
    });
    },[navigation])

    const register=()=>{

      auth.createUserWithEmailAndPassword(email,password)
       .then(cred => {
        db.collection('users').doc(cred.user.uid).set(
            {
              Name : name ,
              adderDestination : "x",
              addrOrigin : "x",
              size : "x",
              handing : 0,
              price : 0,
              driver : "johny",
              date : "",
              delevries : 0,
              drivingCast : 100 ,
              CIN :imageURL ,
             
            })
           /* db.collection('users').doc(cred.user.uid).collection('deliveries').add({
            })*/
      }).catch((error) => alert(error.message));


    };
    
   

    
    

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <StatusBar style='light'/>
        <Text h3 style={{marginBottom:25}}>create an account</Text>
        <View style={styles.inputContainer} >
          <Input
          placeholder='Full Name' 
          autoFocus 
          type='text'
          value={name}
          onChangeText={(text)=>setName(text)}
          />
          <Input
          placeholder='Email' 
          
          type='email'
          value={email}
          onChangeText={(text)=>setEmail(text)}
          />
          <Input
          placeholder='Password' 
           secureTextEntry
          type='password'
          value={password}
          onChangeText={(text)=>setPassword(text)}
          />
          <Input
          placeholder='C.I.N' 
          
          type='text'
          value={imageURL}
          onChangeText={(text)=>setImageURL(text)}
          onSubmitEditing={register}
          />
          <Button
          color="#8c84dc"
          containerStyle={styles.button}
          raised
          onPress={register}
          title='Register'/>
        </View>
        <View style={{marginBottom:20,}}></View>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen




const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        backgroundColor:'white',
    },
    button:{
      marginLeft:50,  
      width:200,
      marginTop:10,
    },
    inputContainer:{
      width:300,
    }
})
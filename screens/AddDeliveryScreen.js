import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import React ,{useLayoutEffect,useState,useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';

import { RadioButton, Text } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import {Button,Input } from '@rneui/base';
import { auth ,db} from '../fireBase';




const AddDeliveryScreen = ({navigation}) => {


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
      title:"Add Delivery",
      headerTitleStyle :{ color : "#f7c894" },
      headerTintColor : "#fff",
      
      
      headerRight: () => (
        <View style={{marginRight:8}}>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    })
  },[])
  //header end 



 

  
 



  const [value, setValue] = useState('small');
  const [adressO, setAdressO] = useState('');
  const [adressD, setAdressD] = useState('');
  const [checked, setChecked] = useState(false);


  function Tfprice(value,checked) {
     let price1 = 100 ;
     let price2 = 0 ;
    switch(value) {
      case 'small':
        price1 = price1 + 10 ;
        break;
      case 'medium':
        price1 = price1 + 20 ;
        break;
      case 'large':
        price1 = price1 + 30 ;
        break;
        
    }
    
    

    switch(checked) {
      case false:
        price2 = 0 ;
        break;
      case true:
        price2 = 50 ;
        break;
      
      
    }
    
    
    
    return price1 + price2
  }
  
  let Tprice = Tfprice(value,checked) ;

  

  

  let Cuser = auth.currentUser.uid
  let chackedState = 0
  if (checked == true) {
    chackedState = 50;
    
  } 

   db.collection("users").doc(Cuser).update({
             
              adderDestination : adressD,
              addrOrigin : adressO,
              size : value,
              handing : chackedState,
              price : Tprice,
              driver : "johny",
              date : currentDate ,
              drivingCast : 100 ,
              
              

    })
    



  return (

    <SafeAreaView>
        <ScrollView>
      
      
      <View style={{ margin:15,width:"93%",elevation:25,backgroundColor:"#eeeeee",alignSelf:'center',borderRadius:10}}>
          <View >
            <Text style={{color:"#1f1e1f",fontWeight: "bold",fontSize:20,margin:5}} >ORIGIN</Text>
            
          </View>

                <Input 
                        placeholder="Street,House N°,Postal code,City" 
                        autoFocus 
                        type="text"
                        value={adressO}
                        onChangeText={(text)=>setAdressO(text)}
                        />
          <View>
            <Text style={{color:"#1f1e1f",fontWeight: "bold",fontSize:20,margin:5}}>DESTINATION</Text>
          </View>
          
           <Input 
                        placeholder="Street,House N°,Postal code,City " 
                        autoFocus 
                        type="text"
                        value={adressD}
                        onChangeText={(text)=>setAdressD(text)}
                        />
          
          <View>
            <Text style={{color:"#1f1e1f",fontWeight: "bold",fontSize:20,margin:5}}>SIZE</Text>
          </View>
          

          <RadioButton.Group onValueChange={value => setValue(value)} value={value} onPress={ Tfprice(value,checked)}>
          <RadioButton.Item label="Small Package " value="small" />
          <RadioButton.Item label="Medium Package" value="medium" />
          <RadioButton.Item label="Large Package" value="large" />
          </RadioButton.Group>

            <View>
            <View>
            <Text style={{color:"#1f1e1f",fontWeight: "bold",fontSize:20,margin:5}}>HANDING</Text>
            </View>
            <Checkbox 

                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    
                    setChecked(!checked);
                    Tfprice(value,checked)
                  }}
                  />
           <View style={{margin:10}}>
             <Text style={{color:"#a42c27",fontSize:20}}><Text style={{color:"#1f1e1f",fontWeight: "bold",fontSize:20,}}>Total Price :</Text>                     {Tprice} DH</Text>
             </View>
          </View>
          
          </View>
          <Button color="#1f1e1f" containerStyle={styles.button}  title="Search for driver" onPress={()=> navigation.navigate("SearchDriver")}/>
          
                    
          </ScrollView>
    </SafeAreaView>
  )
}





export default AddDeliveryScreen







const styles = StyleSheet.create({
  button:{
    width:"90%",
    marginTop:10,
    margin:15,
    borderRadius:20,
  }
})
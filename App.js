import 'react-native-gesture-handler';
import { StyleSheet, View,TouchableOpacity  } from 'react-native';
import LoginS from './screens/loginSceen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import  AddDeliveryScreen from './screens/AddDeliveryScreen';
import SearchDriverScreen from './screens/SearchDriverScreen';
import DetailsDScreen from './screens/DetailsDScreen';
import PayingScreen from './screens/PayingScreen';

import { Ionicons} from '@expo/vector-icons';

//react native navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






const Stack = createNativeStackNavigator();

const globalScreenOptions = {

  headerStyle : {backgroundColor:"#8c84dc"},
  headerTitleStyle :{ color : "#f7c894" },
      headerTintColor : "#fff",
      headerRight: () => (
        <View style={{marginRight:8}}>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),

};



export default function App() {

  return (
      <NavigationContainer>

          <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions} >

            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Login" component={LoginS}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="AddDelivery" component={AddDeliveryScreen}/>
            <Stack.Screen name="SearchDriver" component={SearchDriverScreen}/>
            <Stack.Screen name="DetailsD" component={DetailsDScreen}/>
            <Stack.Screen name="Paying" component={PayingScreen}/>

          </Stack.Navigator>

      </NavigationContainer>
  );
}




//slpash screen


/*export default function splashScreen() {

  return (
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
  );
}*/











const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

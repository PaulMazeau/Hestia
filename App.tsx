import { StatusBar } from 'expo-status-bar';
import AccueilScreen from './screens/Accueil';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createNativeStackNavigator();



export default function App() {

  return (
    <NavigationContainer>
  <RootStack.Navigator> 
    <RootStack.Screen name="Accueil" component={AccueilScreen}/>
  </RootStack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

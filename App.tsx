import { StyleSheet, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from './screens/Courses';
import AccueilScreen from './screens/Accueil';
import TacheScreen from './screens/Tache';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import DepenseScreen from './screens/Depense';
import CourseScreen from './screens/Course';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Accueil from './Icons/Accueil.svg';
import Course from './Icons/Course.svg';
import Depense from './Icons/Depense.svg';
import Tache from './Icons/Tache.svg';
import LoginScreen from './screens/Login';
import {auth} from './firebase-config';
import {onAuthStateChanged } from 'firebase/auth';



//initialisation des root pour la NavBar Bottom
export type RootStackParams = {
  AuthStack : undefined;
  AccueilStack: undefined;
  CoursesStack: NavigatorScreenParams<CoursesStackParams>;
  Profile: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  }
  Depense: undefined;
}



const RootStack = createBottomTabNavigator<RootStackParams>();



//initialisation des root pour la sous navigation dans la page Course
export type CoursesStackParams = {
  Courses: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  };
};

const CoursesStack = createNativeStackNavigator<CoursesStackParams>();

//initialisation des root pour la sous navigation dans la page Course
const CourseScreenStack = () => {
  return (
  <CoursesStack.Navigator initialRouteName="Courses" screenOptions={{headerShown: false}}>
    <CoursesStack.Screen name="Courses" component={CoursesScreen}/>
    <CoursesStack.Screen name="Course" component={CourseScreen}/>
  </CoursesStack.Navigator>
  );
};

//initialisation des root pour la sous navigation dans la page Accueil
export type AccueilStackParams = {
  Accueil: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  };
};


const ExploreStack = createNativeStackNavigator<AccueilStackParams>();

//initialisation des root pour la sous navigation dans la page Accueil
const AccueilScreenStack = () => {
  return (
      <View style={styles.body}>
        <ExploreStack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
          <ExploreStack.Screen name="Accueil" component={AccueilScreen}/>
          <ExploreStack.Screen name="Course" component={CoursesScreen}/>
        </ExploreStack.Navigator>
      </View>
  );
};


export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
}

const AuthStack = createNativeStackNavigator()

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false,
     }}>
      <AuthStack.Screen name = "Login" component={LoginScreen}/>
    </AuthStack.Navigator>
  )
}






  
export default function App() {
  const user = auth.currentUser; //On test si on est deja log in
  var initialLogState= false;
  if(user){
    initialLogState = true;
  }
  const [loggedIn, setLoggedIn] = useState(initialLogState);


  useEffect(() => {  //on écoute une connexion/deconnexion de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, user => {
        if(user){
            setLoggedIn(true)
        }
        else{
          setLoggedIn(false)
        }
    })
    return unsubscribe;
}, [])
  const renderContent = () =>{
    if(loggedIn){
      return (
       <RootStack.Navigator
    initialRouteName="AccueilStack" 
    screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#172ACE",
    tabBarInactiveTintColor: "grey",
  
   }}>
      <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color, size}) => <Accueil color={color} />), tabBarLabel: "Accueil"}} />
      <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color, size}) => <Course color={color} />), tabBarLabel: "Course"}} />
      <RootStack.Screen name="Profile" component={TacheScreen} options={{tabBarIcon: (({color, size}) => <Tache color={color} />), tabBarLabel: "Tâche"}} />
      <RootStack.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: (({color, size}) => <Depense color={color} />), tabBarLabel: "Dépense"}} />
      </RootStack.Navigator>
      
      )
    }
    return <AuthScreenStack />
  }
  return (
    <GestureHandlerRootView style={styles.body}>
      <BottomSheetModalProvider>
      <View style={styles.body}>
       <NavigationContainer //Création de la navBar
       >
       
   

      {renderContent()}
      

 
    </NavigationContainer>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  

  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

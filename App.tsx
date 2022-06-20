import { StyleSheet, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from './screens/Courses';
import AccueilScreen from './screens/Accueil';
import TacheScreen from './screens/Tache';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import DepenseScreen from './screens/Depense';
import CourseScreen from './screens/Course';
import SettingsScreen from './screens/Settings';
import ColocSettingsScreen from './screens/ColocSettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Accueil from './Icons/Accueil.svg';
import Course from './Icons/Course.svg';
import Depense from './Icons/Depense.svg';
import Tache from './Icons/Tache.svg';
import AllDepense from './screens/ListDepense';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import { auth,db } from './firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


//initialisation des root pour la NavBar Bottom
export type RootStackParams = {
  AccueilStack: undefined;
  CoursesStack: NavigatorScreenParams<CoursesStackParams>;
  AuthStack : NavigatorScreenParams<AuthStackParams>;
  TacheStack: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  }
  DepenseStack: undefined;
  Settings: undefined;
  ColocSettings: undefined;
  ListDepense: undefined;
}

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false,
     }}>
      <AuthStack.Screen name = "Login" component={LoginScreen}/>
      <AuthStack.Screen name= "Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  )
}

const RootStack = createBottomTabNavigator<RootStackParams>();



//initialisation des root pour la sous navigation dans la page Course
export type CoursesStackParams = {
  Courses: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  };
  Settings : undefined;
  ColocSettings : undefined;
};

const CoursesStack = createNativeStackNavigator<CoursesStackParams>();

//initialisation des root pour la sous navigation dans la page Course
const CourseScreenStack = () => {
  return (
  <CoursesStack.Navigator initialRouteName="Courses" screenOptions={{headerShown: false}}>
    <CoursesStack.Screen name="Courses" component={CoursesScreen}/>
    <CoursesStack.Screen name="Course" component={CourseScreen}/>
    <ExploreStack.Screen name="Settings" component={SettingsScreen}/>
    <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
  </CoursesStack.Navigator>
  );
};

//initialisation des root pour la sous navigation dans la page Accueil
export type AccueilStackParams = {
  Accueil: undefined;
  Settings: undefined;
  ColocSettings : undefined;
};


const ExploreStack = createNativeStackNavigator<AccueilStackParams>();

//initialisation des root pour la sous navigation dans la page Accueil
const AccueilScreenStack = () => {
  return (
      <View style={styles.body}>
        <ExploreStack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
          <ExploreStack.Screen name="Accueil" component={AccueilScreen}/>
          <ExploreStack.Screen name="Settings" component={SettingsScreen}/>
          <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
        </ExploreStack.Navigator>
      </View>
  );
};



export type TacheStackParams = {
  Tache: undefined;
  Settings: undefined;
  ColocSettings : undefined;
};


const TacheStack = createNativeStackNavigator<TacheStackParams>();

//initialisation des root pour la sous navigation dans la page Tache
const TacheScreenStack = () => {
  return (
      <View style={styles.body}>
        <TacheStack.Navigator initialRouteName="Tache" screenOptions={{headerShown: false}}>
          <TacheStack.Screen name="Tache" component={TacheScreen}/>
          <TacheStack.Screen name="Settings" component={SettingsScreen}/>
          <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
        </TacheStack.Navigator>
      </View>
  );
};


export type DepenseStackParams = {
  Depense: undefined;
  Settings: undefined;
  ColocSettings : undefined;
  ListDepense: undefined;
};


const DepenseStack = createNativeStackNavigator<DepenseStackParams>();

//initialisation des root pour la sous navigation dans la page Depense
const DepenseScreenStack = () => {
  return (
      <View style={styles.body}>
        <DepenseStack.Navigator initialRouteName="Depense" screenOptions={{headerShown: false}}>
          <DepenseStack.Screen name="Depense" component={DepenseScreen}/>
          <DepenseStack.Screen name="Settings" component={SettingsScreen}/>
          <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
          <DepenseStack.Screen name="ListDepense" component={AllDepense}/>
        </DepenseStack.Navigator>
      </View>
  );
};

  
export default function App() {
  const[username, setUsername] = useState();
  const renderContent = () =>{
    const[usr, loading, error] = useAuthState(auth);
    if(usr){
      const getUsername = async () => {
      const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
      setUsername(data.data().nom)
    }
    getUsername();
      return ( <RootStack.Navigator
        initialRouteName="AccueilStack" 
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#172ACE",
        tabBarInactiveTintColor: "grey",
      
       }}>
    
          <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color, size}) => <Accueil color={color} />), tabBarLabel: "Accueil"}} />
          <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color, size}) => <Course color={color} />), tabBarLabel: "Course"}} />
          <RootStack.Screen name="TacheStack" component={TacheScreenStack} options={{tabBarIcon: (({color, size}) => <Tache color={color} />), tabBarLabel: "Tâche"}} />
          <RootStack.Screen name="DepenseStack" component={DepenseScreenStack} options={{tabBarIcon: (({color, size}) => <Depense color={color} />), tabBarLabel: "Dépense"}} />
          
          
    
        </RootStack.Navigator>)
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
})

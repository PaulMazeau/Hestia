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
import { getDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


//initialisation des root pour la NavBar Bottom// DEFINIT LES PARAMETRES QUE LON PASSE DANS LES SCREENS
export type RootStackParams = {
  AccueilStack: {username: string; clcID: string; clcName: string;};
  CoursesStack: {username: string; clcID: string; clcName: string;};
  AuthStack : NavigatorScreenParams<AuthStackParams>;
  TacheStack: {username: string; clcID: string; clcName: string;};
  Course: {
    name: string;
    courseID: string;
    username: string;
    clcID: string;
    clcName: string;
  }
 
  DepenseStack: {username: string; clcID: string; clcName: string;};
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
  Courses: {username: string, clcID: string;clcName: string;};
  Course: {
    name: string;
    courseID: string;
    username: string;
    clcID: string;
    clcName: string;
  };
  Settings : undefined;
  ColocSettings : undefined;
};

const CoursesStack = createNativeStackNavigator<CoursesStackParams>();

//initialisation des root pour la sous navigation dans la page Course
const CourseScreenStack = (t) => {
  return (
  <CoursesStack.Navigator initialRouteName="Courses" screenOptions={{headerShown: false}}>
    <CoursesStack.Screen name="Courses" component={CoursesScreen} initialParams={t.route.params}/>
    <CoursesStack.Screen name="Course" component={CourseScreen} />
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
  user:{
    username: string;
    clcID: string;
    clcName: string;
  }
};


const ExploreStack = createNativeStackNavigator<AccueilStackParams>();

//initialisation des root pour la sous navigation dans la page Accueil
const AccueilScreenStack = (t) => {
  return (
      <View style={styles.body}>
        <ExploreStack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
          <ExploreStack.Screen name="Accueil" component={AccueilScreen} initialParams={t.route.params} />
          <ExploreStack.Screen name="Settings" component={SettingsScreen}/>
          <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
        </ExploreStack.Navigator>
      </View>
  );
};



export type TacheStackParams = {
  Tache: {username: string; clcID: string; clcName: string;};
  Settings: undefined;
  ColocSettings : undefined;
};


const TacheStack = createNativeStackNavigator<TacheStackParams>();

//initialisation des root pour la sous navigation dans la page Tache
const TacheScreenStack = (t) => {
  return (
      <View style={styles.body}>
        <TacheStack.Navigator initialRouteName="Tache" screenOptions={{headerShown: false}}>
          <TacheStack.Screen name="Tache" component={TacheScreen} initialParams={t.route.params}/>
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
// tout les usersinfo utilisées dans les pages sont récupérés ici
const DepenseScreenStack = (t) => {
  return (
      <View style={styles.body}>
        <DepenseStack.Navigator initialRouteName="Depense" screenOptions={{headerShown: false}}>
          <DepenseStack.Screen name="Depense" component={DepenseScreen} initialParams={t.route.params}/>
          <DepenseStack.Screen name="Settings" component={SettingsScreen}/>
          <ExploreStack.Screen name="ColocSettings" component={ColocSettingsScreen}/>
          <DepenseStack.Screen name="ListDepense" component={AllDepense} initialParams={t.route.params}/>
        </DepenseStack.Navigator>
      </View>
  );
};

  
export default function App() {
  const[username, setUsername] = useState("");
  const [clcID, setClcID] = useState("");
  const[usr, loading, error] = useAuthState(auth);
  const [clcName, setClcName] = useState("");
  const renderContent = () =>{
    
    if(usr){
      const getData = async () => {
      const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
      setClcName(data.data().nomColoc);
      setClcID(data.data().colocID);
      setUsername(data.data().nom);
      
    }
    getData();
    if(!(username == "")){
      return ( <RootStack.Navigator
        initialRouteName="AccueilStack" 
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#172ACE",
        tabBarInactiveTintColor: "grey",
      
       }}>
          <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color, size}) => <Accueil color={color} />), tabBarLabel: "Accueil"}} initialParams={{ username: username, clcID: clcID, clcName: clcName } } />
          <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color, size}) => <Course color={color} />), tabBarLabel: "Course"}} initialParams={{username: username, clcID: clcID, clcName: clcName}} />
          <RootStack.Screen name="TacheStack" component={TacheScreenStack} options={{tabBarIcon: (({color, size}) => <Tache color={color} />), tabBarLabel: "Tâche"}} initialParams={{username: username, clcID: clcID, clcName: clcName}}/>
          <RootStack.Screen name="DepenseStack" component={DepenseScreenStack} options={{tabBarIcon: (({color, size}) => <Depense color={color} />), tabBarLabel: "Dépense"}} initialParams={{username: username, clcID: clcID, clcName: clcName}}/>
          
          
    
        </RootStack.Navigator>)
        }}
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

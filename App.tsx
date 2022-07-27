import { StyleSheet, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from './screens/Courses';
import AccueilScreen from './screens/Accueil';
import TacheScreen from './screens/Tache';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
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
import SousMenuDepense from './screens/SousMenuDepense';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import { auth,db } from './firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import HomePageScreen from './screens/Homepage';
import {UserContext} from './Context/userContextFile'
import { onAuthStateChanged } from 'firebase/auth';
import  AvatarCreationScreen from './screens/AvatarCreation'
import AvatarModificationScreen from './screens/AvatarModification';
import SettingsPerso from './screens/SettingsPerso';
import NoColocScreen from './screens/NoColoc';
import DepenseCollective from './components/DepenseCollective';
import { getNextTriggerDateAsync } from 'expo-notifications';
import { ToastProvider } from 'react-native-toast-notifications';
import SettingsName from './screens/SettingsName';
import SettingsMdp from './screens/SettingsMdp';
import Valider from './Icons/Valider.svg'
import EchecCross from './Icons/EchecCross.svg'
import AccueilIcon from './Icons/AccueilIcon';
import CourseIcon from './Icons/CourseIcon';
import TacheIcon from './Icons/TacheIcon';
import DepenseIcon from './Icons/DepenseIcon';

//initialisation des root pour la NavBar Bottom// DEFINIT LES PARAMETRES QUE LON PASSE DANS LES SCREENS
export type RootStackParams = {
  AccueilStack: undefined
  CoursesStack: {username: string; clcID: string; clcName: string; };
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
  SousMenuDepense: undefined;
  Avatarm: undefined;
  SettingsPerso: undefined;
  SettingsMdp: undefined;
  SettingsName: undefined;
  DepenseCollective: undefined;
}

export type AuthStackParams = {
  Homepage: undefined;
  Login: undefined;
  Signup: undefined;
  Avatar: {
    username: string;
    email: string;
    password: string
  }
  NoColoc: undefined;
}


const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthScreenStack = () => {

  return (
    <AuthStack.Navigator initialRouteName = {'Homepage'}screenOptions={{
      headerShown: false,
     }}>
       <AuthStack.Screen name= "Homepage" component={HomePageScreen} />
      <AuthStack.Screen name = "Login" component={LoginScreen}/>
      <AuthStack.Screen name= "Signup" component={SignupScreen} />
      <AuthStack.Screen name= "Avatar" component={AvatarCreationScreen} />
      <AuthStack.Screen name = "NoColoc" component={NoColocScreen} />
    </AuthStack.Navigator>)
    }

    export type NoColocStackParams = {
      Homepage: undefined;
      Login: undefined;
      Signup: undefined;
      Avatar: {
        username: string;
        email: string;
        password: string
      }
      NoColoc: undefined;
    }
    
    
    const NoColocStack = createNativeStackNavigator<NoColocStackParams>()
    
    const NoColocScreenStack = () => {
      
      return (
        <NoColocStack.Navigator initialRouteName = {'NoColoc'}screenOptions={{
          headerShown: false,
         }}>
          <NoColocStack.Screen name = "NoColoc" component={NoColocScreen} />
           <NoColocStack.Screen name= "Homepage" component={HomePageScreen} />
          <NoColocStack.Screen name = "Login" component={LoginScreen}/>
          <NoColocStack.Screen name= "Signup" component={SignupScreen} />
          <NoColocStack.Screen name= "Avatar" component={AvatarCreationScreen} />
        </NoColocStack.Navigator>)
        }



const RootStack = createBottomTabNavigator<RootStackParams>();



//initialisation des root pour la sous navigation dans la page Course
export type CoursesStackParams = {
  Courses: {username: string, clcID: string; clcName: string; courseID: string};
  Course: {
    name: string;
    courseID: string;
    username: string;
    clcID: string;
    clcName: string;
  };
  Settings : undefined;
  ColocSettings : undefined;
  Avatarm: undefined;
  SettingsPerso: undefined;
  SettingsMdp: undefined;
  SettingsName: undefined;
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
    <CoursesStack.Screen name= "Avatarm" component={AvatarModificationScreen} />
    <ExploreStack.Screen name= "SettingsPerso" component={SettingsPerso} />
    <ExploreStack.Screen name= "SettingsName" component={SettingsName} />
    <ExploreStack.Screen name= "SettingsMdp" component={SettingsMdp} />
  </CoursesStack.Navigator>
  );
};

//initialisation des root pour la sous navigation dans la page Accueil
export type AccueilStackParams = {
  Accueil: undefined;
  Settings: undefined;
  ColocSettings : undefined;
  Avatarm: undefined;
  SettingsPerso: undefined;
  SettingsMdp: undefined;
  SettingsName: undefined;
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
          <ExploreStack.Screen name= "Avatarm" component={AvatarModificationScreen} />
          <ExploreStack.Screen name= "SettingsPerso" component={SettingsPerso} />
          <ExploreStack.Screen name= "SettingsName" component={SettingsName} />
          <ExploreStack.Screen name= "SettingsMdp" component={SettingsMdp} />
        </ExploreStack.Navigator>
      </View>
  );
};



export type TacheStackParams = {
  Tache: {username: string; clcID: string; clcName: string;};
  Settings: undefined;
  ColocSettings : undefined;
  Avatarm: undefined;
  SettingsPerso: undefined;
  SettingsMdp: undefined;
  SettingsName: undefined;
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
          <TacheStack.Screen name= "Avatarm" component={AvatarModificationScreen} />
          <ExploreStack.Screen name= "SettingsPerso" component={SettingsPerso} />
          <ExploreStack.Screen name= "SettingsName" component={SettingsName} />
          <ExploreStack.Screen name= "SettingsMdp" component={SettingsMdp} />
        </TacheStack.Navigator>
      </View>
  );
};


export type DepenseStackParams = {
  Depense: undefined;
  Settings: undefined;
  ColocSettings : undefined;
  SousMenuDepense: undefined;
  Avatarm: undefined;
  SettingsPerso: undefined;
  SettingsMdp: undefined;
  SettingsName: undefined;
  DepenseCollective: undefined;
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
          <DepenseStack.Screen name="SousMenuDepense" component={SousMenuDepense} initialParams={t.route.params}/>
          <DepenseStack.Screen name= "SettingsPerso" component={SettingsPerso} />
          <ExploreStack.Screen name= "SettingsName" component={SettingsName} />
          <ExploreStack.Screen name= "SettingsMdp" component={SettingsMdp} />
          <DepenseStack.Screen name= "Avatarm" component={AvatarModificationScreen} />
          <DepenseStack.Screen name= "DepenseCollective" component={DepenseCollective} initialParams={t.route.params}/>
        </DepenseStack.Navigator>
      </View>
  );
};




export default function App() {
  const[userData, setUserData] = useState(null);
//place un écouteur sur auth et fetch la data si user logged in, set la data sur null sur user logged out (utile dans renderContent)
  useEffect(() => { 
    onAuthStateChanged(auth, async (user) => {
    if(user){const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
    setUserData(data.data());}else{setUserData(null)}
  })
}, [])


  
  const renderContent = () =>{
    if(userData){ //si luser est login
     if(!(userData.colocID == "0")){ //si luser est dans une coloc
      return ( 
      
      <RootStack.Navigator
        initialRouteName="AccueilStack" 
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#172ACE",
        tabBarInactiveTintColor: "grey",
        tabBarHideOnKeyboard: false,
       }}>
          <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color}) => <AccueilIcon color={color}/>), tabBarLabel: "Accueil"}}  />
          <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color}) => <CourseIcon color={color} />), tabBarLabel: "Course"}}  />
          <RootStack.Screen name="TacheStack" component={TacheScreenStack} options={{tabBarIcon: (({color,}) => <TacheIcon color={color} />), tabBarLabel: "Tâche"}} />
          <RootStack.Screen name="DepenseStack" component={DepenseScreenStack} options={{tabBarIcon: (({color}) => <DepenseIcon color={color} />), tabBarLabel: "Dépense"}} />
          
          
    
        </RootStack.Navigator>
       
        )
        }else{ //si luser na pas de coloc
          //utilité : luser quitte lapp alors quil na pas rejoint de coloc => dans noColocScreenStack, l'itinitalroute est Nocoloc
          //NoCOlocscreen sur authstack et nocolocstack pr que une fois login/signup luser arrive sur lecran nocoloc via le nav.navigate
          //permet aussi deviter davoir a update le contexte
          return (<NoColocScreenStack />)
        }
      }
      return <AuthScreenStack />
      
      }
  
  return (
    <ToastProvider
    swipeEnabled={true}
    successIcon={<Valider />}
    successColor="green"
    dangerColor="red"
    offsetBottom={80}
    dangerIcon={<EchecCross fill='white' width={20} height={20}/>}
    duration={1300}
    >
    <GestureHandlerRootView style={styles.body}>
     <BottomSheetModalProvider>
      <View style={styles.body}>
       <NavigationContainer >
        <UserContext.Provider value = {[userData, setUserData]}>
       {renderContent()}
       </UserContext.Provider>
      
    </NavigationContainer>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </ToastProvider>
    

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

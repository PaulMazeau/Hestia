import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from './screens/Courses';
import AccueilScreen from './screens/Accueil';
import TacheScreen from './screens/Tache';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreIcon from './Icons/ExploreIcon';
import React from 'react';
import RestaurantsIcon from './Icons/RestaurantsIcon';
import ProfileIcon from './Icons/ProfileIcon';
import DepenseScreen from './screens/Depense';
import CourseScreen from './screens/Course';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParams = {
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

export type CoursesStackParams = {
  Courses: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  };
};

const CoursesStack = createNativeStackNavigator<CoursesStackParams>();

const CourseScreenStack = () => {
  return (
  <CoursesStack.Navigator initialRouteName="Courses" screenOptions={{headerShown: false}}>
    <CoursesStack.Screen name="Courses" component={CoursesScreen}/>
    <CoursesStack.Screen name="Course" component={CourseScreen}/>
  </CoursesStack.Navigator>
  );
};


export type AccueilStackParams = {
  Accueil: undefined;
  Course: {
    //id dans la vraie vie
    name: string;
  };
};


const ExploreStack = createNativeStackNavigator<AccueilStackParams>();

const AccueilScreenStack = () => {
  return (
  <ExploreStack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
    <ExploreStack.Screen name="Accueil" component={AccueilScreen}/>
    <ExploreStack.Screen name="Course" component={CoursesScreen}/>
  </ExploreStack.Navigator>
  );
};

  
export default function App() {
  return (
    //<GestureHandlerRootView>
    <NavigationContainer>
    <RootStack.Navigator initialRouteName="AccueilStack" screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#E67A15",
    tabBarInactiveTintColor: "gray",}}>
      <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color, size}) => <ExploreIcon color={color} size= {size}/>), tabBarLabel: "Accueil"}} />
      <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color, size}) => <RestaurantsIcon color={color} size= {size}/>), tabBarLabel: "Course"}} />
      <RootStack.Screen name="Profile" component={TacheScreen} options={{tabBarIcon: (({color, size}) => <ProfileIcon color={color} size= {size}/>), tabBarLabel: "Tâche"}} />
      <RootStack.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: (({color, size}) => <ProfileIcon color={color} size= {size}/>), tabBarLabel: "Dépense"}} />
    </RootStack.Navigator>
    </NavigationContainer>
   //</GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  }
});

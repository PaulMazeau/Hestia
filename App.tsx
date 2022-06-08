import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from './screens/Courses';
import AccueilScreen from './screens/Accueil';
import TacheScreen from './screens/Tache';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DepenseScreen from './screens/Depense';
import CourseScreen from './screens/Course';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Accueil from './Icons/Accueil.svg';
import Course from './Icons/Course.svg';
import Depense from './Icons/Depense.svg';
import Tache from './Icons/Tache.svg';

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
      <View style={styles.body}>
        <ExploreStack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
          <ExploreStack.Screen name="Accueil" component={AccueilScreen}/>
          <ExploreStack.Screen name="Course" component={CoursesScreen}/>
        </ExploreStack.Navigator>
      </View>
  );
};

  
export default function App() {
  return (
    <GestureHandlerRootView style={styles.body}>
      <BottomSheetModalProvider>
      <View style={styles.body}>
       <NavigationContainer>
    <RootStack.Navigator initialRouteName="AccueilStack" screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#172ACE",
    tabBarInactiveTintColor: "gray",
    }}>
      <RootStack.Screen name="AccueilStack" component={AccueilScreenStack} options={{tabBarIcon: (({color, size}) => <Accueil color={color} />), tabBarLabel: "Accueil"}} />
      <RootStack.Screen name="CoursesStack" component={CourseScreenStack} options={{tabBarIcon: (({color, size}) => <Course color={color} />), tabBarLabel: "Course"}} />
      <RootStack.Screen name="Profile" component={TacheScreen} options={{tabBarIcon: (({color, size}) => <Tache color={color} />), tabBarLabel: "Tâche"}} />
      <RootStack.Screen name="Depense" component={DepenseScreen} options={{tabBarIcon: (({color, size}) => <Depense color={color} />), tabBarLabel: "Dépense"}} />
    </RootStack.Navigator>
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

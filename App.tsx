import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantsScreen from './screens/Restaurants';
import ExploreScreen from './screens/Explore';
import ProfileScreen from './screens/Profile';
import RestaurantScreen from './screens/Restaurant';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreIcon from './Icons/ExploreIcon';
import React from 'react';
import RestaurantsIcon from './Icons/RestaurantsIcon';
import ProfileIcon from './Icons/ProfileIcon';

export type RootStackParams = {
  ExploreStack: undefined;
  RestaurantsStack: NavigatorScreenParams<RestaurantsStackParams>;
  Profile: undefined;
  Restaurant: {
    //id dans la vraie vie
    name: string;
  }
}


const RootStack = createBottomTabNavigator<RootStackParams>();

export type RestaurantsStackParams = {
  Restaurants: undefined;
  Restaurant: {
    //id dans la vraie vie
    name: string;
  };
};

const RestaurantsStack = createNativeStackNavigator<RestaurantsStackParams>();

const RestaurantScreenStack = () => {
  return (
  <RestaurantsStack.Navigator initialRouteName="Restaurants" screenOptions={{headerShown: false}}>
    <RestaurantsStack.Screen name="Restaurants" component={RestaurantsScreen}/>
    <RestaurantsStack.Screen name="Restaurant" component={RestaurantScreen}/>
  </RestaurantsStack.Navigator>
  );
};


export type ExploreStackParams = {
  Explore: undefined;
  Restaurant: {
    //id dans la vraie vie
    name: string;
  };
};


const ExploreStack = createNativeStackNavigator<ExploreStackParams>();

const ExploreScreenStack = () => {
  return (
  <ExploreStack.Navigator initialRouteName="Explore" screenOptions={{headerShown: false}}>
    <ExploreStack.Screen name="Explore" component={ExploreScreen}/>
    <ExploreStack.Screen name="Restaurant" component={RestaurantScreen}/>
  </ExploreStack.Navigator>
  );
};

  
export default function App() {
  return (
    <NavigationContainer>
    <RootStack.Navigator initialRouteName="ExploreStack" screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: "#E67A15",
    tabBarInactiveTintColor: "gray",}}>
      <RootStack.Screen name="ExploreStack" component={ExploreScreenStack} options={{tabBarIcon: (({color, size}) => <ExploreIcon color={color} size= {size}/>), tabBarLabel: "Explore"}} />
      <RootStack.Screen name="RestaurantsStack" component={RestaurantScreenStack} options={{tabBarIcon: (({color, size}) => <RestaurantsIcon color={color} size= {size}/>), tabBarLabel: "Restaurant"}} />
      <RootStack.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: (({color, size}) => <ProfileIcon color={color} size= {size}/>), tabBarLabel: "Profile"}} />
    </RootStack.Navigator>
    </NavigationContainer>
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

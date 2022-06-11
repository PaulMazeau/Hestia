import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { RootStackParams } from '../App';
import FoodCategory from '../components/FoodCategory';
import TopBackNavigation from '../components/TopBackNavigation';
import Top from '../components/HeaderDark';

type Props = NativeStackScreenProps<RootStackParams, 'Course'>;

const CourseScreen = ({ route, navigation }: Props) => {
  return (
    <View>
      <Top/>
    <View style={styles.container}>
      
      <View style = {styles.Title}>
        <TopBackNavigation/>
        <Text style={styles.screenTitle}>{route.params.name}</Text>
      </View>
      <View style={styles.Foodcontainer}>
        <FoodCategory name = "Fruits"></FoodCategory>
        <FoodCategory name = "Boissons"></FoodCategory>
      </View>
        
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  Title: {
    flexDirection : 'row', 
    marginTop : 10,
    marginBottom : 15,
  },
  
  Foodcontainer: {
    paddingTop : 10,
    paddingBottom : 20,
    backgroundColor: 'white',
    height : "auto",
    width : "100%",
    marginTop: 8,
    borderRadius : 10,
  },
});

export default CourseScreen;
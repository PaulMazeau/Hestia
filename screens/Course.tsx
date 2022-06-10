import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { RootStackParams } from '../App';
import FoodCategory from '../components/FoodCategory';
import TopBackNavigation from '../components/TopBackNavigation';
import Top from '../components/Header';

type Props = NativeStackScreenProps<RootStackParams, 'Course'>;

const CourseScreen = ({ route, navigation }: Props) => {
  return (
    
    <View style={styles.container}>
      <Top/>
      <View style = {{flexDirection : 'row', paddingTop : 10,}}>
        <TopBackNavigation/>
        <Text style={styles.screenTitle}>{route.params.name}</Text>
      </View>
      <View style={styles.Foodcontainer}>
        <FoodCategory name = "Fruits"></FoodCategory>
        <FoodCategory name = "Boissons"></FoodCategory>
      </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
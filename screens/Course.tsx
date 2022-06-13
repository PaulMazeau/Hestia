import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { RootStackParams } from '../App';
import FoodCategory from '../components/FoodCategory';
import TopBackNavigation from '../components/TopBackNavigation';
import Top from '../components/HeaderDark';
import Food from '../components/Food';

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
        <View style = {styles.container}>
            <Text style={styles.Food_title}>Fruits & Légumes</Text>
            <View style = {styles.separator}></View>
            <FlatList data={[
              {key : "6 tomates"},
              {key : "3 salades"}
            ]}
            renderItem={({item}) => <Food name = {item.key}></Food>}></FlatList>
        </View>
        <View style = {styles.container}>
            <Text style={styles.Food_title}>Viandes</Text>
            <View style = {styles.separator}></View>
            <FlatList data={[
              {key : "4 steaks"}
            ]}
            renderItem={({item}) => <Food name = {item.key}></Food>}></FlatList>
        </View>
        <View style = {styles.container}>
            <Text style={styles.Food_title}>Boissons</Text>
            <View style = {styles.separator}></View>
            <FlatList data={[
              {key : "1 Coca"},
              {key : "1 pack de bière"}
            ]}
            renderItem={({item}) => <Food name = {item.key}></Food>}></FlatList>
        </View>
        <View style = {styles.container}>
            <Text style={styles.Food_title}>Maison</Text>
            <View style = {styles.separator}></View>
            <FlatList data={[
              {key : "papier toilette"},
              {key : "sac poubelle"}
            ]}
            renderItem={({item}) => <Food name = {item.key}></Food>}></FlatList>
        </View>
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

  Food_title: {
    paddingLeft : 10,
    fontWeight: 'bold',
    fontSize: 20,
  },

  separator: {
    height : 1,
    width : "100%",
    backgroundColor : "#4F8DD1",
    marginTop : 10,
    marginBottom : 10
  },
});

export default CourseScreen;
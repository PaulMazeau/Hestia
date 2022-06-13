import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';
import Food from './Food';





interface FoodCategoryProps {
    name: string;
}




const FoodCategory: React.FC<FoodCategoryProps> = ({name}) => {
  const [radiobutton, setstate] = useState(false);
    return (      
      <View style = {styles.container}>
          <Text style={styles.titre}>{name}</Text>
          <View style = {styles.separator}></View>
          <FlatList data={[
            {key : "6 tomates"},
            {key : "3 salades"}
          ]}
          renderItem={({item}) => <Food name = {item.key}></Food>}></FlatList>
      </View>
    );
  
};

const styles = StyleSheet.create({
    container: {
      paddingBottom : 10,
      height : "auto",
      width : "100%",
      marginTop: 8,
      borderRadius : 10,
    },
    separator: {
      height : 1,
      width : "100%",
      backgroundColor : "#4F8DD1",
      marginTop : 10,
      marginBottom : 10
    },
    Ligne: {
      padding : 5,
      flexDirection : 'row',
      justifyContent: 'flex-start',
    },
    titre: {
      paddingLeft : 10,
      fontWeight: 'bold',
      fontSize: 20,
    },
    food_text_invalid : {
      paddingLeft : 5,
      fontSize : 15,
      textDecorationLine : 'line-through',
    },
    food_text_valid : {
      paddingLeft : 5,
      fontSize : 15,
    },
});



export default FoodCategory;
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';
import {TextField,  Button} from 'react-native-ui-lib';



interface FoodCategoryProps {
    name: string;
}

const FoodCategory: React.FC<FoodCategoryProps> = ({name}) => {
    return (
      <View style = {styles.container}>
          <Text style={styles.titre}>{name}</Text>
          <View style = {styles.separator}></View>
          <View style = {styles.Ligne}>
            <RadioButton size={20}/>
            <Text style = {{paddingLeft : 5}}>6 Tomates</Text>
          </View>
          <View style = {styles.Ligne}>
            <RadioButton size={20}/>
            <Text style = {{paddingLeft : 5}}>4 Patates</Text>
          </View>
          <View style = {styles.Ligne}>
            <RadioButton size={20}/>  
            <Text style = {{paddingLeft : 5}}>1 Salade</Text>
          </View>
          
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
});



export default FoodCategory;
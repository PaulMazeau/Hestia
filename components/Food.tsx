import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { arrayRemove, updateDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight, TextInput } from 'react-native';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';
import {db} from '../firebase-config';




interface FoodProps {
    name: string;
    clcID: string;
    courseID: string;
    itemType : string;
}


const Food: React.FC<FoodProps> = ({name, clcID, courseID, itemType}) => {
  const [radiobutton, setstate] = useState(false);
  const handleDeleteItem = async () => {
      if(itemType == "fruits"){
      await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayRemove(name)});
      
  return}
      if(itemType=="viandes"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayRemove(name)});
          
          return
      }
      if(itemType=="boisson"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayRemove(name)});
          
          return
      }
      if(itemType=="maison"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayRemove(name)});
          
          return
      }
  
  }
    return (      
        <View style = {styles.Ligne}>
          <RadioButton size={22} selected={radiobutton} onPress={() => console.log('test')} />
          <TextInput onPressIn={() => setstate(!radiobutton)} style={!radiobutton? styles.food_text_valid:styles.food_text_invalid}>{name}</TextInput>
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
      padding : 7,
      flexDirection : 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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

    Text: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: '400'
    }
});



export default Food;
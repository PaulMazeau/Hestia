import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { arrayRemove, updateDoc, doc, arrayUnion } from 'firebase/firestore';
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
  const [nameBis, setNameBis] = useState(name); //copie du nom pr pvoir le moidifier dans le text input sans pb
  const handleUpdateItem = async () => { //supprime l'elt puis le rajoute si c pas lelt string vide
    if(itemType == "fruits"){
      await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayRemove(name)});
      if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayUnion(nameBis)});}
      
  return}
      if(itemType=="viandes"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayRemove(name)});
          if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayUnion(nameBis)});}
          return
      }
      if(itemType=="boisson"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayRemove(name)});
          if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayUnion(nameBis)});}
          return
      }
      if(itemType=="maison"){
          await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayRemove(name)});
          if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayUnion(nameBis)});}
          return
      }
  }
    return (      
        <View style = {styles.Ligne}>
          <RadioButton size={25} selected={radiobutton} onPress={() => setstate(!radiobutton)}/>
          <TextInput style={!radiobutton? styles.food_text_valid:styles.food_text_invalid} value={nameBis} onBlur={() => handleUpdateItem()}
          onChangeText={(event) => setNameBis(event)}></TextInput>
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
      fontSize : 16,
      opacity: .4
    },

    food_text_valid : {
      paddingLeft : 5,
      fontSize : 16,
      paddingRight: 35,
    },

    Text: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: '400'
    }
});



export default Food;
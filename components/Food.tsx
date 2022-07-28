import { arrayRemove, updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { int32ARGBColor } from 'react-native-svg';
import { RadioButton } from 'react-native-ui-lib';
import {db} from '../firebase-config';

interface FoodProps {
    name: string;
    clcID: string;
    courseID: string;
    itemType : string;
    isSelected: boolean;
}


const Food: React.FC<FoodProps> = ({name, clcID, courseID, itemType, isSelected}) => {
  const [radiobutton, setstate] = useState(isSelected);
  const [nameBis, setNameBis] = useState(name); //copie du nom pr pvoir le moidifier dans le text input sans pb
  const handleUpdateItem = async () => { //supprime l'elt puis le rajoute si c pas lelt string vide
    if(!(nameBis===name)){
      let toChange = {item: name, selected: isSelected};
      let toUpload = {item: nameBis, selected: isSelected};
    if(itemType == "divers"){
      await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {divers: arrayRemove(toChange)});
      if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {divers: arrayUnion(toUpload)});
    } 
    return
  }
      // if(itemType=="viandes"){
      //     await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayRemove(name)});
      //     if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayUnion(nameBis)});}
      //     return
      // }
      // if(itemType=="produitsfrais"){
      //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {produitsfrais: arrayRemove(name)});
      //   if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {produitsfrais: arrayUnion(nameBis)});}
      //   return
      // }
      // if(itemType=="goute"){
      //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {goute: arrayRemove(name)});
      //   if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {goute: arrayUnion(nameBis)});}
      //   return
      // }
      // if(itemType=="surgeles"){
      //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {surgeles: arrayRemove(name)});
      //   if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {surgeles: arrayUnion(nameBis)});}
      //   return
      // }
      // if(itemType=="conserves"){
      //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {conserves: arrayRemove(name)});
      //   if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {conserves: arrayUnion(nameBis)});}
      //   return
      // }
      // if(itemType=="boisson"){
      //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayRemove(name)});
      //   if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayUnion(nameBis)});}
      //   return
      // }
      // if(itemType=="maison"){
      //     await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayRemove(name)});
      //     if(!(nameBis=="")){updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayUnion(nameBis)});}
      //     return
      // }
    }
  }

  const handlePressed = async () => {
    setstate(!radiobutton)
    let toChange = {item: name, selected: isSelected};
    let toUpload = {item: name, selected: !isSelected};
    await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {divers: arrayRemove(toChange)});
    await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {divers: arrayUnion(toUpload)});
  }
    return (     
        <View style = {styles.Ligne}>
          <RadioButton size={25} selected={radiobutton} onPress={() => handlePressed()}/>
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
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { updateDoc, doc, FieldValue, arrayUnion } from 'firebase/firestore';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight, TextInput} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';
import {db} from '../firebase-config';

interface AddFoodProps {
    courseID: string;
    clcID: string;
    itemType: string;
}



const Food :React.FC<AddFoodProps> = ({courseID, clcID, itemType}) => {
  const [item, setItem] = React.useState("");
  const handleAddItem = async () => {
    const itemCopy = item;
    if(itemType == "fruits"){
    await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {fruits: arrayUnion(itemCopy)});
    setItem("")
return}
    if(itemType=="viandes"){
        await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayUnion(itemCopy)});
        setItem("")
        return
    }
    if(itemType=="boisson"){
        await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayUnion(itemCopy)});
        setItem("")
        return
    }
    if(itemType=="maison"){
        await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayUnion(itemCopy)});
        setItem("")
        return
    }

    
  }
  
    return (      
        <View style = {[(!item ||item.length === 0)? styles.LigneTransparent: styles.Ligne]}>
          <RadioButton size={22} selected={false} />
          <TextInput
                style = {styles.food_text_valid}
                onChangeText={(event) => { setItem(event)}}
                value={item}
                placeholder="Ajouter aliment"
                onBlur={() => handleAddItem()
                } 

            />
        </View>
  
    );
  
};

const styles = StyleSheet.create({
    LigneTransparent: {
      padding : 7,
      flexDirection : 'row',
      justifyContent: 'flex-start',
      opacity:0.4
    },
    Ligne: {
        padding : 5,
        flexDirection : 'row',
        justifyContent: 'flex-start',
      },
    food_text_valid : {
      paddingLeft : 5,
      fontSize : 16,
    },
});



export default Food;

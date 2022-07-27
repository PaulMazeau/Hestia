import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import { RadioButton } from 'react-native-ui-lib';
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
    if(itemType == "divers" && !(item=="")){
      try{
    await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {divers: arrayUnion({item : itemCopy, selected: false})});
      }
      catch(err){console.log(err)}
    setItem("")
return}
  //   if(itemType=="viandes"&& !(item=="")){
  //       await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {viandes: arrayUnion(itemCopy)});
  //       setItem("")
  //       return
  //   }
  //   if(itemType=="boisson"&& !(item=="")){
  //       await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {boisson: arrayUnion(itemCopy)});
  //       setItem("")
  //       return
  //   }
  //   if(itemType=="produitsfrais"&& !(item=="")){
  //     await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {produitsfrais: arrayUnion(itemCopy)});
  //     setItem("")
  //     return
  // }
  // if(itemType=="goute"&& !(item=="")){
  //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {goute: arrayUnion(itemCopy)});
  //   setItem("")
  //   return
  // }
  // if(itemType=="surgeles"&& !(item=="")){
  //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {surgeles: arrayUnion(itemCopy)});
  //   setItem("")
  //   return
  // }
  // if(itemType=="conserves"&& !(item=="")){
  //   await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {conserves: arrayUnion(itemCopy)});
  //   setItem("")
  //   return
  // }
  //   if(itemType=="maison"&& !(item=="")){
  //       await updateDoc(doc(db, "Colocs/"+clcID+ "/Courses", courseID), {maison: arrayUnion(itemCopy)});
  //       setItem("")
  //       return
  //   }

    
  }
  
    return (      
    
        <View style = {[(!item ||item.length === 0)? styles.LigneTransparent: styles.Ligne]}>
          <RadioButton size={25} selected={false} />
          <TextInput
                style = {styles.food_text_valid}
                onChangeText={(event) => { setItem(event)}}
                value={item}
                placeholderTextColor = "#A9A9A9"
                placeholder="Ajouter un aliment"
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
      opacity:0.4,
    },

    Ligne: {
        padding : 5,
        flexDirection : 'row',
        justifyContent: 'flex-start',
        paddingRight: 35,
      },

    food_text_valid : {
      paddingLeft : 5,
      fontSize : 16,
      paddingRight: 35,
    },
});



export default Food;

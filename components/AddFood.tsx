import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight, TextInput} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';


interface AddFoodProps {
    
}



const Food :React.FC<AddFoodProps> = ({}) => {

  const [title, onChangeTitre] = React.useState(null);

  
    return (      
        <View style = {[(!title ||title.length === 0)? styles.LigneTransparent: styles.Ligne]}>
          <RadioButton size={22} selected={false} />
          <TextInput
                style = {styles.food_text_valid}
                onChangeText={onChangeTitre}
                value={title}
                placeholder="Ajouter aliment"
                onBlur={() => {console.log("ajouter l'ingredient a la flatlist + vider ce textInput");
                                onChangeTitre('')}}
              

            />
        </View>
  
    );
  
};

const styles = StyleSheet.create({
    LigneTransparent: {
      padding : 5,
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
      fontSize : 15,
    },
});



export default Food;
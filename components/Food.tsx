import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import { Colors, Drawer, RadioButton } from 'react-native-ui-lib';





interface FoodProps {
    name: string;
}


const Food: React.FC<FoodProps> = ({name}) => {
  const [radiobutton, setstate] = useState(false);
    return (      
        <View style = {styles.Ligne}>
          <RadioButton size={22} selected={radiobutton} onPress={() => setstate(!radiobutton)} />
          <Text onPress={() => setstate(!radiobutton)} style={styles.Text}>{name}</Text>
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
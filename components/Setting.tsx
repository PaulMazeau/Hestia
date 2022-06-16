import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

interface Props {
    name: string;
    tag: string;
    onPress: (name: string) => void;
  }

  const Setting: React.FC<Props> = ({name, tag, onPress}) => {
    return (
      <View>
      <Text>{tag}</Text>  
      <TouchableOpacity onPress={() => onPress(name)}>
        <View style={styles.container}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 50,
      marginBottom: 10,
    },
  
    avatar: {
      width: 36,
      height: 36,
    },
  
    name:{
      fontWeight: '700'
    }
  });
  
  export default Setting;
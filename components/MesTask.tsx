import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, FlatList } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';


 const MesTask = () => {

  return (
   
    <View style={{flex: 1}}>
          
    <ScrollView showsVerticalScrollIndicator={false}>

  <Text style={styles.CategorieRecurrente}>Récurrente</Text>

    <TacheCard Tache='jten supplie'/>
    <TacheCard Tache='jten supplie'/>

  <Text style={styles.CategoriePeriode}>Cette semaine</Text>

    <TacheCard Tache='jten supplie'/>

  </ScrollView>
      
      </View>
  );
};

const styles = StyleSheet.create({

    SousTitre: {
      marginLeft: 15,
      marginTop: 5,
    },

    Titre: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    },

    input: {
      height: 44,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 14,
    },

    BottomSheet: {
        padding: 10,
    },

    container: {
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 
    Header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },

    control: {
      marginBottom: 15,
    },

    CategoriePeriode:{
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: 24,
    },

    CategorieRecurrente:{
      fontSize: 19,
      fontWeight: 'bold',
    },
    

})

export default MesTask;
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';

import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';



 const GlobalTask = () => {


  return (
    
        <ScrollView showsVerticalScrollIndicator={false}>
    
      <Text style={styles.CategorieRecurrente}>Récurrente</Text>

          <TacheCard Tache="Ménage Salle de bain" id={1}/>
          <TacheCard Tache="Ménage Cuisine"id={2}/>
          <TacheCard Tache="Ménage Salon"id={3}/>

      <Text style={styles.CategoriePeriode}>Cette semaine</Text>

          <TacheCard Tache="Nettoyer Terasse" id={4}/>
          <TacheCard Tache="Course" id={5}/>
      
          
        </ScrollView>
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

export default GlobalTask;
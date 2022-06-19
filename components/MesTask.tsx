import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, FlatList } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import AddTaskBS from './AddTaskBS';


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

  <AddTaskBS/>

      </View>
  );
};

const styles = StyleSheet.create({

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
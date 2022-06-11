import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import AddButton from '../Icons/AddButton.svg'
import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import BottomsheetTask from '../components/BottomSheetTask';



 const TacheScreen = () => {

  const addTask = () => {
    //bottomSheetRef.current?.extend();
    console.log('prout')
  };

  return (
    <View>
        

      <Top/>
      <View style={styles.container}>
          <View style={styles.Header}>
            <Text style={styles.screenTitle}>Tâche à faire</Text>
          </View>

          
        <SegmentedControl 
        containerStyle={styles.control}
        segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'rgba(23,42,206,0)'
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
    
      <Text style={styles.CategorieRecurrente}>Récurrente</Text>

          <TacheCard />
          <TacheCard />
          <TacheCard />

      <Text style={styles.CategoriePeriode}>Cette semaine</Text>

          <TacheCard />
          <TacheCard />
        
          

        </ScrollView>
      
    <TouchableOpacity style={styles.AddButton} onPress= {addTask}>
        <AddButton width={70} height={70} style={styles.AddButton}/>
    </TouchableOpacity>
      </View>
      
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
    AddButton: {
      position: 'absolute',
      top: '95%',
      left: '86%',
    }

})

export default TacheScreen;
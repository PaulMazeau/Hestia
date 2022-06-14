import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';

import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import GlobalTask from '../components/GlobalTask';
import MesTask from '../components/MesTask';
import TaskCalendar from '../components/TaskCalendar';



 const TacheScreen = () => {

  const [show, setShow] = React.useState(true);

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);


  return (
    <View>
        

      <Top/>
      <View style={styles.container}>
      
       
          <View style={styles.Header}>
            <Text style={styles.screenTitle}>Tâche à faire</Text>
          </View>
          <TaskCalendar/>
          
        <SegmentedControl 
        containerStyle={styles.control}
        segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
        onChangeIndex={onChangeIndex}
        initialIndex={0}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'white'
        outlineWidth= {2}
        throttleTime= {100}
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
    
        {show ? <GlobalTask/> : <MesTask/>}
      
          
        </ScrollView>
      
    
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
      backgroundColor: '#EDF0FA',
      },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 
    Header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

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

export default TacheScreen;